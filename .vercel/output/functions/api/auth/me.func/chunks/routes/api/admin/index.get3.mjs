import { d as defineEventHandler, r as requireAdmin, e as getQuery, a as getDB } from '../../../_/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  await requireAdmin(event);
  const db = getDB();
  const query = getQuery(event);
  const search = query.search ? `%${query.search}%` : void 0;
  let sql = `
    SELECT t.*, s.route_from, s.route_to, s.departure_time 
    FROM transactions t
    LEFT JOIN schedules s ON t.schedule_id = s.id
  `;
  let results;
  if (search) {
    sql += ` WHERE t.booking_code LIKE ? OR t.passenger_name LIKE ? ORDER BY t.id DESC`;
    const dbResult = await db.prepare(sql).bind(search, search).all();
    results = dbResult.results;
  } else {
    sql += ` ORDER BY t.id DESC`;
    const dbResult = await db.prepare(sql).all();
    results = dbResult.results;
  }
  return { transactions: results || [] };
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
