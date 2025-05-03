import AdvertisementFilterDialogTrigger from "@/app/[locale]/_components/home/filter/advertisement-filter-dialog-trigger";
import {
  getDistricts,
  getMunicipalities,
  getRegions,
} from "@/lib/data/administrative-divisions";
import { getAdvertisementProperties } from "@/lib/data/advertisements-properties";
import { getUser, getUserFilters } from "@/lib/data/user";

export default async function AdvertisementFilterDataFetcher() {
  const [regions, districts, municipalities, properties, userFilters, user] =
    await Promise.all([
      getRegions(),
      getDistricts(),
      getMunicipalities(),
      getAdvertisementProperties(),
      getUserFilters(),
      getUser(),
    ]);

  return (
    <AdvertisementFilterDialogTrigger
      regions={regions}
      districts={districts}
      municipalities={municipalities}
      properties={properties}
      userFilters={userFilters}
      user={user}
    />
  );
}
