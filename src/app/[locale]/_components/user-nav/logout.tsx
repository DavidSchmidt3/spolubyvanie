"use client";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import { logout } from "@/lib/data/actions/login";
import { type Locale } from "@/lib/utils/localization/i18n";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";

type Props = {
  locale: Locale;
};

export default function Logout({ locale }: Props) {
  const t = useTranslations("translations");
  const { execute, isExecuting, hasErrored, hasSucceeded } = useAction(logout);
  const { toast } = useToast();

  const handleLogout = async () => {
    execute({ locale });
  };

  useEffect(() => {
    if (hasErrored) {
      toast({
        title: "alerts.logout.error.title",
        variant: "error",
      });
    }

    if (hasSucceeded) {
      toast({
        title: "alerts.logout.success.title",
        variant: "success",
      });
    }
  }, [hasErrored, hasSucceeded, toast]);

  return (
    <form className="w-full" action={handleLogout}>
      <Button
        aria-label={t("logout.button")}
        variant="ghost"
        disabled={isExecuting}
        className="justify-start w-full h-6 p-0 text-base text-left cursor-pointer hover:bg-accent/90"
        type="submit"
      >
        <div className="flex items-center gap-x-2">
          {isExecuting && (
            <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
          )}
          <Icons.door />
          {t("logout.button")}
        </div>
      </Button>
    </form>
  );
}
