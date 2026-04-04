import { _ as _sfc_main$1 } from './Icon-Cn3quCLZ.mjs';
import { _ as _sfc_main$2 } from './Button-Cpjpb6pe.mjs';
import { _ as _sfc_main$3 } from './Card-DZR1gGaG.mjs';
import { _ as _sfc_main$4 } from './Input-YgTwjt5M.mjs';
import { _ as _sfc_main$5 } from './Badge-DCjZ1sGf.mjs';
import { defineComponent, computed, withAsyncContext, ref, watch, resolveComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, withModifiers, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { u as useAuth } from './useAuth-BVJ85bH0.mjs';
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
import './ssr-C1pPD3yl.mjs';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const { user } = useAuth();
    const scheduleId = route.query.scheduleId;
    const seatsParams = route.query.seats;
    const seatList = computed(() => seatsParams ? seatsParams.split(",") : []);
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/seats",
      {
        query: { scheduleId }
      },
      "$DjYXxsTtgs"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const formData = ref({
      name: "",
      phone: "",
      email: ""
    });
    watch(() => user.value, (u) => {
      if (u) {
        if (!formData.value.name) formData.value.name = u.name || "";
        if (!formData.value.email) formData.value.email = u.email || "";
      }
    }, { immediate: true });
    const loadingObj = ref(false);
    const formatRupiah = (number) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);
    };
    const timeFormat = (isoString) => {
      return new Date(isoString).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
    };
    const submitBooking = async () => {
      if (!formData.value.name || !formData.value.phone || !formData.value.email) {
        const toast = useToast();
        toast.add({ title: "Error", description: "Mohon lengkapi semua data penumpang", color: "red" });
        return;
      }
      loadingObj.value = true;
      try {
        const res = await $fetch("/api/payment/doku-invoice", {
          method: "POST",
          body: {
            scheduleId: Number(scheduleId),
            seats: seatList.value,
            passenger: formData.value
          }
        });
        if (res.bookingCode) {
          router.push(`/payment-success?booking=${res.bookingCode}`);
        }
      } catch (err) {
        const toast = useToast();
        toast.add({
          title: "Gagal Membuat Tagihan",
          description: err.data?.statusMessage || err.message,
          color: "red"
        });
      } finally {
        loadingObj.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_UButton = _sfc_main$2;
      const _component_UCard = _sfc_main$3;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$4;
      const _component_UBadge = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto space-y-8" }, _attrs))}><div><h1 class="text-3xl font-bold">Detail Penumpang &amp; Pembayaran</h1><p class="text-gray-600">Lengkapi data untuk pesanan Anda.</p></div>`);
      if (unref(pending)) {
        _push(`<div class="flex justify-center p-12">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-10 h-10 animate-spin text-primary-500"
        }, null, _parent));
        _push(`</div>`);
      } else if (!unref(data)?.schedule) {
        _push(`<div class="text-center p-8"><h2 class="text-xl font-bold text-red-500">Jadwal Tidak Ditemukan</h2>`);
        _push(ssrRenderComponent(_component_UButton, {
          to: "/",
          class: "mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Kembali ke Beranda`);
            } else {
              return [
                createTextVNode("Kembali ke Beranda")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-8">`);
        _push(ssrRenderComponent(_component_UCard, { class: "md:col-span-2 shadow-lg" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h2 class="text-lg font-bold mb-4 border-b pb-2"${_scopeId}>Informasi Kontak &amp; Penumpang</h2><form class="space-y-6 mt-4"${_scopeId}><div class="bg-primary-50 p-4 rounded-xl border border-primary-100 flex items-start gap-4 mb-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-information-circle",
                class: "w-6 h-6 text-primary-600 shrink-0 mt-0.5"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-sm text-primary-800"${_scopeId}>E-Ticket akan dikirimkan ke alamat email di bawah ini. Pastikan email aktif.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Nama Lengkap Pemesan",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: formData.value.name,
                      "onUpdate:modelValue": ($event) => formData.value.name = $event,
                      placeholder: "Masukan Nama Sesuai KTP"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: formData.value.name,
                        "onUpdate:modelValue": ($event) => formData.value.name = $event,
                        placeholder: "Masukan Nama Sesuai KTP"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Nomor Telepon/WA",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: formData.value.phone,
                      "onUpdate:modelValue": ($event) => formData.value.phone = $event,
                      type: "tel",
                      placeholder: "08xxxxxxxx"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: formData.value.phone,
                        "onUpdate:modelValue": ($event) => formData.value.phone = $event,
                        type: "tel",
                        placeholder: "08xxxxxxxx"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Alamat Email",
                required: "",
                class: "md:col-span-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: formData.value.email,
                      "onUpdate:modelValue": ($event) => formData.value.email = $event,
                      type: "email",
                      placeholder: "email@contoh.com"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: formData.value.email,
                        "onUpdate:modelValue": ($event) => formData.value.email = $event,
                        type: "email",
                        placeholder: "email@contoh.com"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="mt-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                type: "submit",
                loading: loadingObj.value,
                size: "xl",
                block: "",
                color: "primary",
                class: "font-bold text-lg py-3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Lanjut Bayar (DOKU) `);
                  } else {
                    return [
                      createTextVNode(" Lanjut Bayar (DOKU) ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></form>`);
            } else {
              return [
                createVNode("h2", { class: "text-lg font-bold mb-4 border-b pb-2" }, "Informasi Kontak & Penumpang"),
                createVNode("form", {
                  onSubmit: withModifiers(submitBooking, ["prevent"]),
                  class: "space-y-6 mt-4"
                }, [
                  createVNode("div", { class: "bg-primary-50 p-4 rounded-xl border border-primary-100 flex items-start gap-4 mb-6" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-information-circle",
                      class: "w-6 h-6 text-primary-600 shrink-0 mt-0.5"
                    }),
                    createVNode("p", { class: "text-sm text-primary-800" }, "E-Ticket akan dikirimkan ke alamat email di bawah ini. Pastikan email aktif.")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode(_component_UFormGroup, {
                      label: "Nama Lengkap Pemesan",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: formData.value.name,
                          "onUpdate:modelValue": ($event) => formData.value.name = $event,
                          placeholder: "Masukan Nama Sesuai KTP"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Nomor Telepon/WA",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: formData.value.phone,
                          "onUpdate:modelValue": ($event) => formData.value.phone = $event,
                          type: "tel",
                          placeholder: "08xxxxxxxx"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Alamat Email",
                      required: "",
                      class: "md:col-span-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: formData.value.email,
                          "onUpdate:modelValue": ($event) => formData.value.email = $event,
                          type: "email",
                          placeholder: "email@contoh.com"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "mt-8" }, [
                    createVNode(_component_UButton, {
                      type: "submit",
                      loading: loadingObj.value,
                      size: "xl",
                      block: "",
                      color: "primary",
                      class: "font-bold text-lg py-3"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Lanjut Bayar (DOKU) ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ])
                ], 32)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UCard, { class: "shadow-lg h-fit sticky top-24" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="font-bold text-lg mb-4 text-gray-800 border-b pb-2"${_scopeId}>Ringkasan Pesanan</h3><div class="space-y-4"${_scopeId}><div${_scopeId}><div class="text-sm text-gray-500 font-medium tracking-wider uppercase mb-1"${_scopeId}>Perjalanan</div><div class="font-bold"${_scopeId}>${ssrInterpolate(unref(data).schedule.route_from)} → ${ssrInterpolate(unref(data).schedule.route_to)}</div><div class="text-sm mt-1"${_scopeId}>${ssrInterpolate(timeFormat(unref(data).schedule.departure_time))}</div></div><div${_scopeId}><div class="text-sm text-gray-500 font-medium tracking-wider uppercase mb-1"${_scopeId}>Armada</div><div class="font-bold"${_scopeId}>${ssrInterpolate(unref(data).schedule.bus_name)}</div><div class="text-sm capitalize"${_scopeId}>${ssrInterpolate(unref(data).schedule.bus_class)}</div></div><div${_scopeId}><div class="text-sm text-gray-500 font-medium tracking-wider uppercase mb-1"${_scopeId}>Kursi</div><div class="font-bold text-primary-600 space-x-1"${_scopeId}><!--[-->`);
              ssrRenderList(seatList.value, (seat) => {
                _push2(ssrRenderComponent(_component_UBadge, {
                  key: seat,
                  variant: "subtle"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(seat)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(seat), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div><div class="border-t pt-4"${_scopeId}><div class="flex justify-between items-center mb-2"${_scopeId}><span class="text-gray-600"${_scopeId}>Harga per tiket</span><span class="font-medium"${_scopeId}>${ssrInterpolate(formatRupiah(unref(data).schedule.price))}</span></div><div class="flex justify-between items-center text-lg mt-2"${_scopeId}><span class="font-bold"${_scopeId}>Total Pembayaran</span><span class="font-bold text-primary-600"${_scopeId}>${ssrInterpolate(formatRupiah(unref(data).schedule.price * seatList.value.length))}</span></div></div></div>`);
            } else {
              return [
                createVNode("h3", { class: "font-bold text-lg mb-4 text-gray-800 border-b pb-2" }, "Ringkasan Pesanan"),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", null, [
                    createVNode("div", { class: "text-sm text-gray-500 font-medium tracking-wider uppercase mb-1" }, "Perjalanan"),
                    createVNode("div", { class: "font-bold" }, toDisplayString(unref(data).schedule.route_from) + " → " + toDisplayString(unref(data).schedule.route_to), 1),
                    createVNode("div", { class: "text-sm mt-1" }, toDisplayString(timeFormat(unref(data).schedule.departure_time)), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("div", { class: "text-sm text-gray-500 font-medium tracking-wider uppercase mb-1" }, "Armada"),
                    createVNode("div", { class: "font-bold" }, toDisplayString(unref(data).schedule.bus_name), 1),
                    createVNode("div", { class: "text-sm capitalize" }, toDisplayString(unref(data).schedule.bus_class), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("div", { class: "text-sm text-gray-500 font-medium tracking-wider uppercase mb-1" }, "Kursi"),
                    createVNode("div", { class: "font-bold text-primary-600 space-x-1" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(seatList.value, (seat) => {
                        return openBlock(), createBlock(_component_UBadge, {
                          key: seat,
                          variant: "subtle"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(seat), 1)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ])
                  ]),
                  createVNode("div", { class: "border-t pt-4" }, [
                    createVNode("div", { class: "flex justify-between items-center mb-2" }, [
                      createVNode("span", { class: "text-gray-600" }, "Harga per tiket"),
                      createVNode("span", { class: "font-medium" }, toDisplayString(formatRupiah(unref(data).schedule.price)), 1)
                    ]),
                    createVNode("div", { class: "flex justify-between items-center text-lg mt-2" }, [
                      createVNode("span", { class: "font-bold" }, "Total Pembayaran"),
                      createVNode("span", { class: "font-bold text-primary-600" }, toDisplayString(formatRupiah(unref(data).schedule.price * seatList.value.length)), 1)
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=checkout-LAqiAN5i.mjs.map
