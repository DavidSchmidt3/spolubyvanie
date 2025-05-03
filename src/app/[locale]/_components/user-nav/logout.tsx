"use client";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useActionToast } from "@/hooks/action-toast";
import { logout } from "@/lib/data/actions/login";
import { type Locale } from "@/lib/utils/localization/i18n";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";

type Props = {
  locale: Locale;
};

export default function Logout({ locale }: Props) {
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

  const handleLogout = async () => {
    execute({ locale });
  };

  return (
    <form className="w-full" action={handleLogout}>
      <Button
        aria-label={t("logout.button")}
        variant="ghost"
        disabled={isExecuting}
        className="justify-start w-full h-6 p-0 text-base text-left cursor-pointer hover:bg-accent/90 group"
        type="submit"
      >
        <div className="flex items-center gap-x-2">
          {isExecuting && (
            <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
          )}
          <Icons.door className="group-hover:motion-preset-seesaw" />
          {t("logout.button")}
        </div>
      </Button>
    </form>
  );
}
