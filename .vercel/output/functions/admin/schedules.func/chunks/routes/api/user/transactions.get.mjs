import { d as defineEventHandler, l as requireAuth, a as getDB } from '../../../_/nitro.mjs';
import 'jose';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

const transactions_get = defineEventHandler(async (event) => {
  const user = await requireAuth(event);
  const db = getDB();
  const { results } = await db.prepare(`
    SELECT t.*, s.route_from, s.route_to, s.departure_time, s.arrival_time, b.name as bus_name, b.class as bus_class 
    FROM transactions t
    LEFT JOIN schedules s ON t.schedule_id = s.id
    LEFT JOIN buses b ON s.bus_id = b.id
    WHERE t.user_id = ?
    ORDER BY t.id DESC
  `).bind(user.id).all();
  return { transactions: results || [] };
});

export { transactions_get as default };
//# sourceMappingURL=transactions.get.mjs.map
