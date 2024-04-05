import { svrAxios } from "@/api/svr-axios";
import { apiUrl } from "@/paths";

export const dynamic = "force-dynamic";

export default async function Home(props: any) {
  console.log("props", props);

  const { data } = await svrAxios().get(apiUrl.users.currentUser);
  return data.currentUser ? (
    <div>
      <h1>로그인되어있음</h1>
      {JSON.stringify(data.currentUser)}
    </div>
  ) : (
    <div>
      <h1>로그인 안됨</h1>
      {JSON.stringify(data.currentUser)}
    </div>
  );
}
