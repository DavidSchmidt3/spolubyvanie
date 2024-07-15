import { useTranslations } from "next-intl";

export default function AdvertisementListNoResults() {
  const t = useTranslations("translations.advertisement_list");
  return (
    <div className="flex flex-col justify-center w-full items-center gap-y-4 px-4 sm:px-16 py-4 sm:py-8">
      <h3 className="text-3xl font-bold text-center">
        {t("no_results.title")}
      </h3>
    </div>
  );
}
