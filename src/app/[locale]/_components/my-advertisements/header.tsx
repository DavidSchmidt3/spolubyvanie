import TransitionLink from "@/app/[locale]/_components/navigation/transition-link";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("translations");

  return (
    <div className="flex flex-col gap-y-2 sm:gap-y-4 items-center">
      <h1 className="text-3xl font-bold">{t("my_advertisements.title")}</h1>
      <TransitionLink className="w-full sm:w-72" href="/add-advertisement">
        <Button>
          <Icons.plus className="w-5 h-5 mr-2" />
          {t("add_advertisement.title")}
        </Button>
      </TransitionLink>
    </div>
  );
}
