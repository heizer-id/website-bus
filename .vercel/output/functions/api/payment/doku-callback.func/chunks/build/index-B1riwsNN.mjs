import { _ as _sfc_main$1 } from './Card-DZR1gGaG.mjs';
import { _ as _sfc_main$2 } from './Icon-Cn3quCLZ.mjs';
import { defineComponent, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import './server.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'tailwind-variants';
import './index-BIiJQGKL.mjs';
import '@iconify/utils/lib/css/icon';
import '@vueuse/core';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$1;
      const _component_UIcon = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-2xl font-bold mb-6">Dasbor Admin</h1><div class="grid grid-cols-1 md:grid-cols-3 gap-6">`);
      _push(ssrRenderComponent(_component_UCard, {
        class: "bg-gradient-to-br from-primary-500 to-primary-600 text-white border-0 shadow-lg",
        ui: { body: { padding: "p-6 sm:p-8" } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-4"${_scopeId}><div class="p-4 bg-white/20 rounded-2xl"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-truck",
              class: "w-8 h-8"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-white/80 font-medium"${_scopeId}>Total Armada Bus</p><div class="text-3xl font-bold mt-1"${_scopeId}>2</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-4" }, [
                createVNode("div", { class: "p-4 bg-white/20 rounded-2xl" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-truck",
                    class: "w-8 h-8"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-white/80 font-medium" }, "Total Armada Bus"),
                  createVNode("div", { class: "text-3xl font-bold mt-1" }, "2")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, {
        class: "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg",
        ui: { body: { padding: "p-6 sm:p-8" } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-4"${_scopeId}><div class="p-4 bg-white/20 rounded-2xl"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-calendar-days",
              class: "w-8 h-8"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-white/80 font-medium"${_scopeId}>Total Jadwal Aktif</p><div class="text-3xl font-bold mt-1"${_scopeId}>2</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-4" }, [
                createVNode("div", { class: "p-4 bg-white/20 rounded-2xl" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-calendar-days",
                    class: "w-8 h-8"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-white/80 font-medium" }, "Total Jadwal Aktif"),
                  createVNode("div", { class: "text-3xl font-bold mt-1" }, "2")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, {
        class: "bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg",
        ui: { body: { padding: "p-6 sm:p-8" } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-4"${_scopeId}><div class="p-4 bg-white/20 rounded-2xl"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-banknotes",
              class: "w-8 h-8"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-white/80 font-medium"${_scopeId}>Pemasukan (Dummy)</p><div class="text-3xl font-bold mt-1"${_scopeId}>Rp0</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-4" }, [
                createVNode("div", { class: "p-4 bg-white/20 rounded-2xl" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-banknotes",
                    class: "w-8 h-8"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-white/80 font-medium" }, "Pemasukan (Dummy)"),
                  createVNode("div", { class: "text-3xl font-bold mt-1" }, "Rp0")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UCard, { class: "mt-8 shadow-sm" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-bold text-lg mb-2"${_scopeId}>Selamat Datang di Portal Admin</h2><p class="text-gray-600"${_scopeId}>Gunakan menu di sebelah kiri untuk mengelola data operasional perjalanan Nusantara Bus. Anda memiliki akses penuh mengubah ketersediaan kursi, daftar armada, beserta meninjau pesanan pelanggan.</p>`);
          } else {
            return [
              createVNode("h2", { class: "font-bold text-lg mb-2" }, "Selamat Datang di Portal Admin"),
              createVNode("p", { class: "text-gray-600" }, "Gunakan menu di sebelah kiri untuk mengelola data operasional perjalanan Nusantara Bus. Anda memiliki akses penuh mengubah ketersediaan kursi, daftar armada, beserta meninjau pesanan pelanggan.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B1riwsNN.mjs.map
