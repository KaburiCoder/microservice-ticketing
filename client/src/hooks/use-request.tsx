"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import ErrorDiv from "@/components/error-div";

interface Props {
  url: string;
  method: "post" | "get" | "put" | "delete";
  body: { [key: string]: any };
  onSuccess?: (data: any) => void;
}
export default function useRequest({ url, method, body, onSuccess }: Props) {
  const [errors, setErrors] = useState<any[]>([]);
  const [errorComponent, setErrorComponent] = useState<React.ReactNode>();
  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);

      onSuccess?.(response.data);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrors(err.response?.data?.errors);
        setErrorComponent(<ErrorDiv errors={err.response?.data?.errors} />);
      }
    }
  };

  return { doRequest, errors, errorComponent };
}
