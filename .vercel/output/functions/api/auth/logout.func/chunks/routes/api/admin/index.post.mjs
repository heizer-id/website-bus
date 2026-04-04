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
    await db.prepare("DELETE FROM buses WHERE id = ?").bind(body.id).run();
    return { success: true };
  }
  const { name, busClass, totalSeats, layoutConfig } = body;
  if (!name || !busClass || !totalSeats) {
    throw createError({ statusCode: 400, statusMessage: "Data tidak lengkap" });
  }
  await db.prepare("INSERT INTO buses (name, class, total_seats, seat_layout) VALUES (?, ?, ?, ?)").bind(name, busClass, totalSeats, JSON.stringify(layoutConfig || { rows: 10, cols: 4, aisle: 2 })).run();
  return { success: true };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
