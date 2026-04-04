import { _ as _sfc_main$1 } from './Input-YgTwjt5M.mjs';
import { _ as _sfc_main$2 } from './Card-DZR1gGaG.mjs';
import { _ as _sfc_main$3 } from './Table-DOImr7F6.mjs';
import { _ as _sfc_main$4 } from './Badge-DCjZ1sGf.mjs';
import { defineComponent, ref, withAsyncContext, watch, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-DZCENMU-.mjs';
import './Icon-Cn3quCLZ.mjs';
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
import 'vue-router';
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
import '@tanstack/vue-table';
import '@tanstack/vue-virtual';
import './useLocale-BFGS0yjh.mjs';
import '@vue/shared';
import './ssr-C1pPD3yl.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "transactions",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const search = ref("");
    const columns = [
      { key: "booking_code", label: "Kode Booking (PNR)" },
      { key: "passenger", label: "Identitas" },
      { key: "route", label: "Rute & Waktu" },
      { key: "seat_codes", label: "Kursi" },
      { key: "total_amount", label: "Total (Rp)" },
      { key: "payment_status", label: "Status Byr" }
    ];
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      () => `/api/admin/transactions`,
      {
        query: { search }
      },
      "$i8PdtKlIpe"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    let timer;
    watch(search, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        refresh();
      }, 500);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      const _component_UTable = _sfc_main$3;
      const _component_UBadge = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"><h1 class="text-2xl font-bold">Pantauan Transaksi Tiket</h1>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: search.value,
        "onUpdate:modelValue": ($event) => search.value = $event,
        icon: "i-heroicons-magnifying-glass",
        placeholder: "Cari PNR atau Nama...",
        onKeyup: unref(refresh),
        ui: { wrapper: "w-full md:w-64" }
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UTable, {
              rows: unref(data)?.transactions || [],
              columns,
              loading: unref(pending)
            }, {
              "booking_code-data": withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="font-bold text-primary-600"${_scopeId2}>${ssrInterpolate(row.booking_code)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "font-bold text-primary-600" }, toDisplayString(row.booking_code), 1)
                  ];
                }
              }),
              "route-data": withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(row.route_from)} → ${ssrInterpolate(row.route_to)} <div class="text-xs text-gray-400 font-mono mt-1"${_scopeId2}>${ssrInterpolate(new Date(row.departure_time).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }))}</div>`);
                } else {
                  return [
                    createTextVNode(toDisplayString(row.route_from) + " → " + toDisplayString(row.route_to) + " ", 1),
                    createVNode("div", { class: "text-xs text-gray-400 font-mono mt-1" }, toDisplayString(new Date(row.departure_time).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })), 1)
                  ];
                }
              }),
              "seat_codes-data": withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UBadge, {
                    color: "gray",
                    variant: "solid"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.seat_codes)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.seat_codes), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UBadge, {
                      color: "gray",
                      variant: "solid"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.seat_codes), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              "passenger-data": withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-sm"${_scopeId2}><p class="font-semibold"${_scopeId2}>${ssrInterpolate(row.passenger_name)}</p><p class="text-xs text-gray-500"${_scopeId2}>${ssrInterpolate(row.passenger_phone)}</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-sm" }, [
                      createVNode("p", { class: "font-semibold" }, toDisplayString(row.passenger_name), 1),
                      createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(row.passenger_phone), 1)
                    ])
                  ];
                }
              }),
              "payment_status-data": withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UBadge, {
                    color: row.payment_status === "paid" ? "green" : "amber",
                    variant: "soft"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.payment_status.toUpperCase())}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.payment_status.toUpperCase()), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UBadge, {
                      color: row.payment_status === "paid" ? "green" : "amber",
                      variant: "soft"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.payment_status.toUpperCase()), 1)
                      ]),
                      _: 2
                    }, 1032, ["color"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!unref(pending) && unref(data)?.transactions?.length === 0) {
              _push2(`<div class="text-center py-8 text-gray-500"${_scopeId}> Belum ada transaksi tiket atau kata kunci tidak ditemukan. </div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_UTable, {
                rows: unref(data)?.transactions || [],
                columns,
                loading: unref(pending)
              }, {
                "booking_code-data": withCtx(({ row }) => [
                  createVNode("span", { class: "font-bold text-primary-600" }, toDisplayString(row.booking_code), 1)
                ]),
                "route-data": withCtx(({ row }) => [
                  createTextVNode(toDisplayString(row.route_from) + " → " + toDisplayString(row.route_to) + " ", 1),
                  createVNode("div", { class: "text-xs text-gray-400 font-mono mt-1" }, toDisplayString(new Date(row.departure_time).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })), 1)
                ]),
                "seat_codes-data": withCtx(({ row }) => [
                  createVNode(_component_UBadge, {
                    color: "gray",
                    variant: "solid"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.seat_codes), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                "passenger-data": withCtx(({ row }) => [
                  createVNode("div", { class: "text-sm" }, [
                    createVNode("p", { class: "font-semibold" }, toDisplayString(row.passenger_name), 1),
                    createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(row.passenger_phone), 1)
                  ])
                ]),
                "payment_status-data": withCtx(({ row }) => [
                  createVNode(_component_UBadge, {
                    color: row.payment_status === "paid" ? "green" : "amber",
                    variant: "soft"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.payment_status.toUpperCase()), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"])
                ]),
                _: 2
              }, 1032, ["rows", "loading"]),
              !unref(pending) && unref(data)?.transactions?.length === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center py-8 text-gray-500"
              }, " Belum ada transaksi tiket atau kata kunci tidak ditemukan. ")) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/transactions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=transactions-BZW_Tr-h.mjs.map
