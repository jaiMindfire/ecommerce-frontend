"use client";
import { useState } from "react";
import axiosClient from "@services/axiosClient";

const useAxiosMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (url: string, method: string, payload?: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient({
        method,
        url,
        data: payload,
      });
      return response.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};

export default useAxiosMutation;
