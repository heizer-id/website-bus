import { d as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuth } from './useAuth-BVJ85bH0.mjs';
import 'vue';
import '../_/nitro.mjs';
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
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'vue/server-renderer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './ssr-C1pPD3yl.mjs';

const admin = defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated.value) {
    return navigateTo(`/login?redirect=${to.fullPath}`);
  }
  if (!isAdmin.value) {
    return navigateTo("/");
  }
});

export { admin as default };
//# sourceMappingURL=admin-C8eYpWIr.mjs.map
