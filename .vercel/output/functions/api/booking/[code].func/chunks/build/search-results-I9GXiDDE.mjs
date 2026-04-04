import { _ as _sfc_main$2 } from './Button-Cpjpb6pe.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _sfc_main$4, u as useComponentUI, t as tv, P as Primitive } from './Icon-Cn3quCLZ.mjs';
import { a as useAppConfig } from './server.mjs';
import { _ as _sfc_main$3 } from './Card-DZR1gGaG.mjs';
import { _ as _sfc_main$5 } from './Badge-DCjZ1sGf.mjs';
import { useRoute, useRouter } from 'vue-router';
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
import './Avatar-BJ43_zGK.mjs';
import '@vueuse/core';
import './nuxt-link-CB-lW4AY.mjs';
import 'tailwind-variants';
import './index-BIiJQGKL.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vue/shared';
import './ssr-C1pPD3yl.mjs';

const theme = {
  "base": "animate-pulse rounded-md bg-elevated"
};
const _sfc_main$1 = {
  __name: "USkeleton",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const props = __props;
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("skeleton", props);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.skeleton || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "aria-busy": "true",
        "aria-label": "loading",
        "aria-live": "polite",
        role: "alert",
        class: ui.value({ class: [unref(uiProp)?.base, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Skeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "search-results",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const from = route.query.from || "";
    const to = route.query.to || "";
    const date = route.query.date || "";
    const passengers = parseInt(route.query.passengers?.toString() || "1");
    const dateFormatted = computed(() => {
      if (!date) return "";
      return new Date(date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    });
    const { data: schedules, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/schedules",
      {
        query: { from, to, date },
        lazy: true
      },
      "$9JGffe5sMZ"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const sortedSchedules = computed(() => {
      if (!schedules.value) return [];
      return [...schedules.value].sort((a, b) => new Date(a.departure_time).getTime() - new Date(b.departure_time).getTime());
    });
    const formatRupiah = (number) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);
    };
    const timeFormat = (isoString) => {
      return new Date(isoString).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    };
    const getClassColor = (cls) => {
      switch (cls.toLowerCase()) {
        case "ekonomi":
          return "green";
        case "bisnis":
          return "blue";
        case "eksekutif":
          return "purple";
        case "sleeper":
          return "orange";
        default:
          return "gray";
      }
    };
    const getSeatsColor = (seats) => {
      if (seats <= 5) return "text-red-500 font-medium";
      return "text-gray-500";
    };
    const chooseSchedule = (scheduleId) => {
      router.push({
        path: "/seat-selection",
        query: {
          scheduleId,
          passengers
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$2;
      const _component_USkeleton = _sfc_main$1;
      const _component_UCard = _sfc_main$3;
      const _component_UIcon = _sfc_main$4;
      const _component_UBadge = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold">Hasil Pencarian</h1><p class="text-gray-600">${ssrInterpolate(unref(from))} → ${ssrInterpolate(unref(to))} • ${ssrInterpolate(dateFormatted.value)} • ${ssrInterpolate(unref(passengers))} Penumpang</p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/",
        variant: "outline",
        icon: "i-heroicons-arrow-left"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Ubah Cari`);
          } else {
            return [
              createTextVNode("Ubah Cari")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(pending)) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(ssrRenderComponent(_component_USkeleton, {
            key: i,
            class: "h-32 w-full rounded-xl"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (!unref(schedules) || unref(schedules).length === 0) {
        _push(ssrRenderComponent(_component_UCard, { class: "text-center py-12" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-calendar-days",
                class: "w-16 h-16 mx-auto text-gray-400 mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<h2 class="text-xl font-medium text-gray-900"${_scopeId}>Maaf, Jadwal Tidak Ditemukan</h2><p class="text-gray-500 mt-2"${_scopeId}>Belum ada bus yang beroperasi untuk rute dan tanggal pilihanmu.</p>`);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-calendar-days",
                  class: "w-16 h-16 mx-auto text-gray-400 mb-4"
                }),
                createVNode("h2", { class: "text-xl font-medium text-gray-900" }, "Maaf, Jadwal Tidak Ditemukan"),
                createVNode("p", { class: "text-gray-500 mt-2" }, "Belum ada bus yang beroperasi untuk rute dan tanggal pilihanmu.")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(sortedSchedules.value, (schedule) => {
          _push(ssrRenderComponent(_component_UCard, {
            key: schedule.id,
            class: "hover:border-primary-500 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex flex-col md:flex-row justify-between items-center gap-6"${_scopeId}><div class="flex-1 w-full space-y-4"${_scopeId}><div class="flex items-center justify-between md:justify-start gap-4"${_scopeId}><h3 class="text-lg font-bold text-gray-900"${_scopeId}>${ssrInterpolate(schedule.bus_name)}</h3>`);
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: getClassColor(schedule.bus_class),
                  variant: "subtle",
                  class: "capitalize"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(schedule.bus_class)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(schedule.bus_class), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="flex items-center gap-6"${_scopeId}><div class="text-center"${_scopeId}><div class="text-xl font-bold"${_scopeId}>${ssrInterpolate(timeFormat(schedule.departure_time))}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(schedule.route_from)}</div></div><div class="flex-1 min-w-[100px] flex items-center justify-center"${_scopeId}><div class="h-px bg-gray-300 w-full relative"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-chevron-right",
                  class: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 bg-white px-1"
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="text-center"${_scopeId}><div class="text-xl font-bold"${_scopeId}>${ssrInterpolate(timeFormat(schedule.arrival_time))}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(schedule.route_to)}</div></div></div></div><div class="w-full md:w-auto md:min-w-[200px] flex flex-row md:flex-col justify-between items-center md:items-end gap-2 md:border-l border-gray-100 pl-0 md:pl-6"${_scopeId}><div class="text-right"${_scopeId}><div class="text-2xl font-bold text-primary-600"${_scopeId}>${ssrInterpolate(formatRupiah(schedule.price))}</div><div class="${ssrRenderClass([getSeatsColor(schedule.total_seats - schedule.booked_seats), "text-sm"])}"${_scopeId}> Sisa ${ssrInterpolate(schedule.total_seats - schedule.booked_seats)} kursi </div></div>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: ($event) => chooseSchedule(schedule.id),
                  disabled: schedule.total_seats - schedule.booked_seats < unref(passengers),
                  color: "primary",
                  class: "font-bold px-6 py-2",
                  label: schedule.total_seats - schedule.booked_seats < unref(passengers) ? "Penuh" : "Pilih"
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex flex-col md:flex-row justify-between items-center gap-6" }, [
                    createVNode("div", { class: "flex-1 w-full space-y-4" }, [
                      createVNode("div", { class: "flex items-center justify-between md:justify-start gap-4" }, [
                        createVNode("h3", { class: "text-lg font-bold text-gray-900" }, toDisplayString(schedule.bus_name), 1),
                        createVNode(_component_UBadge, {
                          color: getClassColor(schedule.bus_class),
                          variant: "subtle",
                          class: "capitalize"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(schedule.bus_class), 1)
                          ]),
                          _: 2
                        }, 1032, ["color"])
                      ]),
                      createVNode("div", { class: "flex items-center gap-6" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-xl font-bold" }, toDisplayString(timeFormat(schedule.departure_time)), 1),
                          createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(schedule.route_from), 1)
                        ]),
                        createVNode("div", { class: "flex-1 min-w-[100px] flex items-center justify-center" }, [
                          createVNode("div", { class: "h-px bg-gray-300 w-full relative" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-chevron-right",
                              class: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 bg-white px-1"
                            })
                          ])
                        ]),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-xl font-bold" }, toDisplayString(timeFormat(schedule.arrival_time)), 1),
                          createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(schedule.route_to), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "w-full md:w-auto md:min-w-[200px] flex flex-row md:flex-col justify-between items-center md:items-end gap-2 md:border-l border-gray-100 pl-0 md:pl-6" }, [
                      createVNode("div", { class: "text-right" }, [
                        createVNode("div", { class: "text-2xl font-bold text-primary-600" }, toDisplayString(formatRupiah(schedule.price)), 1),
                        createVNode("div", {
                          class: ["text-sm", getSeatsColor(schedule.total_seats - schedule.booked_seats)]
                        }, " Sisa " + toDisplayString(schedule.total_seats - schedule.booked_seats) + " kursi ", 3)
                      ]),
                      createVNode(_component_UButton, {
                        onClick: ($event) => chooseSchedule(schedule.id),
                        disabled: schedule.total_seats - schedule.booked_seats < unref(passengers),
                        color: "primary",
                        class: "font-bold px-6 py-2",
                        label: schedule.total_seats - schedule.booked_seats < unref(passengers) ? "Penuh" : "Pilih"
                      }, null, 8, ["onClick", "disabled", "label"])
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search-results.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=search-results-I9GXiDDE.mjs.map
