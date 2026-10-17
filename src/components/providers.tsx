
"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/context/cartContext";

export default function Providers({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
