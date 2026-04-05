/**
 * D1 REST API Wrapper
 *
 * Mimics the native D1Database interface (prepare/bind/all/first/run/batch)
 * so all existing API handlers work without modification.
 *
 * Uses Cloudflare D1 HTTP API:
 * POST /accounts/{account_id}/d1/database/{database_id}/query
 */

const CF_API = 'https://api.cloudflare.com/client/v4'

interface D1RestResult {
  results: Record<string, unknown>[]
  success: boolean
  meta: Record<string, unknown>
}

import { createError } from '#imports'

async function d1Query(
  sql: string,
  params: unknown[] = []
): Promise<D1RestResult> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || ''
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID || ''
  const apiToken = process.env.CLOUDFLARE_API_TOKEN || ''

  if (!accountId || !databaseId || !apiToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing D1 env vars: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, CLOUDFLARE_API_TOKEN (Please set these in Vercel)'
    })
  }

  const url = `${CF_API}/accounts/${accountId}/d1/database/${databaseId}/query`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql, params }),
    })

    const text = await res.text()
    
    let json: any
    try {
      json = JSON.parse(text)
    } catch {
      throw createError({ 
        statusCode: res.status === 200 ? 500 : res.status, 
        statusMessage: `Cloudflare API returned non-JSON (${res.status}): ${text.substring(0, 100)}` 
      })
    }

    if (!json.success) {
      const msg = json.errors?.[0]?.message || 'D1 REST API error'
      throw createError({ statusCode: 500, statusMessage: `D1 query failed: ${msg}` })
    }

    // D1 REST API returns array of result sets (one per statement)
    const resultSet = json.result?.[0]
    return {
      results: resultSet?.results ?? [],
      success: true,
      meta: resultSet?.meta ?? {},
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({ statusCode: 500, statusMessage: error.message || 'Fetch failed' })
  }
}

// ── Prepared Statement Builder ────────────────────────────────────────────────

class D1PreparedStatement {
  private sql: string
  private params: unknown[]

  constructor(sql: string, params: unknown[] = []) {
    this.sql = sql
    this.params = params
  }

  bind(...values: unknown[]): D1PreparedStatement {
    return new D1PreparedStatement(this.sql, values)
  }

  async all<T = Record<string, unknown>>(): Promise<{ results: T[] }> {
    const { results } = await d1Query(this.sql, this.params)
    return { results: results as T[] }
  }

  async first<T = Record<string, unknown>>(): Promise<T | null> {
    const { results } = await d1Query(this.sql, this.params)
    return (results[0] as T) ?? null
  }

  async run(): Promise<{ success: boolean; meta: Record<string, unknown> }> {
    const { success, meta } = await d1Query(this.sql, this.params)
    return { success, meta }
  }
}

// ── D1 Database Wrapper ───────────────────────────────────────────────────────

class D1DatabaseWrapper {
  prepare(sql: string): D1PreparedStatement {
    return new D1PreparedStatement(sql)
  }

  async batch(statements: D1PreparedStatement[]): Promise<{ results: unknown[] }[]> {
    // Execute each statement sequentially (D1 REST API batch support is limited)
    const outcomes = []
    for (const stmt of statements) {
      outcomes.push(await stmt.run())
    }
    return outcomes as any
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns a D1 database wrapper.
 * Works on Vercel (via REST) and still accepts an H3Event for backward compat.
 */
export function getDB(_event?: unknown): D1DatabaseWrapper {
  return new D1DatabaseWrapper()
}
