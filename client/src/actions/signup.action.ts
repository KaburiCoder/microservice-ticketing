import { svrAxios } from "@/api/svr-axios";
// import { svrAxios } from "@/api/svr-axios";
import { apiUrl } from "@/paths";
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface SignupResult {
  errors?: any[];
}

export async function signupAction(_: SignupResult, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("call");

  // svrAxios
  try {
    const response = await axios.post(apiUrl.users.signup, {
      email,
      password,
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorResult = { errors: err.response?.data?.errors };

      return errorResult;
    }
  }
}
