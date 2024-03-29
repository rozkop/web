import { onMounted, reactive } from "vue";
import axios from "axios";

export function useAuth() {
  const userData = reactive({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  async function getUser() {
    if ($cookies.get("auth_token")) {
      await axios
        .get("/api/user")
        .then((response) => {
          userData.id = response.data.data.id;
          userData.name = response.data.data.name;
          userData.email = response.data.data.email;
          if (response.data.data.roles.includes("admin")) {
            userData.role = "admin";
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            $cookies.remove("auth_token");
            location.reload();
          }
        });
    }
  }

  onMounted(async () => {
    await getUser();
  });
  return { userData, getUser };
}
