import { d as defineEventHandler, e as getQuery, c as createError, a as getDB } from '../../_/nitro.mjs';
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

const schedules_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const from = query.from;
  const to = query.to;
  const date = query.date;
  if (!from || !to || !date) {
    throw createError({ statusCode: 400, statusMessage: "Parameter pencarian (from, to, date) harus diisi" });
  }
  const db = getDB();
  try {
    const sql = `
      SELECT 
        s.*, 
        b.name as bus_name, 
        b.class as bus_class, 
        b.total_seats,
        (SELECT COUNT(*) FROM seat_bookings sb WHERE sb.schedule_id = s.id AND sb.status != 'available') as booked_seats
      FROM schedules s
      JOIN buses b ON s.bus_id = b.id
      WHERE s.route_from = ? AND s.route_to = ? AND date(s.departure_time) = date(?)
      ORDER BY s.departure_time ASC
    `;
    const fetchSql = `
      SELECT 
        s.*, 
        b.name as bus_name, 
        b.class as bus_class, 
        b.total_seats,
        (SELECT COUNT(*) FROM seat_bookings sb WHERE sb.schedule_id = s.id AND sb.status IN ('booked', 'paid')) as booked_seats
      FROM schedules s
      JOIN buses b ON s.bus_id = b.id
      WHERE s.route_from = ? AND s.route_to = ? AND s.departure_time LIKE ?
      ORDER BY s.departure_time ASC
    `;
    const { results } = await db.prepare(fetchSql).bind(from, to, `${date}%`).all();
    return results || [];
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});

export { schedules_get as default };
//# sourceMappingURL=schedules.get.mjs.map
