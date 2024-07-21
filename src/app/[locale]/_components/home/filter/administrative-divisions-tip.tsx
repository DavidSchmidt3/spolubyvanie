import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useTranslations } from "next-intl";

export default function AdministrativeDivisionsTip() {
  const t = useTranslations("translations.advertisement");
  return (
    <div className="flex gap-2 items-center">
      <div className="w-5 h-5">
        <Icons.info className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground text-sm">
        {t("administrative_divisions.tip.title")}
      </p>
    </div>
  );
}
