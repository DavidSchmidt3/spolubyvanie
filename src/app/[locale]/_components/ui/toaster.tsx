"use client";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/app/[locale]/_components/ui/toast";
import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import { useTranslations } from "next-intl";

export function Toaster() {
  const { toasts } = useToast();
  const t = useTranslations();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{t(title)}</ToastTitle>}
              {description && (
                <ToastDescription>
                  {typeof description === "string"
                    ? t(description)
                    : description
                        ?.flat()
                        .map((line, index) => <p key={index}>{t(line)}</p>)}
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
