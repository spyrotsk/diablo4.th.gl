"use client";
import { useParams } from "next/navigation";

export default function Drawer({ children }: { children: React.ReactNode }) {
  const params = useParams();

  const showDrawer = Boolean(params.name);
  return (
    <section
      className={`fixed top-0 left-0 z-[500] w-64 h-full transition-all duration-500 transform bg-dark shadow-lg -translate-x-full ${
        showDrawer ? "translate-x-0" : ""
      }`}
    >
      {children}
    </section>
  );
}
