import { Input } from "@/app/[locale]/_components/ui/input";
import { useTranslations } from "next-intl";

export default function PriceFilter() {
  const t = useTranslations("translations.advertisement");
  return (
    <div className="flex flex-col mt-2 w-full sm:col-span-2">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <Input
          placeholder={t("price.min_label")}
          type="number"
          min="0"
          className="w-full h-11"
        />
        <Input
          placeholder={t("price.max_label")}
          type="number"
          min="0"
          className="w-full h-11"
        />
      </div>
    </div>
  );
}
