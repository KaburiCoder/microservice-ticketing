import { apiUrl } from "@/paths";
import axios from "axios";
import { headers } from "next/headers";
import Image from "next/image";

// export async function generateStaticParams({}) {

// }

export default async function Home() {
  const headersList = headers();

  const copyHeaders: { [key: string]: string } = {};
  const headersArray = Array.from(headersList.entries());
  for (const [key, value] of headersArray) {
    copyHeaders[key] = value;
  }
  console.log("s=-", copyHeaders);

  const response = await axios.get(
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local" +
    apiUrl.currentUser,
    {
      headers: copyHeaders,
    }
  );
  console.log("result:", await response.data);

  return <div>{1}</div>;
}
