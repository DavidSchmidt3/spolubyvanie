import Container from "@/app/[locale]/_components/common/container";
import AdvertisementListNoResults from "@/app/[locale]/_components/home/advertisement/list-no-results";
import AdvertisementPreview from "@/app/[locale]/_components/home/advertisement/preview";
import MyAdvertisementsHeader from "@/app/[locale]/_components/my-advertisements/header";
import MyAdvertisementPagination from "@/app/[locale]/_components/my-advertisements/pagination";
import { getMyAdvertisements } from "@/lib/data/my-advertisements";
import { type Locale } from "@/lib/utils/localization/i18n";
import { getTranslations } from "next-intl/server";

type Props = {
  page: string;
  locale: Locale;
};

export default async function MyAdvertisementsList({ page, locale }: Props) {
  const t = await getTranslations("translations");
  const { myAdvertisements, paginationData } = await getMyAdvertisements(page);

  return (
    <Container className="text-center" fullWidth>
      <MyAdvertisementsHeader />
      <div className="flex flex-col justify-center w-full items-center gap-y-4 px-4 sm:px-16 py-4 sm:py-8">
        {myAdvertisements?.length ? (
          myAdvertisements.map((myAdvertisement) => (
            <AdvertisementPreview
              key={myAdvertisement.id}
              myAdvertisement
              advertisement={myAdvertisement}
              locale={locale}
            />
          ))
        ) : (
          <AdvertisementListNoResults
            title={t("my_advertisements.no_results.title")}
          />
        )}
        {paginationData && (
          <MyAdvertisementPagination
            page={page}
            paginationData={paginationData}
          />
        )}
      </div>
      <div className="flex flex-col justify-center w-full items-center gap-y-4 px-4 sm:px-8 py-4 sm:py-8"></div>
    </Container>
  );
}
