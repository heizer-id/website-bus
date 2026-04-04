import { _ as _sfc_main$1 } from './Icon-Cn3quCLZ.mjs';
import { _ as _sfc_main$2 } from './Card-DZR1gGaG.mjs';
import { _ as _sfc_main$3 } from './Button-Cpjpb6pe.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
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
import 'tailwind-variants';
import './server.mjs';
import '@iconify/vue';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './index-BIiJQGKL.mjs';
import '@iconify/utils/lib/css/icon';
import '@vueuse/core';
import './Avatar-BJ43_zGK.mjs';
import './nuxt-link-CB-lW4AY.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "payment-success",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const bookingCode = route.query.booking;
    const processing = ref(true);
    const success = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-xl mx-auto text-center space-y-6 py-12" }, _attrs))}>`);
      if (processing.value) {
        _push(`<div class="space-y-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-20 h-20 animate-spin text-primary-500 mx-auto"
        }, null, _parent));
        _push(`<h2 class="text-2xl font-bold text-gray-800">Menyelesaikan Pembayaran...</h2><p class="text-gray-500">Menghubungkan dengan Gateway Pembayaran DOKU (Simulasi).</p></div>`);
      } else if (success.value) {
        _push(`<div class="space-y-6"><div class="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check-circle",
          class: "w-20 h-20 text-green-500"
        }, null, _parent));
        _push(`</div><h1 class="text-3xl font-extrabold text-gray-900">Pembayaran Berhasil!</h1><p class="text-gray-600">Terima kasih. Tiket telah dikonfirmasi dan notifikasi berhasil dikirim.</p>`);
        _push(ssrRenderComponent(_component_UCard, { class: "bg-white text-left mt-8 shadow-xl border-t-4 border-t-primary-500 rounded-2xl relative overflow-hidden" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute -right-8 -top-8 opacity-5"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-ticket",
                class: "w-40 h-40"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="relative z-10"${_scopeId}><div class="flex flex-col items-center justify-center border-b border-dashed border-gray-300 pb-6 mb-6"${_scopeId}><span class="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2"${_scopeId}>Kode Booking Anda</span><span class="font-extrabold text-3xl font-mono text-primary-700 bg-primary-50 px-6 py-2 rounded-lg border border-primary-200"${_scopeId}>${ssrInterpolate(unref(bookingCode))}</span></div><p class="text-sm text-gray-500 text-center mb-6"${_scopeId}>Gunakan kode ini untuk mengecek status pesanan atau mencetak E-Ticket.</p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                block: "",
                to: "/cek-booking",
                size: "xl",
                color: "primary",
                class: "font-bold rounded-xl shadow-md transition hover:scale-[1.02]"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Lihat E-Ticket`);
                  } else {
                    return [
                      createTextVNode("Lihat E-Ticket")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "absolute -right-8 -top-8 opacity-5" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-ticket",
                    class: "w-40 h-40"
                  })
                ]),
                createVNode("div", { class: "relative z-10" }, [
                  createVNode("div", { class: "flex flex-col items-center justify-center border-b border-dashed border-gray-300 pb-6 mb-6" }, [
                    createVNode("span", { class: "text-gray-500 uppercase tracking-widest text-xs font-bold mb-2" }, "Kode Booking Anda"),
                    createVNode("span", { class: "font-extrabold text-3xl font-mono text-primary-700 bg-primary-50 px-6 py-2 rounded-lg border border-primary-200" }, toDisplayString(unref(bookingCode)), 1)
                  ]),
                  createVNode("p", { class: "text-sm text-gray-500 text-center mb-6" }, "Gunakan kode ini untuk mengecek status pesanan atau mencetak E-Ticket."),
                  createVNode(_component_UButton, {
                    block: "",
                    to: "/cek-booking",
                    size: "xl",
                    color: "primary",
                    class: "font-bold rounded-xl shadow-md transition hover:scale-[1.02]"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Lihat E-Ticket")
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-circle",
          class: "w-24 h-24 mx-auto text-red-500 mb-4"
        }, null, _parent));
        _push(`<h1 class="text-2xl font-bold text-gray-800">Transaksi Tidak Ditemukan</h1>`);
        _push(ssrRenderComponent(_component_UButton, {
          to: "/",
          size: "lg",
          color: "primary",
          class: "mt-6",
          variant: "outline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Kembali Ke Beranda`);
            } else {
              return [
                createTextVNode("Kembali Ke Beranda")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/payment-success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=payment-success-BUrdUL0O.mjs.map
