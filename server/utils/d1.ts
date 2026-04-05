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

async function d1Query(
  sql: string,
  params: unknown[] = []
): Promise<D1RestResult> {
  const config = useRuntimeConfig()
  const accountId = config.cloudflareAccountId as string || ''
  const databaseId = config.cloudflareD1DatabaseId as string || ''
  const apiToken = config.cloudflareApiToken as string || ''

  if (!accountId || !databaseId || !apiToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'D1 Credentials Missing! Silakan tambahkan CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, dan CLOUDFLARE_API_TOKEN di Environment Variables Vercel.'
    })
  }

  const url = `${CF_API}/accounts/${accountId}/d1/database/${databaseId}/query`

  try {
    const res: any = await $fetch.raw(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql, params }),
    })

    const json: any = res._data
    
    if (!json || typeof json !== 'object') {
       throw createError({ 
        statusCode: 500, 
        statusMessage: `Cloudflare API returned invalid response: ${JSON.stringify(json)}` 
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
