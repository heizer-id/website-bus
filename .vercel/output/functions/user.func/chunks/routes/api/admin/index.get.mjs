import { d as defineEventHandler, r as requireAdmin, a as getDB } from '../../../_/nitro.mjs';
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
  const { results } = await db.prepare("SELECT * FROM buses ORDER BY id DESC").all();
  return { buses: results || [] };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
