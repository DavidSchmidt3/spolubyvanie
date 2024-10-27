"use client";
import { type MessageKeys } from "global";
import { useTranslations, type TranslationValues } from "next-intl";
import { toast as renderToast } from "sonner";
const TOAST_REMOVE_DELAY = 6000;

type ToastOptions = NonNullable<Parameters<typeof renderToast.success>[1]>;

export type MessageObject = {
  message: MessageKeys<IntlMessages>;
  param: TranslationValues;
};

export type ToastDescriptionType =
  | MessageKeys<IntlMessages>
  | MessageObject
  | MessageKeys<IntlMessages>[]
  | MessageObject[]
  | MessageKeys<IntlMessages>[][]
  | MessageObject[][];

type ToastTypes = "success" | "error" | "warning" | "info";

type ToastProps = {
  title: MessageKeys<IntlMessages> | MessageObject;
  description?: ToastDescriptionType;
  variant: ToastTypes;
};

export const useToast = () => {
  const t = useTranslations();

  const toast = ({ title, description, variant }: ToastProps) => {
    const finalTitle =
      typeof title === "string" ? t(title) : t(title.message, title.param);
    const finalDescription = getToastMessage(description);

    const options: ToastOptions = {
      description: finalDescription,
      duration: TOAST_REMOVE_DELAY,
      closeButton: true,
    };

    const toastMethods = {
      success: renderToast.success,
      error: renderToast.error,
      warning: renderToast.warning,
      info: renderToast.info,
    };

    const toastMethod = toastMethods[variant];
    if (toastMethod) {
      toastMethod(finalTitle, options);
    } else {
      console.error(`Unsupported toast variant: ${variant}`);
    }
  };

  function getToastMessage(description?: ToastDescriptionType) {
    if (!description) {
      return "";
    }
    if (typeof description === "string") {
      return t(description);
    }
    if (Array.isArray(description)) {
      return description
        .flat()
        .map((line) =>
          typeof line === "string" ? t(line) : t(line.message, line.param)
        )
        .join("\n");
    }
    if (typeof description === "object") {
      return t(description.message, description.param);
    }
  }

  return {
    toast,
  };
};
