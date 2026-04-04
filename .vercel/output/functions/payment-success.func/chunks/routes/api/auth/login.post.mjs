import { d as defineEventHandler, b as readBody, c as createError, h as hashPassword, f as createSessionToken, s as setCookie, a as getDB } from '../../../_/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;
  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: "Email dan sandi wajib diisi" });
  }
  const db = getDB();
  const user = await db.prepare("SELECT id, full_name, email, password_hash, role FROM users WHERE email = ?").bind(email).first();
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Email atau sandi salah" });
  }
  const hashedPw = await hashPassword(password);
  if (user.password_hash !== hashedPw) {
    throw createError({ statusCode: 401, statusMessage: "Email atau sandi salah" });
  }
  const token = await createSessionToken({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.full_name
  });
  setCookie(event, "auth_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24
  });
  return {
    success: true,
    user: { id: user.id, name: user.full_name, email: user.email, role: user.role }
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
