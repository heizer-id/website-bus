import { getDB } from '../../../utils/d1'
import { requireAdmin } from '../../../utils/protectRoute'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const db = getDB(event)
  const { results } = await db.prepare('SELECT * FROM buses ORDER BY id DESC').all()
  return { buses: results || [] }
})
