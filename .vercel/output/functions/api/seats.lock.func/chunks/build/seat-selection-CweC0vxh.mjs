import { _ as _sfc_main$1 } from './Button-Cpjpb6pe.mjs';
import { _ as _sfc_main$2 } from './Icon-Cn3quCLZ.mjs';
import { _ as _sfc_main$3 } from './Card-DZR1gGaG.mjs';
import { _ as _sfc_main$4 } from './Alert-DZxHDse4.mjs';
import { defineComponent, withAsyncContext, computed, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { u as useFetch } from './fetch-DZCENMU-.mjs';
import { u as useToast } from './useToast-kaLd0qVn.mjs';
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
import './Avatar-BJ43_zGK.mjs';
import './server.mjs';
import '@iconify/vue';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vueuse/core';
import './nuxt-link-CB-lW4AY.mjs';
import 'tailwind-variants';
import './index-BIiJQGKL.mjs';
import '@iconify/utils/lib/css/icon';
import './useLocale-BFGS0yjh.mjs';
import '@vue/shared';
import './ssr-C1pPD3yl.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "seat-selection",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const scheduleId = route.query.scheduleId;
    const passengers = parseInt(route.query.passengers?.toString() || "1");
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/seats",
      {
        query: { scheduleId },
        lazy: true
      },
      "$DEow-goveF"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const layout = computed(() => {
      if (!data.value?.schedule?.seat_layout) return { rows: 10, cols: 4, aisle: 2 };
      try {
        return JSON.parse(data.value.schedule.seat_layout);
      } catch (e) {
        return { rows: 10, cols: 4, aisle: 2 };
      }
    });
    const bookedMap = computed(() => {
      const map = /* @__PURE__ */ new Set();
      data.value?.bookedSeats?.forEach((s) => map.add(s.seat_code));
      return map;
    });
    const selectedSeats = ref([]);
    const locking = ref(false);
    const getAlphabet = (idx) => String.fromCharCode(65 + idx);
    const getSeatCode = (row, col) => {
      const colVal = col > layout.value.aisle ? col - 1 : col;
      return `${row}${getAlphabet(colVal - 1)}`;
    };
    const isBooked = (code) => bookedMap.value.has(code);
    const isSelected = (code) => selectedSeats.value.includes(code);
    const toggleSeat = (code) => {
      if (isSelected(code)) {
        selectedSeats.value = selectedSeats.value.filter((c) => c !== code);
      } else {
        if (selectedSeats.value.length >= passengers) {
          selectedSeats.value.shift();
        }
        selectedSeats.value.push(code);
      }
    };
    const formatRupiah = (number) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);
    };
    const proceedToCheckout = async () => {
      if (selectedSeats.value.length !== passengers) return;
      locking.value = true;
      try {
        const res = await $fetch("/api/seats/lock", {
          method: "POST",
          body: { scheduleId, seatCodes: selectedSeats.value }
        });
        router.push({
          path: "/checkout",
          query: {
            scheduleId,
            seats: selectedSeats.value.join(","),
            passengers
          }
        });
      } catch (err) {
        const toast = useToast();
        toast.add({
          title: "Gagal Kunci Kursi",
          description: err.data?.statusMessage || err.message,
          color: "red"
        });
      } finally {
        locking.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UIcon = _sfc_main$2;
      const _component_UCard = _sfc_main$3;
      const _component_UAlert = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold">Pilih Kursi</h1><p class="text-gray-600">Pilih ${ssrInterpolate(unref(passengers))} kursi untuk perjalanan Anda.</p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        onClick: ($event) => _ctx.$router.back(),
        icon: "i-heroicons-arrow-left"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Kembali`);
          } else {
            return [
              createTextVNode("Kembali")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(pending)) {
        _push(`<div class="flex justify-center p-12">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-10 h-10 animate-spin text-primary-500"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(error) || !unref(data)?.schedule) {
        _push(`<div class="text-red-500 text-center p-8"> Ada kesalahan saat memuat data denah kursi. </div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-8">`);
        _push(ssrRenderComponent(_component_UCard, { class: "md:col-span-2 shadow-lg" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex justify-between items-center"${_scopeId}><h3 class="font-bold"${_scopeId}>Denah Bus: ${ssrInterpolate(unref(data).schedule.bus_name)}</h3><div class="flex space-x-4 text-sm hidden md:flex"${_scopeId}><div class="flex items-center space-x-1"${_scopeId}><div class="w-4 h-4 bg-white border border-gray-300 rounded"${_scopeId}></div><span${_scopeId}>Tersedia</span></div><div class="flex items-center space-x-1"${_scopeId}><div class="w-4 h-4 bg-primary-500 rounded"${_scopeId}></div><span${_scopeId}>Dipilih</span></div><div class="flex items-center space-x-1"${_scopeId}><div class="w-4 h-4 bg-gray-400 rounded opacity-60"${_scopeId}></div><span${_scopeId}>Terisi</span></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex justify-between items-center" }, [
                  createVNode("h3", { class: "font-bold" }, "Denah Bus: " + toDisplayString(unref(data).schedule.bus_name), 1),
                  createVNode("div", { class: "flex space-x-4 text-sm hidden md:flex" }, [
                    createVNode("div", { class: "flex items-center space-x-1" }, [
                      createVNode("div", { class: "w-4 h-4 bg-white border border-gray-300 rounded" }),
                      createVNode("span", null, "Tersedia")
                    ]),
                    createVNode("div", { class: "flex items-center space-x-1" }, [
                      createVNode("div", { class: "w-4 h-4 bg-primary-500 rounded" }),
                      createVNode("span", null, "Dipilih")
                    ]),
                    createVNode("div", { class: "flex items-center space-x-1" }, [
                      createVNode("div", { class: "w-4 h-4 bg-gray-400 rounded opacity-60" }),
                      createVNode("span", null, "Terisi")
                    ])
                  ])
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex justify-center my-8"${_scopeId}><div class="bg-gray-50 p-6 md:p-10 rounded-[3rem] border-4 border-gray-300 inline-block overflow-x-auto relative shadow-inner"${_scopeId}><div class="absolute top-6 right-8 md:right-12 opacity-30"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-lifebuoy",
                class: "w-12 h-12"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="mt-20 grid gap-3 md:gap-4" style="${ssrRenderStyle({ gridTemplateColumns: `repeat(${layout.value.cols}, minmax(0, 1fr))` })}"${_scopeId}><!--[-->`);
              ssrRenderList(layout.value.rows, (row) => {
                _push2(`<!--[--><!--[-->`);
                ssrRenderList(layout.value.cols, (col) => {
                  _push2(`<!--[-->`);
                  if (col === layout.value.aisle) {
                    _push2(`<div class="w-6 md:w-10 h-12 md:h-14"${_scopeId}></div>`);
                  } else {
                    _push2(`<button${ssrIncludeBooleanAttr(isBooked(getSeatCode(row, col))) ? " disabled" : ""} class="${ssrRenderClass([[
                      isBooked(getSeatCode(row, col)) ? "bg-gray-400 border-gray-500 text-white cursor-not-allowed opacity-60" : isSelected(getSeatCode(row, col)) ? "bg-primary-500 border-primary-600 text-white shadow-md transform scale-105 ring-2 ring-primary-300 ring-offset-1" : "bg-white border-gray-300 text-gray-700 hover:border-primary-400 hover:bg-primary-50 cursor-pointer shadow-sm"
                    ], "w-10 h-12 md:w-14 md:h-16 rounded-t-xl rounded-b-md border-2 flex items-center justify-center font-bold text-xs md:text-sm transition-all focus:outline-none"])}"${_scopeId}>${ssrInterpolate(getSeatCode(row, col))}</button>`);
                  }
                  _push2(`<!--]-->`);
                });
                _push2(`<!--]--><!--]-->`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex justify-center my-8" }, [
                  createVNode("div", { class: "bg-gray-50 p-6 md:p-10 rounded-[3rem] border-4 border-gray-300 inline-block overflow-x-auto relative shadow-inner" }, [
                    createVNode("div", { class: "absolute top-6 right-8 md:right-12 opacity-30" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-lifebuoy",
                        class: "w-12 h-12"
                      })
                    ]),
                    createVNode("div", {
                      class: "mt-20 grid gap-3 md:gap-4",
                      style: { gridTemplateColumns: `repeat(${layout.value.cols}, minmax(0, 1fr))` }
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(layout.value.rows, (row) => {
                        return openBlock(), createBlock(Fragment, {
                          key: `row-${row}`
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(layout.value.cols, (col) => {
                            return openBlock(), createBlock(Fragment, {
                              key: `col-${col}`
                            }, [
                              col === layout.value.aisle ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "w-6 md:w-10 h-12 md:h-14"
                              })) : (openBlock(), createBlock("button", {
                                key: 1,
                                onClick: ($event) => toggleSeat(getSeatCode(row, col)),
                                disabled: isBooked(getSeatCode(row, col)),
                                class: ["w-10 h-12 md:w-14 md:h-16 rounded-t-xl rounded-b-md border-2 flex items-center justify-center font-bold text-xs md:text-sm transition-all focus:outline-none", [
                                  isBooked(getSeatCode(row, col)) ? "bg-gray-400 border-gray-500 text-white cursor-not-allowed opacity-60" : isSelected(getSeatCode(row, col)) ? "bg-primary-500 border-primary-600 text-white shadow-md transform scale-105 ring-2 ring-primary-300 ring-offset-1" : "bg-white border-gray-300 text-gray-700 hover:border-primary-400 hover:bg-primary-50 cursor-pointer shadow-sm"
                                ]]
                              }, toDisplayString(getSeatCode(row, col)), 11, ["onClick", "disabled"]))
                            ], 64);
                          }), 128))
                        ], 64);
                      }), 128))
                    ], 4)
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UCard, { class: "shadow-lg h-fit sticky top-24" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="font-bold text-lg mb-4 text-gray-800 border-b pb-2"${_scopeId}>Ringkasan Pemesanan</h3><div class="space-y-4"${_scopeId}><div class="flex justify-between"${_scopeId}><span class="text-gray-500"${_scopeId}>Jumlah Penumpang</span><span class="font-bold"${_scopeId}>${ssrInterpolate(unref(passengers))}</span></div><div class="flex justify-between"${_scopeId}><span class="text-gray-500"${_scopeId}>Kursi Dipilih</span><span class="font-bold text-primary-600"${_scopeId}>${ssrInterpolate(selectedSeats.value.length ? selectedSeats.value.join(", ") : "-")}</span></div><div class="flex justify-between border-t pt-4"${_scopeId}><span class="text-gray-500"${_scopeId}>Total Harga</span><span class="text-2xl font-bold text-primary-600"${_scopeId}>${ssrInterpolate(formatRupiah(selectedSeats.value.length * unref(data).schedule.price))}</span></div></div><div class="mt-8 space-y-3"${_scopeId}>`);
              if (selectedSeats.value.length > 0 && selectedSeats.value.length < unref(passengers)) {
                _push2(ssrRenderComponent(_component_UAlert, {
                  title: "Sisa Kursi",
                  description: `Silakan pilih ${unref(passengers) - selectedSeats.value.length} kursi lagi.`,
                  color: "blue",
                  variant: "subtle"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: proceedToCheckout,
                loading: locking.value,
                disabled: selectedSeats.value.length !== unref(passengers),
                block: "",
                size: "xl",
                color: "primary",
                class: "font-bold"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Lanjut ke Pembayaran `);
                  } else {
                    return [
                      createTextVNode(" Lanjut ke Pembayaran ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("h3", { class: "font-bold text-lg mb-4 text-gray-800 border-b pb-2" }, "Ringkasan Pemesanan"),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", { class: "flex justify-between" }, [
                    createVNode("span", { class: "text-gray-500" }, "Jumlah Penumpang"),
                    createVNode("span", { class: "font-bold" }, toDisplayString(unref(passengers)), 1)
                  ]),
                  createVNode("div", { class: "flex justify-between" }, [
                    createVNode("span", { class: "text-gray-500" }, "Kursi Dipilih"),
                    createVNode("span", { class: "font-bold text-primary-600" }, toDisplayString(selectedSeats.value.length ? selectedSeats.value.join(", ") : "-"), 1)
                  ]),
                  createVNode("div", { class: "flex justify-between border-t pt-4" }, [
                    createVNode("span", { class: "text-gray-500" }, "Total Harga"),
                    createVNode("span", { class: "text-2xl font-bold text-primary-600" }, toDisplayString(formatRupiah(selectedSeats.value.length * unref(data).schedule.price)), 1)
                  ])
                ]),
                createVNode("div", { class: "mt-8 space-y-3" }, [
                  selectedSeats.value.length > 0 && selectedSeats.value.length < unref(passengers) ? (openBlock(), createBlock(_component_UAlert, {
                    key: 0,
                    title: "Sisa Kursi",
                    description: `Silakan pilih ${unref(passengers) - selectedSeats.value.length} kursi lagi.`,
                    color: "blue",
                    variant: "subtle"
                  }, null, 8, ["description"])) : createCommentVNode("", true),
                  createVNode(_component_UButton, {
                    onClick: proceedToCheckout,
                    loading: locking.value,
                    disabled: selectedSeats.value.length !== unref(passengers),
                    block: "",
                    size: "xl",
                    color: "primary",
                    class: "font-bold"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Lanjut ke Pembayaran ")
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled"])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/seat-selection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=seat-selection-CweC0vxh.mjs.map
