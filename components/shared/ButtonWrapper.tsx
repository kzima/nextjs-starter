import { ReactElement } from "react";

export default function ButtonWrapper({
  children,
  type,
}: {
  children: ReactElement;
  type: "icon" | "button";
}) {
  if (type === "icon") {
    return (
      <div className="text-blue-gray-400 hover:text-gray-700">{children}</div>
    );
  }
  return (
    <div className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
      {children}
    </div>
  );
}
