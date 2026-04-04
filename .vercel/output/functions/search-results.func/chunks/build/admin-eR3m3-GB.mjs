import { _ as __nuxt_component_0 } from './nuxt-link-CB-lW4AY.mjs';
import { _ as _sfc_main$1 } from './Icon-Cn3quCLZ.mjs';
import { _ as _sfc_main$2 } from './Button-Cpjpb6pe.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BVJ85bH0.mjs';
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
import './server.mjs';
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'tailwind-variants';
import './index-BIiJQGKL.mjs';
import '@iconify/utils/lib/css/icon';
import '@vueuse/core';
import './Avatar-BJ43_zGK.mjs';
import './ssr-C1pPD3yl.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const links = [
      { label: "Ikhtisar", icon: "i-heroicons-chart-pie", to: "/admin" },
      { label: "Manajemen Armada", icon: "i-heroicons-truck", to: "/admin/buses" },
      { label: "Pengaturan Jadwal", icon: "i-heroicons-calendar-days", to: "/admin/schedules" },
      { label: "Riwayat Transaksi", icon: "i-heroicons-currency-dollar", to: "/admin/transactions" },
      { label: "Lihat Situs Publik", icon: "i-heroicons-globe-alt", to: "/" }
    ];
    const handleLogout = async () => {
      const { logout } = useAuth();
      await logout();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UIcon = _sfc_main$1;
      const _component_UVerticalNavigation = resolveComponent("UVerticalNavigation");
      const _component_UButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex flex-col md:flex-row" }, _attrs))}><aside class="md:w-64 bg-white border-r border-gray-200 shrink-0 flex flex-col h-screen sticky top-0"><div class="p-6 border-b border-gray-100 hidden md:block">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-shield-check",
              class: "w-8 h-8 text-primary-600"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-xl font-black text-gray-900 tracking-tight"${_scopeId}>ADMIN<span class="text-primary-500"${_scopeId}>BUS</span></span>`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-shield-check",
                class: "w-8 h-8 text-primary-600"
              }),
              createVNode("span", { class: "text-xl font-black text-gray-900 tracking-tight" }, [
                createTextVNode("ADMIN"),
                createVNode("span", { class: "text-primary-500" }, "BUS")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="p-4 md:p-6 space-y-2 flex-grow overflow-y-auto"><p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu Pusat</p>`);
      _push(ssrRenderComponent(_component_UVerticalNavigation, { links }, null, _parent));
      _push(`</div><div class="p-4 md:p-6 border-t border-gray-100">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "soft",
        color: "red",
        block: "",
        icon: "i-heroicons-arrow-left-on-rectangle",
        onClick: handleLogout
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Logout Admin`);
          } else {
            return [
              createTextVNode("Logout Admin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></aside><main class="flex-1 p-4 md:p-10 overflow-y-auto">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-eR3m3-GB.mjs.map
