import { _ as _sfc_main$1 } from './Container-xfVrQY1m.mjs';
import { _ as _sfc_main$2 } from './Icon-Cn3quCLZ.mjs';
import { _ as _sfc_main$3 } from './Button-Cpjpb6pe.mjs';
import { _ as _sfc_main$4 } from './Card-DZR1gGaG.mjs';
import { _ as _sfc_main$5 } from './Badge-DCjZ1sGf.mjs';
import { defineComponent, withAsyncContext, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-DZCENMU-.mjs';
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
import './Avatar-BJ43_zGK.mjs';
import './nuxt-link-CB-lW4AY.mjs';
import '@vue/shared';
import './ssr-C1pPD3yl.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const formatRupiah = (number) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);
    };
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/user/transactions",
      "$x6aAhsXfAN"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$1;
      const _component_UIcon = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      const _component_UCard = _sfc_main$4;
      const _component_UBadge = _sfc_main$5;
      _push(ssrRenderComponent(_component_UContainer, mergeProps({ class: "py-8" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-8"${_scopeId}><h1 class="text-3xl font-extrabold text-gray-900 tracking-tight"${_scopeId}>E-Ticket Saya</h1><p class="text-gray-500 mt-2"${_scopeId}>Kelola dan tinjau seluruh riwayat perjalanan dan tiket bus Anda di satu tempat.</p></div>`);
            if (unref(pending)) {
              _push2(`<div class="flex justify-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-8 h-8 text-primary-500 animate-spin"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (!unref(data)?.transactions?.length) {
              _push2(`<div class="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-ticket",
                class: "w-16 h-16 mx-auto text-gray-300 mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-xl font-bold text-gray-900 mb-2"${_scopeId}>Belum Ada Perjalanan</h3><p class="text-gray-500 mb-6"${_scopeId}>Anda belum pernah memesan tiket bus bersama kami.</p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/",
                color: "primary",
                size: "lg",
                icon: "i-heroicons-magnifying-glass"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Cari Tiket Sekarang`);
                  } else {
                    return [
                      createTextVNode("Cari Tiket Sekarang")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(unref(data).transactions, (t) => {
                _push2(ssrRenderComponent(_component_UCard, {
                  key: t.id,
                  class: "flex flex-col h-full hover:shadow-lg transition-shadow duration-300 bg-white border-0 ring-1 ring-gray-100",
                  ui: { header: { padding: "p-4 sm:p-5" }, body: { padding: "p-4 sm:p-5 flex-grow" }, footer: { padding: "p-4 sm:p-5 bg-gray-50/50" } }
                }, {
                  header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex justify-between items-start"${_scopeId2}><div${_scopeId2}><p class="text-xs font-bold text-primary-600 uppercase tracking-widest mb-1"${_scopeId2}>Kode Booking (PNR)</p><p class="font-mono text-lg font-bold text-gray-900"${_scopeId2}>${ssrInterpolate(t.booking_code)}</p></div>`);
                      _push3(ssrRenderComponent(_component_UBadge, {
                        color: t.payment_status === "paid" ? "green" : "amber",
                        variant: "subtle",
                        size: "sm",
                        class: "uppercase"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(t.payment_status === "paid" ? "LUNAS" : "PENDING")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(t.payment_status === "paid" ? "LUNAS" : "PENDING"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex justify-between items-start" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-xs font-bold text-primary-600 uppercase tracking-widest mb-1" }, "Kode Booking (PNR)"),
                            createVNode("p", { class: "font-mono text-lg font-bold text-gray-900" }, toDisplayString(t.booking_code), 1)
                          ]),
                          createVNode(_component_UBadge, {
                            color: t.payment_status === "paid" ? "green" : "amber",
                            variant: "subtle",
                            size: "sm",
                            class: "uppercase"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(t.payment_status === "paid" ? "LUNAS" : "PENDING"), 1)
                            ]),
                            _: 2
                          }, 1032, ["color"])
                        ])
                      ];
                    }
                  }),
                  footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (t.payment_status === "pending") {
                        _push3(ssrRenderComponent(_component_UButton, {
                          color: "primary",
                          block: "",
                          icon: "i-heroicons-banknotes",
                          to: `/payment-success?booking=${t.booking_code}`
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` Selesaikan Pembayaran `);
                            } else {
                              return [
                                createTextVNode(" Selesaikan Pembayaran ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(ssrRenderComponent(_component_UButton, {
                          color: "white",
                          block: "",
                          icon: "i-heroicons-qr-code",
                          variant: "solid",
                          class: "ring-1 ring-gray-200 shadow-sm"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` Lihat QR E-Ticket `);
                            } else {
                              return [
                                createTextVNode(" Lihat QR E-Ticket ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      }
                    } else {
                      return [
                        t.payment_status === "pending" ? (openBlock(), createBlock(_component_UButton, {
                          key: 0,
                          color: "primary",
                          block: "",
                          icon: "i-heroicons-banknotes",
                          to: `/payment-success?booking=${t.booking_code}`
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Selesaikan Pembayaran ")
                          ]),
                          _: 1
                        }, 8, ["to"])) : (openBlock(), createBlock(_component_UButton, {
                          key: 1,
                          color: "white",
                          block: "",
                          icon: "i-heroicons-qr-code",
                          variant: "solid",
                          class: "ring-1 ring-gray-200 shadow-sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Lihat QR E-Ticket ")
                          ]),
                          _: 1
                        }))
                      ];
                    }
                  }),
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="space-y-4"${_scopeId2}><div class="flex items-center gap-3"${_scopeId2}><div class="p-2 bg-primary-50 rounded-lg"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-map-pin",
                        class: "w-5 h-5 text-primary-600"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div${_scopeId2}><p class="text-sm font-semibold text-gray-900"${_scopeId2}>${ssrInterpolate(t.route_from)} → ${ssrInterpolate(t.route_to)}</p><p class="text-xs text-gray-500"${_scopeId2}>${ssrInterpolate(new Date(t.departure_time).toLocaleString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }))}</p></div></div><div class="flex items-center gap-3 border-t border-gray-100 pt-4"${_scopeId2}><div class="p-2 bg-gray-50 rounded-lg"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-truck",
                        class: "w-5 h-5 text-gray-600"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div${_scopeId2}><p class="text-sm font-semibold text-gray-900"${_scopeId2}>${ssrInterpolate(t.bus_name)}</p><p class="text-xs text-gray-500 text-capitalize"${_scopeId2}>${ssrInterpolate(t.bus_class)}</p></div></div><div class="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4"${_scopeId2}><div${_scopeId2}><p class="text-xs text-gray-500"${_scopeId2}>Nomor Kursi</p><p class="font-bold text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(t.seat_codes)}</p></div><div class="text-right"${_scopeId2}><p class="text-xs text-gray-500"${_scopeId2}>Total Harga</p><p class="font-bold text-sm text-primary-600"${_scopeId2}>${ssrInterpolate(formatRupiah(t.total_amount))}</p></div></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "p-2 bg-primary-50 rounded-lg" }, [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-map-pin",
                                class: "w-5 h-5 text-primary-600"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm font-semibold text-gray-900" }, toDisplayString(t.route_from) + " → " + toDisplayString(t.route_to), 1),
                              createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(new Date(t.departure_time).toLocaleString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })), 1)
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-3 border-t border-gray-100 pt-4" }, [
                            createVNode("div", { class: "p-2 bg-gray-50 rounded-lg" }, [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-truck",
                                class: "w-5 h-5 text-gray-600"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm font-semibold text-gray-900" }, toDisplayString(t.bus_name), 1),
                              createVNode("p", { class: "text-xs text-gray-500 text-capitalize" }, toDisplayString(t.bus_class), 1)
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-2 gap-4 border-t border-gray-100 pt-4" }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-xs text-gray-500" }, "Nomor Kursi"),
                              createVNode("p", { class: "font-bold text-sm text-gray-900" }, toDisplayString(t.seat_codes), 1)
                            ]),
                            createVNode("div", { class: "text-right" }, [
                              createVNode("p", { class: "text-xs text-gray-500" }, "Total Harga"),
                              createVNode("p", { class: "font-bold text-sm text-primary-600" }, toDisplayString(formatRupiah(t.total_amount)), 1)
                            ])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              createVNode("div", { class: "mb-8" }, [
                createVNode("h1", { class: "text-3xl font-extrabold text-gray-900 tracking-tight" }, "E-Ticket Saya"),
                createVNode("p", { class: "text-gray-500 mt-2" }, "Kelola dan tinjau seluruh riwayat perjalanan dan tiket bus Anda di satu tempat.")
              ]),
              unref(pending) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex justify-center py-12"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-8 h-8 text-primary-500 animate-spin"
                })
              ])) : !unref(data)?.transactions?.length ? (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-ticket",
                  class: "w-16 h-16 mx-auto text-gray-300 mb-4"
                }),
                createVNode("h3", { class: "text-xl font-bold text-gray-900 mb-2" }, "Belum Ada Perjalanan"),
                createVNode("p", { class: "text-gray-500 mb-6" }, "Anda belum pernah memesan tiket bus bersama kami."),
                createVNode(_component_UButton, {
                  to: "/",
                  color: "primary",
                  size: "lg",
                  icon: "i-heroicons-magnifying-glass"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Cari Tiket Sekarang")
                  ]),
                  _: 1
                })
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(data).transactions, (t) => {
                  return openBlock(), createBlock(_component_UCard, {
                    key: t.id,
                    class: "flex flex-col h-full hover:shadow-lg transition-shadow duration-300 bg-white border-0 ring-1 ring-gray-100",
                    ui: { header: { padding: "p-4 sm:p-5" }, body: { padding: "p-4 sm:p-5 flex-grow" }, footer: { padding: "p-4 sm:p-5 bg-gray-50/50" } }
                  }, {
                    header: withCtx(() => [
                      createVNode("div", { class: "flex justify-between items-start" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs font-bold text-primary-600 uppercase tracking-widest mb-1" }, "Kode Booking (PNR)"),
                          createVNode("p", { class: "font-mono text-lg font-bold text-gray-900" }, toDisplayString(t.booking_code), 1)
                        ]),
                        createVNode(_component_UBadge, {
                          color: t.payment_status === "paid" ? "green" : "amber",
                          variant: "subtle",
                          size: "sm",
                          class: "uppercase"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(t.payment_status === "paid" ? "LUNAS" : "PENDING"), 1)
                          ]),
                          _: 2
                        }, 1032, ["color"])
                      ])
                    ]),
                    footer: withCtx(() => [
                      t.payment_status === "pending" ? (openBlock(), createBlock(_component_UButton, {
                        key: 0,
                        color: "primary",
                        block: "",
                        icon: "i-heroicons-banknotes",
                        to: `/payment-success?booking=${t.booking_code}`
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Selesaikan Pembayaran ")
                        ]),
                        _: 1
                      }, 8, ["to"])) : (openBlock(), createBlock(_component_UButton, {
                        key: 1,
                        color: "white",
                        block: "",
                        icon: "i-heroicons-qr-code",
                        variant: "solid",
                        class: "ring-1 ring-gray-200 shadow-sm"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Lihat QR E-Ticket ")
                        ]),
                        _: 1
                      }))
                    ]),
                    default: withCtx(() => [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "p-2 bg-primary-50 rounded-lg" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-map-pin",
                              class: "w-5 h-5 text-primary-600"
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-semibold text-gray-900" }, toDisplayString(t.route_from) + " → " + toDisplayString(t.route_to), 1),
                            createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(new Date(t.departure_time).toLocaleString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })), 1)
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center gap-3 border-t border-gray-100 pt-4" }, [
                          createVNode("div", { class: "p-2 bg-gray-50 rounded-lg" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-truck",
                              class: "w-5 h-5 text-gray-600"
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-semibold text-gray-900" }, toDisplayString(t.bus_name), 1),
                            createVNode("p", { class: "text-xs text-gray-500 text-capitalize" }, toDisplayString(t.bus_class), 1)
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-2 gap-4 border-t border-gray-100 pt-4" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-xs text-gray-500" }, "Nomor Kursi"),
                            createVNode("p", { class: "font-bold text-sm text-gray-900" }, toDisplayString(t.seat_codes), 1)
                          ]),
                          createVNode("div", { class: "text-right" }, [
                            createVNode("p", { class: "text-xs text-gray-500" }, "Total Harga"),
                            createVNode("p", { class: "font-bold text-sm text-primary-600" }, toDisplayString(formatRupiah(t.total_amount)), 1)
                          ])
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bg7lGGQH.mjs.map
