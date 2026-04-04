import { _ as _sfc_main$1 } from './Card-DZR1gGaG.mjs';
import { _ as _sfc_main$2 } from './Input-YgTwjt5M.mjs';
import { _ as _sfc_main$3 } from './Button-Cpjpb6pe.mjs';
import { _ as _sfc_main$4 } from './Alert-DZxHDse4.mjs';
import { _ as _sfc_main$5 } from './Icon-Cn3quCLZ.mjs';
import { _ as _sfc_main$6 } from './Badge-DCjZ1sGf.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, withModifiers, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
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
import '@iconify/vue';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vueuse/core';
import './Avatar-BJ43_zGK.mjs';
import './nuxt-link-CB-lW4AY.mjs';
import './useLocale-BFGS0yjh.mjs';
import 'tailwind-variants';
import './index-BIiJQGKL.mjs';
import '@iconify/utils/lib/css/icon';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cek-booking",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const searchCode = ref(route.query.code || "");
    const loading = ref(false);
    const error = ref("");
    const booking = ref(null);
    const timeFormat = (isoString) => {
      return new Date(isoString).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
    };
    const fetchBooking = async () => {
      if (!searchCode.value) return;
      loading.value = true;
      error.value = "";
      booking.value = null;
      try {
        const res = await $fetch(`/api/booking/${encodeURIComponent(searchCode.value)}`);
        booking.value = res;
      } catch (err) {
        error.value = err.data?.statusMessage || "Transaksi tidak ditemukan. Pastikan kode booking benar.";
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$1;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      const _component_UAlert = _sfc_main$4;
      const _component_UIcon = _sfc_main$5;
      const _component_UBadge = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-3xl font-extrabold text-gray-900">Cek Status Pesanan</h1><p class="text-gray-600 mt-2">Dapatkan E-Ticket dan pantau perjalanan Anda.</p></div>`);
      _push(ssrRenderComponent(_component_UCard, { class: "shadow-lg mb-8 bg-white border border-gray-100" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="flex flex-col md:flex-row items-end gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Kode Booking",
              class: "w-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: searchCode.value,
                    "onUpdate:modelValue": ($event) => searchCode.value = $event,
                    placeholder: "Cth: PO/2026xxxx/xxxx",
                    icon: "i-heroicons-hashtag",
                    size: "xl"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: searchCode.value,
                      "onUpdate:modelValue": ($event) => searchCode.value = $event,
                      placeholder: "Cth: PO/2026xxxx/xxxx",
                      icon: "i-heroicons-hashtag",
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              type: "submit",
              loading: loading.value,
              size: "xl",
              color: "primary",
              class: "font-bold whitespace-nowrap min-w-[200px] justify-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cari E-Ticket`);
                } else {
                  return [
                    createTextVNode("Cari E-Ticket")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(fetchBooking, ["prevent"]),
                class: "flex flex-col md:flex-row items-end gap-4"
              }, [
                createVNode(_component_UFormGroup, {
                  label: "Kode Booking",
                  class: "w-full"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: searchCode.value,
                      "onUpdate:modelValue": ($event) => searchCode.value = $event,
                      placeholder: "Cth: PO/2026xxxx/xxxx",
                      icon: "i-heroicons-hashtag",
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UButton, {
                  type: "submit",
                  loading: loading.value,
                  size: "xl",
                  color: "primary",
                  class: "font-bold whitespace-nowrap min-w-[200px] justify-center"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Cari E-Ticket")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (error.value) {
        _push(ssrRenderComponent(_component_UAlert, {
          title: "Tidak Ditemukan",
          description: error.value,
          color: "red",
          variant: "soft"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (booking.value) {
        _push(`<div class="transition-all">`);
        if (booking.value.transaction.payment_status === "pending") {
          _push(`<div class="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl flex justify-between items-center shadow-sm"><div><h3 class="font-bold text-yellow-800 text-lg">Pembayaran Pending</h3><p class="text-yellow-700 text-sm">Segera selesaikan pembayaran untuk rute ${ssrInterpolate(booking.value.transaction.route_from)} → ${ssrInterpolate(booking.value.transaction.route_to)}.</p></div>`);
          _push(ssrRenderComponent(_component_UButton, {
            color: "orange",
            disabled: ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Menunggu Pembayaran`);
              } else {
                return [
                  createTextVNode("Menunggu Pembayaran")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else if (booking.value.transaction.payment_status === "failed") {
          _push(`<div class="bg-red-50 border border-red-200 p-6 rounded-2xl flex justify-between items-center shadow-sm"><div><h3 class="font-bold text-red-800 text-lg">Tertunda/Dibatalkan</h3><p class="text-red-700 text-sm">Transaksi telah dibatalkan atau kadaluarsa.</p></div></div>`);
        } else if (booking.value.transaction.payment_status === "paid") {
          _push(`<div class="bg-white rounded-[2rem] border-2 border-primary-100 overflow-hidden shadow-2xl relative"><div class="bg-primary-600 text-white p-6 md:p-8 flex justify-between items-center relative overflow-hidden"><div class="absolute -right-8 -top-8 opacity-10">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-ticket",
            class: "w-48 h-48"
          }, null, _parent));
          _push(`</div><div class="relative z-10"><div class="bg-primary-500 rounded px-3 py-1 font-mono text-sm tracking-widest uppercase mb-4 inline-block shadow-sm">E-Ticket Valid</div><h2 class="text-3xl font-extrabold">${ssrInterpolate(booking.value.transaction.route_from)} → ${ssrInterpolate(booking.value.transaction.route_to)}</h2><div class="mt-2 opacity-90">${ssrInterpolate(timeFormat(booking.value.transaction.departure_time))}</div></div></div><div class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8"><div class="md:col-span-2 space-y-6"><div class="grid grid-cols-2 gap-6"><div><div class="text-xs uppercase text-gray-500 font-bold mb-1">Nama Penumpang</div><div class="font-bold text-lg text-gray-900">${ssrInterpolate(booking.value.transaction.passenger_name)}</div></div><div><div class="text-xs uppercase text-gray-500 font-bold mb-1">Armada</div><div class="font-bold text-lg text-gray-900">${ssrInterpolate(booking.value.transaction.bus_name)}</div><div class="text-sm capitalize text-gray-600">${ssrInterpolate(booking.value.transaction.bus_class)}</div></div><div><div class="text-xs uppercase text-gray-500 font-bold mb-1">Waktu Kedatangan</div><div class="font-bold text-gray-900">${ssrInterpolate(timeFormat(booking.value.transaction.arrival_time))}</div></div><div><div class="text-xs uppercase text-gray-500 font-bold mb-1">Nomor Kursi</div><div class="font-bold text-xl text-primary-600 flex gap-1"><!--[-->`);
          ssrRenderList(booking.value.transaction.seat_codes.split(","), (seat) => {
            _push(ssrRenderComponent(_component_UBadge, {
              key: seat,
              color: "primary",
              class: "font-mono text-sm"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(seat)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(seat), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></div></div></div><div class="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-dashed border-gray-300 pt-6 md:pt-0 md:pl-6 relative"><div class="absolute -left-[14px] top-1/2 w-7 h-7 bg-white border border-gray-300 rounded-full hidden md:block"></div><div class="text-xs font-bold text-gray-500 tracking-wider mb-3">TUNJUKAN BUKTI INI</div>`);
          if (booking.value.qrCodeDataUrl) {
            _push(`<img${ssrRenderAttr("src", booking.value.qrCodeDataUrl)} alt="QR Code Booking" class="w-40 h-40 border-4 border-gray-100 rounded-xl">`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="font-mono text-gray-500 mt-3 text-sm font-bold tracking-widest">${ssrInterpolate(booking.value.transaction.booking_code)}</div>`);
          _push(ssrRenderComponent(_component_UButton, {
            class: "mt-4",
            icon: "i-heroicons-arrow-down-tray",
            variant: "soft",
            block: ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Unduh PDF`);
              } else {
                return [
                  createTextVNode("Unduh PDF")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cek-booking.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cek-booking-CbO71NUR.mjs.map
