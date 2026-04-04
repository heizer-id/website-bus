import { _ as _sfc_main$1 } from './Button-Cpjpb6pe.mjs';
import { _ as _sfc_main$2 } from './Card-DZR1gGaG.mjs';
import { _ as _sfc_main$3 } from './Table-DOImr7F6.mjs';
import { _ as _sfc_main$4 } from './Badge-DCjZ1sGf.mjs';
import { _ as _sfc_main$5 } from './Slideover-Cu-AAgrQ.mjs';
import { _ as _sfc_main$6 } from './Select-BXFysh1p.mjs';
import { _ as _sfc_main$7 } from './Input-YgTwjt5M.mjs';
import { defineComponent, withAsyncContext, computed, ref, resolveComponent, withCtx, createTextVNode, unref, createVNode, toDisplayString, withModifiers, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useToast } from './useToast-kaLd0qVn.mjs';
import { u as useFetch } from './fetch-DZCENMU-.mjs';
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
import './Icon-Cn3quCLZ.mjs';
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
import './nuxt-link-CB-lW4AY.mjs';
import '@tanstack/vue-table';
import '@tanstack/vue-virtual';
import './useLocale-BFGS0yjh.mjs';
import '@floating-ui/vue';
import '@vueuse/shared';
import 'aria-hidden';
import '@vue/shared';
import './ssr-C1pPD3yl.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "schedules",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const toast = useToast();
    const formatRupiah = (number) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);
    };
    const formatDateTime = (iso) => {
      return new Date(iso).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
    };
    const columns = [
      { key: "bus_name", label: "Armada / Kelas" },
      { key: "route_from", label: "Asal" },
      { key: "route_to", label: "Tujuan" },
      { key: "departure_time", label: "Berangkat" },
      { key: "arrival_time", label: "Tiba" },
      { key: "price", label: "Tarif" },
      { key: "actions" }
    ];
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/schedules",
      "$vraOHSyRgd"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: busList } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/buses",
      "$q85FO0Hx2p"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const busOptions = computed(() => {
      if (!busList.value?.buses) return [];
      return busList.value.buses.map((b) => ({ label: `${b.name} (${b.class})`, value: b.id }));
    });
    const isOpen = ref(false);
    const saving = ref(false);
    const form = ref({
      bus_id: null,
      route_from: "",
      route_to: "",
      departure_time: "",
      arrival_time: "",
      price: 15e4
    });
    const submitSchedule = async () => {
      saving.value = true;
      try {
        const payload = { ...form.value };
        if (payload.departure_time.length === 16) payload.departure_time += ":00.000Z";
        if (payload.arrival_time.length === 16) payload.arrival_time += ":00.000Z";
        await $fetch("/api/admin/schedules", { method: "POST", body: payload });
        toast.add({ title: "Jadwal diterbitkan", color: "green" });
        isOpen.value = false;
        refresh();
      } catch (err) {
        toast.add({ title: "Gagal", description: err.message, color: "red" });
      } finally {
        saving.value = false;
      }
    };
    const deleteSchedule = async (id) => {
      if (!confirm("Hapus jadwal ini selamanya?")) return;
      try {
        await $fetch("/api/admin/schedules", { method: "POST", body: { action: "delete", id } });
        toast.add({ title: "Jadwal Dihapus", color: "gray" });
        refresh();
      } catch (err) {
        toast.add({ title: "Gagal", description: err.message, color: "red" });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      const _component_UTable = _sfc_main$3;
      const _component_UBadge = _sfc_main$4;
      const _component_USlideover = _sfc_main$5;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_USelect = _sfc_main$6;
      const _component_UInput = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-6"><h1 class="text-2xl font-bold">Penugasan Jadwal Armada</h1>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        icon: "i-heroicons-plus",
        onClick: ($event) => isOpen.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Buat Jadwal Baru`);
          } else {
            return [
              createTextVNode("Buat Jadwal Baru")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UTable, {
              rows: unref(data)?.schedules || [],
              columns,
              loading: unref(pending)
            }, {
              "bus_name-data": withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="font-bold"${_scopeId2}>${ssrInterpolate(row.bus_name)}</span> - `);
                  _push3(ssrRenderComponent(_component_UBadge, {
                    size: "xs",
                    color: "blue",
                    variant: "soft"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.bus_class)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.bus_class), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", { class: "font-bold" }, toDisplayString(row.bus_name), 1),
                    createTextVNode(" - "),
                    createVNode(_component_UBadge, {
                      size: "xs",
                      color: "blue",
                      variant: "soft"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.bus_class), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              "departure_time-data": withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(formatDateTime(row.departure_time))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(formatDateTime(row.departure_time)), 1)
                  ];
                }
              }),
              "arrival_time-data": withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(formatDateTime(row.arrival_time))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(formatDateTime(row.arrival_time)), 1)
                  ];
                }
              }),
              "price-data": withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(formatRupiah(row.price))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(formatRupiah(row.price)), 1)
                  ];
                }
              }),
              "actions-data": withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "red",
                    variant: "ghost",
                    icon: "i-heroicons-trash",
                    size: "sm",
                    onClick: ($event) => deleteSchedule(row.id)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      color: "red",
                      variant: "ghost",
                      icon: "i-heroicons-trash",
                      size: "sm",
                      onClick: ($event) => deleteSchedule(row.id)
                    }, null, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UTable, {
                rows: unref(data)?.schedules || [],
                columns,
                loading: unref(pending)
              }, {
                "bus_name-data": withCtx(({ row }) => [
                  createVNode("span", { class: "font-bold" }, toDisplayString(row.bus_name), 1),
                  createTextVNode(" - "),
                  createVNode(_component_UBadge, {
                    size: "xs",
                    color: "blue",
                    variant: "soft"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.bus_class), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                "departure_time-data": withCtx(({ row }) => [
                  createTextVNode(toDisplayString(formatDateTime(row.departure_time)), 1)
                ]),
                "arrival_time-data": withCtx(({ row }) => [
                  createTextVNode(toDisplayString(formatDateTime(row.arrival_time)), 1)
                ]),
                "price-data": withCtx(({ row }) => [
                  createTextVNode(toDisplayString(formatRupiah(row.price)), 1)
                ]),
                "actions-data": withCtx(({ row }) => [
                  createVNode(_component_UButton, {
                    color: "red",
                    variant: "ghost",
                    icon: "i-heroicons-trash",
                    size: "sm",
                    onClick: ($event) => deleteSchedule(row.id)
                  }, null, 8, ["onClick"])
                ]),
                _: 1
              }, 8, ["rows", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_USlideover, {
        modelValue: isOpen.value,
        "onUpdate:modelValue": ($event) => isOpen.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 flex-1 flex flex-col"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><h3 class="text-lg font-bold text-gray-900"${_scopeId}>Pembuatan Jadwal Baru</h3>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "ghost",
              icon: "i-heroicons-x-mark",
              class: "-my-1",
              onClick: ($event) => isOpen.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div><form class="space-y-4 flex-1 overflow-y-auto"${_scopeId}>`);
            if (unref(busList)) {
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Pilih Armada Bus",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_USelect, {
                      modelValue: form.value.bus_id,
                      "onUpdate:modelValue": ($event) => form.value.bus_id = $event,
                      options: busOptions.value,
                      required: ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_USelect, {
                        modelValue: form.value.bus_id,
                        "onUpdate:modelValue": ($event) => form.value.bus_id = $event,
                        options: busOptions.value,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-2 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Rute Asal",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.route_from,
                    "onUpdate:modelValue": ($event) => form.value.route_from = $event,
                    placeholder: "Ex: Jakarta",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.route_from,
                      "onUpdate:modelValue": ($event) => form.value.route_from = $event,
                      placeholder: "Ex: Jakarta",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Rute Tujuan",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.route_to,
                    "onUpdate:modelValue": ($event) => form.value.route_to = $event,
                    placeholder: "Ex: Surabaya",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.route_to,
                      "onUpdate:modelValue": ($event) => form.value.route_to = $event,
                      placeholder: "Ex: Surabaya",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-4 border-t pt-4 mt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Waktu Keberangkatan (ISO)",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.departure_time,
                    "onUpdate:modelValue": ($event) => form.value.departure_time = $event,
                    type: "datetime-local",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.departure_time,
                      "onUpdate:modelValue": ($event) => form.value.departure_time = $event,
                      type: "datetime-local",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Estimasi Tiba (ISO)",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.arrival_time,
                    "onUpdate:modelValue": ($event) => form.value.arrival_time = $event,
                    type: "datetime-local",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.arrival_time,
                      "onUpdate:modelValue": ($event) => form.value.arrival_time = $event,
                      type: "datetime-local",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Harga Tiket (Rupiah)",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.price,
                    "onUpdate:modelValue": ($event) => form.value.price = $event,
                    type: "number",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.price,
                      "onUpdate:modelValue": ($event) => form.value.price = $event,
                      type: "number",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="pt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              type: "submit",
              color: "primary",
              block: "",
              loading: saving.value,
              size: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Publikasi Jadwal`);
                } else {
                  return [
                    createTextVNode("Publikasi Jadwal")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 flex-1 flex flex-col" }, [
                createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                  createVNode("h3", { class: "text-lg font-bold text-gray-900" }, "Pembuatan Jadwal Baru"),
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "ghost",
                    icon: "i-heroicons-x-mark",
                    class: "-my-1",
                    onClick: ($event) => isOpen.value = false
                  }, null, 8, ["onClick"])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submitSchedule, ["prevent"]),
                  class: "space-y-4 flex-1 overflow-y-auto"
                }, [
                  unref(busList) ? (openBlock(), createBlock(_component_UFormGroup, {
                    key: 0,
                    label: "Pilih Armada Bus",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_USelect, {
                        modelValue: form.value.bus_id,
                        "onUpdate:modelValue": ($event) => form.value.bus_id = $event,
                        options: busOptions.value,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode(_component_UFormGroup, {
                      label: "Rute Asal",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: form.value.route_from,
                          "onUpdate:modelValue": ($event) => form.value.route_from = $event,
                          placeholder: "Ex: Jakarta",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Rute Tujuan",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: form.value.route_to,
                          "onUpdate:modelValue": ($event) => form.value.route_to = $event,
                          placeholder: "Ex: Surabaya",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "space-y-4 border-t pt-4 mt-2" }, [
                    createVNode(_component_UFormGroup, {
                      label: "Waktu Keberangkatan (ISO)",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: form.value.departure_time,
                          "onUpdate:modelValue": ($event) => form.value.departure_time = $event,
                          type: "datetime-local",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Estimasi Tiba (ISO)",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: form.value.arrival_time,
                          "onUpdate:modelValue": ($event) => form.value.arrival_time = $event,
                          type: "datetime-local",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_UFormGroup, {
                    label: "Harga Tiket (Rupiah)",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: form.value.price,
                        "onUpdate:modelValue": ($event) => form.value.price = $event,
                        type: "number",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "pt-6" }, [
                    createVNode(_component_UButton, {
                      type: "submit",
                      color: "primary",
                      block: "",
                      loading: saving.value,
                      size: "lg"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Publikasi Jadwal")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ])
                ], 32)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/schedules.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=schedules-CSpmL1Rg.mjs.map
