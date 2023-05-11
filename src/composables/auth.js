import { onMounted, reactive } from "vue";
import axios from "axios";

export function useAuth() {
  const userData = reactive({
    id: "",
    name: "",
    email: "",
  });

  async function getUser() {
    if ($cookies.get("auth_token")) {
      await axios
        .get("/api/user", {
          headers: {
            Authorization: `Bearer ${$cookies.get("auth_token")}`,
          },
        })
        .then((response) => {
          userData.id = response.data.id;
          userData.name = response.data.name;
          userData.email = response.data.email;
        }).catch(error => {
            if (error.response.status === 401) {
              $cookies.remove("auth_token");
              location.reload();
            }
          })
    }
  }

  onMounted(async () => {
    await getUser();
  });
  return { userData };
}
