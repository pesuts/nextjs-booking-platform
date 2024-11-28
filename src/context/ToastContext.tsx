"use client";

// import toastConfig from "@/lib/toastConfig";
import { Toast } from "primereact/toast";
import { createContext, useContext, useRef } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Tema PrimeReact
import "primereact/resources/primereact.min.css"; // Gaya dasar PrimeReact

const ToastContext = createContext<any>(undefined);

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const toast = useRef<Toast>(null);

  const showToast = (
    severity:
      | "success"
      | "info"
      | "warn"
      | "error"
      | "secondary"
      | "contrast"
      | undefined = "success",
    summary: string = "Success!",
    detail?: string,
    style: object = {
      backgroundColor: "#2c3e50",
      color: "white",
      borderRadius: "10px",
      fontSize: "14px",
    }
  ) => {
    if (toast.current) {
      toast.current.show({
        severity,
        summary,
        detail,
        life: 4000,
        style,
      });
    }
  };

  return (
    <ToastContext.Provider value={showToast}>
      <Toast ref={toast} position="top-center" />
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
