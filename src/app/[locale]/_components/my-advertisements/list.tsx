import Container from "@/app/[locale]/_components/common/container";
import Advertisement from "@/app/[locale]/_components/home/advertisement";
import AdvertisementListNoResults from "@/app/[locale]/_components/home/advertisement-list-no-results";
import { getMyAdvertisements } from "@/lib/data/my-advertisements";
import { getUser } from "@/lib/data/user";
import { getTranslations } from "next-intl/server";

export default async function MyAdvertisementsList() {
  const t = await getTranslations("translations.my_advertisements");
  const user = await getUser();
  const myAdvertisements = await getMyAdvertisements(user!.id);

  return (
    <Container className="text-center">
      <h1 className="text-xl font-bold sm:text-3xl">{t("title")}</h1>
      <div className="mt-5">
        {myAdvertisements?.length ? (
          myAdvertisements.map((advertisement) => (
            <Advertisement
              myAdvertisement
              key={advertisement.id}
              advertisement={advertisement}
            />
          ))
        ) : (
          <AdvertisementListNoResults title={t("no_results.title")} />
        )}
      </div>
    </Container>
  );
}
