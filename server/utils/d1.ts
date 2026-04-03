/// <reference types="@cloudflare/workers-types" />
import type { H3Event } from 'h3'

export function getDB(event: H3Event): D1Database {
  // Try getting from event context natively (Cloudflare Pages / Workers)
  let db = event.context.cloudflare?.env?.DB

  // Fallback for some local dev setups if process.env gets the binding
  if (!db && process.env.DB) {
    db = process.env.DB
  }

  if (!db) {
    throw new Error('D1 Database "DB" is not bound. Ensure you run this via Wrangler or have local binding.')
  }

  return db as D1Database
}
