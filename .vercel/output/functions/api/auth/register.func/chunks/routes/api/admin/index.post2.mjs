import { d as defineEventHandler, r as requireAdmin, b as readBody, c as createError, a as getDB } from '../../../_/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  await requireAdmin(event);
  const db = getDB();
  const body = await readBody(event);
  if (body.action === "delete") {
    await db.prepare("DELETE FROM schedules WHERE id = ?").bind(body.id).run();
    return { success: true };
  }
  const { bus_id, route_from, route_to, departure_time, arrival_time, price } = body;
  if (!bus_id || !route_from || !route_to || !departure_time || !arrival_time || !price) {
    throw createError({ statusCode: 400, statusMessage: "Data tidak lengkap" });
  }
  await db.prepare("INSERT INTO schedules (bus_id, route_from, route_to, departure_time, arrival_time, price) VALUES (?, ?, ?, ?, ?, ?)").bind(bus_id, route_from, route_to, departure_time, arrival_time, price).run();
  return { success: true };
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
