import { Input } from "@/app/[locale]/_components/ui/input";
import { useTranslations } from "next-intl";

export default function PriceFilter() {
  const t = useTranslations("translations.advertisement");
  return (
    <div className="flex flex-col gap-y-2 gap-x-4 sm:gap-x-8">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm">{t("price.min_label")}</h4>
        <Input
          placeholder={t("price.min_label")}
          type="number"
          min="0"
          className="w-full h-11 hover:bg-accent"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm">{t("price.max_label")}</h4>
        <Input
          placeholder={t("price.max_label")}
          type="number"
          min="0"
          className="w-full h-11 hover:bg-accent"
        />
      </div>
    </div>
  );
}
