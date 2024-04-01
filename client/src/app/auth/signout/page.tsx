"use client";
import useRequest from "@/hooks/use-request";
import { apiUrl } from "@/paths";
import React, { useEffect } from "react";

export default function LogoutPage() {
  const { doRequest } = useRequest({
    url: apiUrl.users.signout,
    method: "post",
    body: {},
    onSuccess: () => (window.location.href = "/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>로그아웃 중...</div>;
}
