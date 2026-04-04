import { _ as _sfc_main$1 } from './Container-xfVrQY1m.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CB-lW4AY.mjs';
import { _ as _sfc_main$2 } from './Icon-Cn3quCLZ.mjs';
import { _ as _sfc_main$3 } from './Button-Cpjpb6pe.mjs';
import { _ as __nuxt_component_4 } from './index-BIiJQGKL.mjs';
import { defineComponent, ref, computed, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, openBlock, createBlock, Fragment, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BVJ85bH0.mjs';
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
import '@vueuse/core';
import './Avatar-BJ43_zGK.mjs';
import '@iconify/utils/lib/css/icon';
import './ssr-C1pPD3yl.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const pendingAuth = ref(false);
    const handleLogout = async () => {
      await logout();
      (void 0).location.reload();
    };
    const items = computed(() => {
      const menus = [
        [
          { label: isAdmin.value ? "Masuk Dasbor Admin" : "Riwayat Pesanan Saya", icon: isAdmin.value ? "i-heroicons-shield-check" : "i-heroicons-ticket", to: isAdmin.value ? "/admin" : "/user" }
        ],
        [
          { label: "Keluar Akun", icon: "i-heroicons-arrow-left-on-rectangle", click: handleLogout }
        ]
      ];
      return menus;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UIcon = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      const _component_UDropdown = resolveComponent("UDropdown");
      const _component_ClientOnly = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex flex-col" }, _attrs))}><header class="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">`);
      _push(ssrRenderComponent(_component_UContainer, { class: "flex items-center justify-between h-16 h-max-16" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/",
              class: "flex items-center gap-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-paper-airplane",
                    class: "w-8 h-8 text-primary-600"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-xl font-black text-gray-900 tracking-tight"${_scopeId2}>NUSA<span class="text-primary-500"${_scopeId2}>BUS</span></span>`);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-paper-airplane",
                      class: "w-8 h-8 text-primary-600"
                    }),
                    createVNode("span", { class: "text-xl font-black text-gray-900 tracking-tight" }, [
                      createTextVNode("NUSA"),
                      createVNode("span", { class: "text-primary-500" }, "BUS")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<nav class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/",
              class: "text-sm font-medium text-gray-600 hover:text-primary-600 transition"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Beranda`);
                } else {
                  return [
                    createTextVNode("Beranda")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (pendingAuth.value) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "animate-spin w-5 h-5 text-gray-400"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!--[-->`);
              if (!unref(isAuthenticated)) {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(_component_UButton, {
                  to: "/login",
                  variant: "ghost",
                  color: "gray"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Masuk`);
                    } else {
                      return [
                        createTextVNode("Masuk")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UButton, {
                  to: "/register",
                  color: "primary"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Daftar`);
                    } else {
                      return [
                        createTextVNode("Daftar")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<!--]-->`);
              } else {
                _push2(ssrRenderComponent(_component_UDropdown, {
                  items: items.value,
                  popper: { placement: "bottom-end" }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UButton, {
                        color: "white",
                        "trailing-icon": "i-heroicons-chevron-down-20-solid"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UIcon, {
                              name: "i-heroicons-user-circle",
                              class: "w-5 h-5 mr-1 text-primary-500"
                            }, null, _parent4, _scopeId3));
                            _push4(`<span class="truncate max-w-[100px]"${_scopeId3}>${ssrInterpolate(unref(user)?.name?.split(" ")[0] || "User")}</span>`);
                          } else {
                            return [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-user-circle",
                                class: "w-5 h-5 mr-1 text-primary-500"
                              }),
                              createVNode("span", { class: "truncate max-w-[100px]" }, toDisplayString(unref(user)?.name?.split(" ")[0] || "User"), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UButton, {
                          color: "white",
                          "trailing-icon": "i-heroicons-chevron-down-20-solid"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-user-circle",
                              class: "w-5 h-5 mr-1 text-primary-500"
                            }),
                            createVNode("span", { class: "truncate max-w-[100px]" }, toDisplayString(unref(user)?.name?.split(" ")[0] || "User"), 1)
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              }
              _push2(`<!--]-->`);
            }
            _push2(`</nav>`);
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/",
                class: "flex items-center gap-2"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-paper-airplane",
                    class: "w-8 h-8 text-primary-600"
                  }),
                  createVNode("span", { class: "text-xl font-black text-gray-900 tracking-tight" }, [
                    createTextVNode("NUSA"),
                    createVNode("span", { class: "text-primary-500" }, "BUS")
                  ])
                ]),
                _: 1
              }),
              createVNode("nav", { class: "flex items-center gap-4" }, [
                createVNode(_component_NuxtLink, {
                  to: "/",
                  class: "text-sm font-medium text-gray-600 hover:text-primary-600 transition"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Beranda")
                  ]),
                  _: 1
                }),
                pendingAuth.value ? (openBlock(), createBlock(_component_UIcon, {
                  key: 0,
                  name: "i-heroicons-arrow-path",
                  class: "animate-spin w-5 h-5 text-gray-400"
                })) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  !unref(isAuthenticated) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode(_component_UButton, {
                      to: "/login",
                      variant: "ghost",
                      color: "gray"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Masuk")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UButton, {
                      to: "/register",
                      color: "primary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Daftar")
                      ]),
                      _: 1
                    })
                  ], 64)) : (openBlock(), createBlock(_component_UDropdown, {
                    key: 1,
                    items: items.value,
                    popper: { placement: "bottom-end" }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UButton, {
                        color: "white",
                        "trailing-icon": "i-heroicons-chevron-down-20-solid"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-user-circle",
                            class: "w-5 h-5 mr-1 text-primary-500"
                          }),
                          createVNode("span", { class: "truncate max-w-[100px]" }, toDisplayString(unref(user)?.name?.split(" ")[0] || "User"), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["items"]))
                ], 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header><main class="flex-grow">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-white border-t border-gray-100 py-8 mt-auto">`);
      _push(ssrRenderComponent(_component_UContainer, { class: "text-center text-sm text-gray-500" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` © `);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              fallback: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`2025`);
                } else {
                  return [
                    createTextVNode("2025")
                  ];
                }
              })
            }, _parent2, _scopeId));
            _push2(` PO Nusantara Bus. All rights reserved. `);
          } else {
            return [
              createTextVNode(" © "),
              createVNode(_component_ClientOnly, null, {
                fallback: withCtx(() => [
                  createTextVNode("2025")
                ]),
                default: withCtx(() => [
                  createTextVNode(toDisplayString((/* @__PURE__ */ new Date()).getFullYear()), 1)
                ]),
                _: 1
              }),
              createTextVNode(" PO Nusantara Bus. All rights reserved. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-DSQnSUAw.mjs.map
