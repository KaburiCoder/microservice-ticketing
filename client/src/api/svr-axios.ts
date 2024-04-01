import axios from "axios";
import { headers } from "next/headers";

export function svrAxios() {
  const headersList = headers();
  const copyHeaders: { [key: string]: string } = {};
  const headersArray = Array.from(headersList.entries());
  for (const [key, value] of headersArray) {
    copyHeaders[key] = value;
  }

  return axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    headers: copyHeaders,
  });
}
