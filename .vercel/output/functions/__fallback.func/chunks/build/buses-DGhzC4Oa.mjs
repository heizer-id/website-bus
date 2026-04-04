import { _ as _sfc_main$1 } from './Button-Cpjpb6pe.mjs';
import { _ as _sfc_main$2 } from './Card-DZR1gGaG.mjs';
import { _ as _sfc_main$3 } from './Table-DOImr7F6.mjs';
import { _ as _sfc_main$4 } from './Badge-DCjZ1sGf.mjs';
import { _ as _sfc_main$5 } from './Slideover-Cu-AAgrQ.mjs';
import { _ as _sfc_main$6 } from './Input-YgTwjt5M.mjs';
import { _ as _sfc_main$7 } from './Select-BXFysh1p.mjs';
import { defineComponent, withAsyncContext, ref, resolveComponent, withCtx, createTextVNode, unref, createVNode, toDisplayString, withModifiers, useSSRContext } from 'vue';
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
  __name: "buses",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const toast = useToast();
    const columns = [
      { key: "id", label: "ID" },
      { key: "name", label: "Nama Bus" },
      { key: "class", label: "Kelas" },
      { key: "total_seats", label: "Jumlah Kursi" },
      { key: "seat_layout", label: "Format Baris" },
      { key: "actions" }
    ];
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/buses",
      "$H3S-aUCfWN"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const isOpen = ref(false);
    const saving = ref(false);
    const form = ref({
      name: "",
      busClass: "Eksekutif",
      totalSeats: 30,
      layoutConfig: { rows: 10, cols: 4, aisle: 2 }
    });
    const submitBus = async () => {
      saving.value = true;
      try {
        await $fetch("/api/admin/buses", { method: "POST", body: form.value });
        toast.add({ title: "Sukses", description: "Armada ditambahkan", color: "green" });
        isOpen.value = false;
        refresh();
        form.value.name = "";
      } catch (err) {
        toast.add({ title: "Gagal", description: err.message || "Error", color: "red" });
      } finally {
        saving.value = false;
      }
    };
    const deleteBus = async (id) => {
      if (!confirm("Apakah Yakin ingin menghapus armada ini?")) return;
      try {
        await $fetch("/api/admin/buses", { method: "POST", body: { action: "delete", id } });
        toast.add({ title: "Data Dihapus", color: "gray" });
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
      const _component_UInput = _sfc_main$6;
      const _component_USelect = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-6"><h1 class="text-2xl font-bold">Manajemen Armada Bus</h1>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        icon: "i-heroicons-plus",
        onClick: ($event) => isOpen.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Tambah Bus Baru`);
          } else {
            return [
              createTextVNode("Tambah Bus Baru")
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
              rows: unref(data)?.buses || [],
              columns,
              loading: unref(pending)
            }, {
              "seat_layout-data": withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UBadge, {
                    color: "gray",
                    variant: "soft"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(JSON.parse(row.seat_layout).rows)}x${ssrInterpolate(JSON.parse(row.seat_layout).cols)} (Lorong: ${ssrInterpolate(JSON.parse(row.seat_layout).aisle)}) `);
                      } else {
                        return [
                          createTextVNode(toDisplayString(JSON.parse(row.seat_layout).rows) + "x" + toDisplayString(JSON.parse(row.seat_layout).cols) + " (Lorong: " + toDisplayString(JSON.parse(row.seat_layout).aisle) + ") ", 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UBadge, {
                      color: "gray",
                      variant: "soft"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(JSON.parse(row.seat_layout).rows) + "x" + toDisplayString(JSON.parse(row.seat_layout).cols) + " (Lorong: " + toDisplayString(JSON.parse(row.seat_layout).aisle) + ") ", 1)
                      ]),
                      _: 2
                    }, 1024)
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
                    onClick: ($event) => deleteBus(row.id)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      color: "red",
                      variant: "ghost",
                      icon: "i-heroicons-trash",
                      size: "sm",
                      onClick: ($event) => deleteBus(row.id)
                    }, null, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UTable, {
                rows: unref(data)?.buses || [],
                columns,
                loading: unref(pending)
              }, {
                "seat_layout-data": withCtx(({ row }) => [
                  createVNode(_component_UBadge, {
                    color: "gray",
                    variant: "soft"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(JSON.parse(row.seat_layout).rows) + "x" + toDisplayString(JSON.parse(row.seat_layout).cols) + " (Lorong: " + toDisplayString(JSON.parse(row.seat_layout).aisle) + ") ", 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                "actions-data": withCtx(({ row }) => [
                  createVNode(_component_UButton, {
                    color: "red",
                    variant: "ghost",
                    icon: "i-heroicons-trash",
                    size: "sm",
                    onClick: ($event) => deleteBus(row.id)
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
            _push2(`<div class="p-4 flex-1 flex flex-col"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><h3 class="text-lg font-bold text-gray-900"${_scopeId}>Tambah Bus Baru</h3>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "ghost",
              icon: "i-heroicons-x-mark",
              class: "-my-1",
              onClick: ($event) => isOpen.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div><form class="space-y-4 flex-1 overflow-y-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Nama Bus",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.name,
                    "onUpdate:modelValue": ($event) => form.value.name = $event,
                    placeholder: "contoh: PO Haryanto VIP",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.name,
                      "onUpdate:modelValue": ($event) => form.value.name = $event,
                      placeholder: "contoh: PO Haryanto VIP",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Kelas",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelect, {
                    modelValue: form.value.busClass,
                    "onUpdate:modelValue": ($event) => form.value.busClass = $event,
                    options: ["Ekonomi", "VIP", "Eksekutif", "Sleeper"],
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelect, {
                      modelValue: form.value.busClass,
                      "onUpdate:modelValue": ($event) => form.value.busClass = $event,
                      options: ["Ekonomi", "VIP", "Eksekutif", "Sleeper"],
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Total Kursi",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.totalSeats,
                    "onUpdate:modelValue": ($event) => form.value.totalSeats = $event,
                    type: "number",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.totalSeats,
                      "onUpdate:modelValue": ($event) => form.value.totalSeats = $event,
                      type: "number",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="space-y-2 border-t pt-2 mt-4 border-gray-200"${_scopeId}><p class="text-sm font-bold text-gray-600"${_scopeId}>Kustomisasi Tata Letak Kursi</p><div class="grid grid-cols-3 gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Total Baris" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.layoutConfig.rows,
                    "onUpdate:modelValue": ($event) => form.value.layoutConfig.rows = $event,
                    type: "number",
                    min: "1",
                    max: "15",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.layoutConfig.rows,
                      "onUpdate:modelValue": ($event) => form.value.layoutConfig.rows = $event,
                      type: "number",
                      min: "1",
                      max: "15",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Kolom Kiri+Kanan" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.layoutConfig.cols,
                    "onUpdate:modelValue": ($event) => form.value.layoutConfig.cols = $event,
                    type: "number",
                    min: "2",
                    max: "6",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.layoutConfig.cols,
                      "onUpdate:modelValue": ($event) => form.value.layoutConfig.cols = $event,
                      type: "number",
                      min: "2",
                      max: "6",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Posisi Lorong" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.layoutConfig.aisle,
                    "onUpdate:modelValue": ($event) => form.value.layoutConfig.aisle = $event,
                    type: "number",
                    min: "1",
                    max: "5",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.layoutConfig.aisle,
                      "onUpdate:modelValue": ($event) => form.value.layoutConfig.aisle = $event,
                      type: "number",
                      min: "1",
                      max: "5",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><p class="text-xs text-gray-400 mt-1"${_scopeId}>Misal: Kolom=4 &amp; Lorong=2 (berarti format 2-2).</p></div><div class="pt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              type: "submit",
              color: "primary",
              block: "",
              loading: saving.value,
              size: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Simpan Armada`);
                } else {
                  return [
                    createTextVNode("Simpan Armada")
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
                  createVNode("h3", { class: "text-lg font-bold text-gray-900" }, "Tambah Bus Baru"),
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "ghost",
                    icon: "i-heroicons-x-mark",
                    class: "-my-1",
                    onClick: ($event) => isOpen.value = false
                  }, null, 8, ["onClick"])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submitBus, ["prevent"]),
                  class: "space-y-4 flex-1 overflow-y-auto"
                }, [
                  createVNode(_component_UFormGroup, {
                    label: "Nama Bus",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: form.value.name,
                        "onUpdate:modelValue": ($event) => form.value.name = $event,
                        placeholder: "contoh: PO Haryanto VIP",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Kelas",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_USelect, {
                        modelValue: form.value.busClass,
                        "onUpdate:modelValue": ($event) => form.value.busClass = $event,
                        options: ["Ekonomi", "VIP", "Eksekutif", "Sleeper"],
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Total Kursi",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: form.value.totalSeats,
                        "onUpdate:modelValue": ($event) => form.value.totalSeats = $event,
                        type: "number",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-y-2 border-t pt-2 mt-4 border-gray-200" }, [
                    createVNode("p", { class: "text-sm font-bold text-gray-600" }, "Kustomisasi Tata Letak Kursi"),
                    createVNode("div", { class: "grid grid-cols-3 gap-2" }, [
                      createVNode(_component_UFormGroup, { label: "Total Baris" }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: form.value.layoutConfig.rows,
                            "onUpdate:modelValue": ($event) => form.value.layoutConfig.rows = $event,
                            type: "number",
                            min: "1",
                            max: "15",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormGroup, { label: "Kolom Kiri+Kanan" }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: form.value.layoutConfig.cols,
                            "onUpdate:modelValue": ($event) => form.value.layoutConfig.cols = $event,
                            type: "number",
                            min: "2",
                            max: "6",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormGroup, { label: "Posisi Lorong" }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: form.value.layoutConfig.aisle,
                            "onUpdate:modelValue": ($event) => form.value.layoutConfig.aisle = $event,
                            type: "number",
                            min: "1",
                            max: "5",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("p", { class: "text-xs text-gray-400 mt-1" }, "Misal: Kolom=4 & Lorong=2 (berarti format 2-2).")
                  ]),
                  createVNode("div", { class: "pt-6" }, [
                    createVNode(_component_UButton, {
                      type: "submit",
                      color: "primary",
                      block: "",
                      loading: saving.value,
                      size: "lg"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Simpan Armada")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/buses.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=buses-DGhzC4Oa.mjs.map
