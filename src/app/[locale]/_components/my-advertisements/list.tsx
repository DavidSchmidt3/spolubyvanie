import Container from "@/app/[locale]/_components/common/container";
import AdvertisementListNoResults from "@/app/[locale]/_components/home/advertisement-list-no-results";
import MyAdvertisementsHeader from "@/app/[locale]/_components/my-advertisements/header";
import { getMyAdvertisements } from "@/lib/data/my-advertisements";
import { getUser } from "@/lib/data/user";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
const VirtualizedAdvertisementsList = dynamic(
  () => import("@/app/[locale]/_components/my-advertisements/virtualized-list"),
  { ssr: false }
);

export default async function MyAdvertisementsList() {
  const t = await getTranslations("translations");
  const user = await getUser();
  const myAdvertisements = await getMyAdvertisements(user!.id);

  return (
    <Container className="text-center">
      <MyAdvertisementsHeader />
      <div className="flex flex-col justify-center w-full items-center gap-y-4 px-4 sm:px-8 py-4 sm:py-8">
        {myAdvertisements?.length ? (
          <VirtualizedAdvertisementsList myAdvertisements={myAdvertisements} />
        ) : (
          <AdvertisementListNoResults
            title={t("my_advertisements.no_results.title")}
          />
        )}
      </div>
    </Container>
  );
}
