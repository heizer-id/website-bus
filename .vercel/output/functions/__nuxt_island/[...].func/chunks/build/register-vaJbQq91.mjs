import { _ as _sfc_main$1 } from './Card-DZR1gGaG.mjs';
import { _ as _sfc_main$2 } from './Input-YgTwjt5M.mjs';
import { _ as _sfc_main$3, a as _sfc_main$1$1 } from './Button-Cpjpb6pe.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { u as useAuth } from './useAuth-BVJ85bH0.mjs';
import { u as useToast } from './useToast-kaLd0qVn.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const router = useRouter();
    const handleRegister = async () => {
      loading.value = true;
      try {
        await $fetch("/api/auth/register", {
          method: "POST",
          body: { name: name.value, email: email.value, password: password.value }
        });
        const { fetchUser } = useAuth();
        await fetchUser();
        const toast = useToast();
        toast.add({ title: "Berhasil", description: "Akun Anda berhasil dibuat!", color: "green" });
        router.push("/");
      } catch (err) {
        const toast = useToast();
        toast.add({ title: "Gagal Mendaftar", description: err.data?.statusMessage || err.message, color: "red" });
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$1;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      const _component_ULink = _sfc_main$1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-md mx-auto mt-10" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UCard, { class: "shadow-xl" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center mb-6"${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>Daftar Akun Baru</h1><p class="text-gray-500 text-sm"${_scopeId}>Bergabunglah untuk menikmati layanan tiket bus kami.</p></div><form class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Nama Lengkap" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: name.value,
                    "onUpdate:modelValue": ($event) => name.value = $event,
                    icon: "i-heroicons-user",
                    placeholder: "Sesuai KTP",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: name.value,
                      "onUpdate:modelValue": ($event) => name.value = $event,
                      icon: "i-heroicons-user",
                      placeholder: "Sesuai KTP",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Email" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: email.value,
                    "onUpdate:modelValue": ($event) => email.value = $event,
                    type: "email",
                    icon: "i-heroicons-envelope",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: email.value,
                      "onUpdate:modelValue": ($event) => email.value = $event,
                      type: "email",
                      icon: "i-heroicons-envelope",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Kata Sandi" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: password.value,
                    "onUpdate:modelValue": ($event) => password.value = $event,
                    type: "password",
                    icon: "i-heroicons-lock-closed",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: password.value,
                      "onUpdate:modelValue": ($event) => password.value = $event,
                      type: "password",
                      icon: "i-heroicons-lock-closed",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              type: "submit",
              block: "",
              color: "primary",
              size: "xl",
              class: "font-bold mt-6",
              loading: loading.value
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
            _push2(`</form><div class="mt-6 text-center text-sm"${_scopeId}><p class="text-gray-600"${_scopeId}>Sudah punya akun? `);
            _push2(ssrRenderComponent(_component_ULink, {
              to: "/login",
              class: "text-primary-600 font-bold hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Masuk di sini`);
                } else {
                  return [
                    createTextVNode("Masuk di sini")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center mb-6" }, [
                createVNode("h1", { class: "text-2xl font-bold" }, "Daftar Akun Baru"),
                createVNode("p", { class: "text-gray-500 text-sm" }, "Bergabunglah untuk menikmati layanan tiket bus kami.")
              ]),
              createVNode("form", {
                onSubmit: withModifiers(handleRegister, ["prevent"]),
                class: "space-y-4"
              }, [
                createVNode(_component_UFormGroup, { label: "Nama Lengkap" }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: name.value,
                      "onUpdate:modelValue": ($event) => name.value = $event,
                      icon: "i-heroicons-user",
                      placeholder: "Sesuai KTP",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, { label: "Email" }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: email.value,
                      "onUpdate:modelValue": ($event) => email.value = $event,
                      type: "email",
                      icon: "i-heroicons-envelope",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, { label: "Kata Sandi" }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: password.value,
                      "onUpdate:modelValue": ($event) => password.value = $event,
                      type: "password",
                      icon: "i-heroicons-lock-closed",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UButton, {
                  type: "submit",
                  block: "",
                  color: "primary",
                  size: "xl",
                  class: "font-bold mt-6",
                  loading: loading.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("Daftar")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ], 32),
              createVNode("div", { class: "mt-6 text-center text-sm" }, [
                createVNode("p", { class: "text-gray-600" }, [
                  createTextVNode("Sudah punya akun? "),
                  createVNode(_component_ULink, {
                    to: "/login",
                    class: "text-primary-600 font-bold hover:underline"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Masuk di sini")
                    ]),
                    _: 1
                  })
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-vaJbQq91.mjs.map
