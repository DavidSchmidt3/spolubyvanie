"use client";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useActionToast } from "@/hooks/action-toast";
import { logout } from "@/lib/data/actions/login";
import { type Locale } from "@/lib/utils/localization/i18n";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { type ReactNode } from "react";

type Props = {
  locale: Locale;
  children?: (buttonProps: {
    disabled: boolean;
    onClick: () => void;
    isExecuting: boolean;
  }) => ReactNode;
};

export default function Logout({ locale, children }: Props) {
  const t = useTranslations("translations");
  const { execute, isExecuting, hasErrored, hasSucceeded, result } =
    useAction(logout);

  useActionToast({
    hasErrored,
    hasSucceeded,
    result,
    errorTitle: "alerts.logout.error.title",
    successTitle: "alerts.logout.success.title",
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    void execute({ locale });
  }
  function handleClick() {
    void execute({ locale });
  }

  if (children) {
    return (
      <form className="w-full" onSubmit={handleSubmit}>
        {children({
          disabled: isExecuting,
          onClick: handleClick,
          isExecuting,
        })}
      </form>
    );
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <Button
        aria-label={t("logout.button")}
        variant="ghost"
        disabled={isExecuting}
        className="justify-start w-full h-6 p-0 text-base text-left cursor-pointer hover:bg-accent/90 group"
        type="submit"
      >
        <div className="flex items-center gap-x-2">
          <Icons.door className="group-hover:motion-preset-seesaw" />
          {t("logout.button")}
        </div>
      </Button>
    </form>
  );
}
