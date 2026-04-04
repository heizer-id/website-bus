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

const seats_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const scheduleId = query.scheduleId;
  if (!scheduleId) {
    throw createError({ statusCode: 400, statusMessage: "Missing scheduleId" });
  }
  const db = getDB();
  try {
    const schedule = await db.prepare(`
      SELECT s.*, b.name as bus_name, b.class as bus_class, b.total_seats, b.seat_layout
      FROM schedules s
      JOIN buses b ON s.bus_id = b.id
      WHERE s.id = ?
    `).bind(scheduleId).first();
    if (!schedule) {
      throw createError({ statusCode: 404, statusMessage: "Schedule not found" });
    }
    const { results: bookedSeats } = await db.prepare(`
      SELECT seat_code, status 
      FROM seat_bookings 
      WHERE schedule_id = ? AND status IN ('booked', 'paid')
    `).bind(scheduleId).all();
    return {
      schedule,
      bookedSeats: bookedSeats || []
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});

export { seats_get as default };
//# sourceMappingURL=seats.get.mjs.map
