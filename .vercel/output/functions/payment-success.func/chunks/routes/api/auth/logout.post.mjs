import { d as defineEventHandler, i as deleteCookie } from '../../../_/nitro.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  deleteCookie(event, "auth_token");
  return { success: true };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
