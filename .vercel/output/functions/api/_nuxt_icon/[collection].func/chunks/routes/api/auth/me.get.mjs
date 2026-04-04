import { d as defineEventHandler, j as getCookie, c as createError, v as verifySessionToken } from '../../../_/nitro.mjs';
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

const me_get = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const payload = await verifySessionToken(token);
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: "Token invalid" });
  }
  return { user: payload };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
