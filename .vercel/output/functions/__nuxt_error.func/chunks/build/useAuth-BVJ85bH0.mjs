import { b as useState, e as useRouter } from './server.mjs';
import { computed } from 'vue';
import { a as useRequestHeaders } from './ssr-C1pPD3yl.mjs';

const useAuth = () => {
  const user = useState("user", () => null);
  const fetchingAuth = useState("fetchingAuth", () => false);
  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === "admin");
  const fetchUser = async () => {
    if (fetchingAuth.value) return;
    fetchingAuth.value = true;
    try {
      const headers = useRequestHeaders(["cookie"]);
      const res = await $fetch("/api/auth/me", { headers });
      user.value = res.user;
    } catch (e) {
      user.value = null;
    } finally {
      fetchingAuth.value = false;
    }
  };
  const logout = async () => {
    try {
      await $fetch("/api/auth/logout", { method: "POST" });
      user.value = null;
      useRouter().push("/login");
    } catch (e) {
    }
  };
  return {
    user,
    isAuthenticated,
    isAdmin,
    fetchUser,
    logout
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-BVJ85bH0.mjs.map
