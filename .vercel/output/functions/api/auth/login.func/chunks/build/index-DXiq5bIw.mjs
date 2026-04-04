import { _ as _sfc_main$1 } from './Card-DZR1gGaG.mjs';
import { _ as _sfc_main$2 } from './Icon-Cn3quCLZ.mjs';
import { _ as _sfc_main$3 } from './Select-BXFysh1p.mjs';
import { _ as _sfc_main$4 } from './Input-YgTwjt5M.mjs';
import { _ as _sfc_main$5 } from './Button-Cpjpb6pe.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
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
import 'tailwind-variants';
import './index-BIiJQGKL.mjs';
import '@iconify/utils/lib/css/icon';
import '@vueuse/core';
import '@floating-ui/vue';
import '@vueuse/shared';
import 'aria-hidden';
import './Avatar-BJ43_zGK.mjs';
import './nuxt-link-CB-lW4AY.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const cities = ["Jakarta", "Surabaya", "Semarang", "Yogyakarta", "Solo", "Bandung", "Malang"];
    const today = /* @__PURE__ */ new Date();
    const minDate = today.toISOString().split("T")[0];
    const ninetyDays = /* @__PURE__ */ new Date();
    ninetyDays.setDate(today.getDate() + 90);
    const maxDate = ninetyDays.toISOString().split("T")[0];
    const searchForm = ref({
      from: "Jakarta",
      to: "Surabaya",
      date: minDate,
      passengers: 1
    });
    const searchTickets = () => {
      if (!searchForm.value.from || !searchForm.value.to || !searchForm.value.date) {
        alert("Mohon lengkapi kota awal, tujuan, dan tanggal");
        return;
      }
      if (searchForm.value.from === searchForm.value.to) {
        alert("Kota asal dan tujuan tidak boleh sama");
        return;
      }
      router.push({
        path: "/search-results",
        query: {
          from: searchForm.value.from,
          to: searchForm.value.to,
          date: searchForm.value.date,
          passengers: searchForm.value.passengers
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$1;
      const _component_UIcon = _sfc_main$2;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_USelect = _sfc_main$3;
      const _component_UInput = _sfc_main$4;
      const _component_UButton = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12 pb-16" }, _attrs))}><section class="relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl overflow-hidden shadow-2xl mt-4"><div class="absolute inset-0 opacity-20 bg-[url(&#39;https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&amp;w=2669&amp;auto=format&amp;fit=crop&#39;)] bg-cover bg-center"></div><div class="relative z-10 px-6 py-16 md:py-24 text-center md:text-left md:px-12 flex flex-col md:flex-row items-center"><div class="md:w-1/2 space-y-4"><h1 class="text-4xl md:text-6xl font-extrabold text-white tracking-tight">Perjalanan Nyaman,<br>Mulai dari Sini.</h1><p class="text-primary-100 text-lg md:text-xl max-w-lg">Pesan tiket bus antar kota dengan mudah, cepat, dan aman. Nikmati fasilitas premium kami sekarang.</p></div></div></section><section class="max-w-4xl mx-auto -mt-16 md:-mt-24 relative z-20">`);
      _push(ssrRenderComponent(_component_UCard, { class: "shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 backdrop-blur-sm bg-white/95" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 md:p-4"${_scopeId}><h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-magnifying-glass",
              class: "text-primary-500"
            }, null, _parent2, _scopeId));
            _push2(` Cari Tiket Bus </h2><form class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Dari (Asal)",
              class: "w-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelect, {
                    modelValue: searchForm.value.from,
                    "onUpdate:modelValue": ($event) => searchForm.value.from = $event,
                    options: cities,
                    placeholder: "Pilih Kota",
                    icon: "i-heroicons-map-pin"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelect, {
                      modelValue: searchForm.value.from,
                      "onUpdate:modelValue": ($event) => searchForm.value.from = $event,
                      options: cities,
                      placeholder: "Pilih Kota",
                      icon: "i-heroicons-map-pin"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Ke (Tujuan)",
              class: "w-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelect, {
                    modelValue: searchForm.value.to,
                    "onUpdate:modelValue": ($event) => searchForm.value.to = $event,
                    options: cities,
                    placeholder: "Pilih Kota",
                    icon: "i-heroicons-map"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelect, {
                      modelValue: searchForm.value.to,
                      "onUpdate:modelValue": ($event) => searchForm.value.to = $event,
                      options: cities,
                      placeholder: "Pilih Kota",
                      icon: "i-heroicons-map"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Tanggal Keberangkatan",
              class: "w-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    type: "date",
                    modelValue: searchForm.value.date,
                    "onUpdate:modelValue": ($event) => searchForm.value.date = $event,
                    min: unref(minDate),
                    max: unref(maxDate),
                    icon: "i-heroicons-calendar"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      type: "date",
                      modelValue: searchForm.value.date,
                      "onUpdate:modelValue": ($event) => searchForm.value.date = $event,
                      min: unref(minDate),
                      max: unref(maxDate),
                      icon: "i-heroicons-calendar"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Penumpang",
              class: "w-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    type: "number",
                    modelValue: searchForm.value.passengers,
                    "onUpdate:modelValue": ($event) => searchForm.value.passengers = $event,
                    min: "1",
                    max: "10",
                    icon: "i-heroicons-user-group"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      type: "number",
                      modelValue: searchForm.value.passengers,
                      "onUpdate:modelValue": ($event) => searchForm.value.passengers = $event,
                      min: "1",
                      max: "10",
                      icon: "i-heroicons-user-group"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="md:col-span-4 mt-4 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              type: "submit",
              size: "lg",
              color: "primary",
              class: "w-full md:w-auto px-8 py-3 font-bold text-lg",
              icon: "i-heroicons-magnifying-glass"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cari Jadwal`);
                } else {
                  return [
                    createTextVNode("Cari Jadwal")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 md:p-4" }, [
                createVNode("h2", { class: "text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-magnifying-glass",
                    class: "text-primary-500"
                  }),
                  createTextVNode(" Cari Tiket Bus ")
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(searchTickets, ["prevent"]),
                  class: "grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
                }, [
                  createVNode(_component_UFormGroup, {
                    label: "Dari (Asal)",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_USelect, {
                        modelValue: searchForm.value.from,
                        "onUpdate:modelValue": ($event) => searchForm.value.from = $event,
                        options: cities,
                        placeholder: "Pilih Kota",
                        icon: "i-heroicons-map-pin"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Ke (Tujuan)",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_USelect, {
                        modelValue: searchForm.value.to,
                        "onUpdate:modelValue": ($event) => searchForm.value.to = $event,
                        options: cities,
                        placeholder: "Pilih Kota",
                        icon: "i-heroicons-map"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Tanggal Keberangkatan",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        type: "date",
                        modelValue: searchForm.value.date,
                        "onUpdate:modelValue": ($event) => searchForm.value.date = $event,
                        min: unref(minDate),
                        max: unref(maxDate),
                        icon: "i-heroicons-calendar"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Penumpang",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        type: "number",
                        modelValue: searchForm.value.passengers,
                        "onUpdate:modelValue": ($event) => searchForm.value.passengers = $event,
                        min: "1",
                        max: "10",
                        icon: "i-heroicons-user-group"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "md:col-span-4 mt-4 flex justify-end" }, [
                    createVNode(_component_UButton, {
                      type: "submit",
                      size: "lg",
                      color: "primary",
                      class: "w-full md:w-auto px-8 py-3 font-bold text-lg",
                      icon: "i-heroicons-magnifying-glass"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Cari Jadwal")
                      ]),
                      _: 1
                    })
                  ])
                ], 32)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-8"><div class="text-center space-y-3 p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shield-check",
        class: "w-12 h-12 mx-auto text-primary-500"
      }, null, _parent));
      _push(`<h3 class="text-xl font-bold">Pembayaran Aman</h3><p class="text-gray-500 text-sm">Didukung oleh sistem payment gateway Doku yang menjamin sekuritas tiap transaksi Anda.</p></div><div class="text-center space-y-3 p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-ticket",
        class: "w-12 h-12 mx-auto text-primary-500"
      }, null, _parent));
      _push(`<h3 class="text-xl font-bold">E-Ticket Mudah</h3><p class="text-gray-500 text-sm">Tidak perlu mencetak tiket fisik. Cukup tunjukkan barcode di HP untuk naik ke bus.</p></div><div class="text-center space-y-3 p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-map",
        class: "w-12 h-12 mx-auto text-primary-500"
      }, null, _parent));
      _push(`<h3 class="text-xl font-bold">Pilih Kursi Sendiri</h3><p class="text-gray-500 text-sm">Pilih jadwal dan kursi favoritmu langsung melalui aplikasi kami.</p></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DXiq5bIw.mjs.map
