import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useTranslations } from "next-intl";

export default function Loader() {
  const t = useTranslations("common");
  return (
    <div className="flex items-center gap-2 justify-center mt-6">
      <Icons.spinner className="h-8 w-8 animate-spin p" />
      <h3 className="text-xl">{t("home")}</h3>
    </div>
  );
}
