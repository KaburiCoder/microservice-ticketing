"use client";
import React, { useState } from "react";
import useRequest from "@/hooks/use-request";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errorComponent } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => push("/"),
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await doRequest();
  }

  return (
    <form className="p-4 max-w-44 flex flex-col gap-2" onSubmit={handleSubmit}>
      <h1 className="text-lg font-bold">Sign Up</h1>
      <div className="flex flex-col">
        <label htmlFor="">Email Address</label>
        <input
          className="border"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="">Password</label>
        <input
          className="border"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errorComponent}

      <button className="border bg-slate-100 rounded">Sign up</button>
    </form>
  );
}
