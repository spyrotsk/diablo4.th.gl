"use client";

export default function Drawer({
  children,
  show,
}: {
  children: React.ReactNode;
  show: boolean;
}) {
  return (
    <aside
      className={`fixed top-0 z-[500] w-[401px] max-w-full h-full transition-all duration-500  bg-neutral-900 shadow-lg ${
        show ? "left-0" : "left-[-401px]"
      }`}
    >
      {children}
    </aside>
  );
}
