"use client";
import { useEffect } from "react";

export default function BackendWakeUp() {
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!url) return;

    fetch(`${url}/categories`).catch(() => {
      // Backend is waking up from Render's idle state — safe to ignore
    });
  }, []);

  return null;
}
