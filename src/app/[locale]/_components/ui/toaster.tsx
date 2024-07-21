"use client";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/app/[locale]/_components/ui/toast";
import {
  type ToastDescriptionType,
  useToast,
} from "@/app/[locale]/_components/ui/use-toast";
import { useTranslations } from "next-intl";

export function Toaster() {
  const { toasts } = useToast();
  const t = useTranslations();

  function getToastMessage(description: ToastDescriptionType) {
    if (typeof description === "string") {
      return t(description);
    }
    if (Array.isArray(description)) {
      return description
        .flat()
        .map((line, index) => (
          <p key={index}>
            {typeof line === "string" ? t(line) : t(line.message, line.param)}
          </p>
        ));
    }
    if (typeof description === "object") {
      return t(description.message, description.param);
    }
    console.error("Invalid description type", description);
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle>
                  {typeof title === "string"
                    ? t(title)
                    : t(title.message, title.param)}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>
                  {getToastMessage(description)}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
