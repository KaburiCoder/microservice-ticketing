"use client";
import useRequest from "@/hooks/use-request";
import { apiUrl } from "@/paths";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function LogoutPage() {
  const { push, refresh } = useRouter();
  const { doRequest } = useRequest({
    url: apiUrl.users.signout,
    method: "post",
    body: {},
    onSuccess: () => {
      push("/");
      refresh();
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>로그아웃 중...</div>;
}
