import Container from "@/app/[locale]/_components/common/container";
import AdvertisementListNoResults from "@/app/[locale]/_components/home/advertisement-list-no-results";
import AdvertisementPreview from "@/app/[locale]/_components/home/advertisement-preview";
import MyAdvertisementsHeader from "@/app/[locale]/_components/my-advertisements/header";
import { getMyAdvertisements } from "@/lib/data/my-advertisements";
import { getUser } from "@/lib/data/user";
import { getTranslations } from "next-intl/server";

export default async function MyAdvertisementsList() {
  const t = await getTranslations("translations");
  const user = await getUser();
  const myAdvertisements = await getMyAdvertisements(user!.id);

  return (
    <Container className="text-center">
      <MyAdvertisementsHeader />
      <div className="flex flex-col justify-center w-full items-center gap-y-4 px-4 sm:px-16 py-4 sm:py-8">
        {myAdvertisements?.length ? (
          myAdvertisements.map((advertisement) => (
            <AdvertisementPreview
              myAdvertisement
              key={advertisement.id}
              advertisement={advertisement}
            />
          ))
        ) : (
          <AdvertisementListNoResults
            title={t("my_advertisements.no_results.title")}
          />
        )}
      </div>
    </Container>
  );
}
