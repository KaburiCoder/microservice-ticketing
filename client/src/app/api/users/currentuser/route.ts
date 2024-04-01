import { apiUrl } from "@/paths";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {

  const response = await axios.get(
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local" +
    apiUrl.currentUser,
    {
      headers: {
        Host: "ticketing.dev",
      },
    }
  );

  console.log("result:", await response.data);
  return await response.data;
};
