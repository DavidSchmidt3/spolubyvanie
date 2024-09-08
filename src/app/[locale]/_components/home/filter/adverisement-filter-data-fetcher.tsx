import {
  getDistricts,
  getMunicipalities,
  getRegions,
} from "@/lib/data/administrative-divisions";
import { getAdvertisementProperties } from "@/lib/data/advertisements-properties";
import AdvertisementFilterDialogTrigger from "./advertisement-filter-dialog-trigger";

export default async function AdvertisementFilterDataFetcher() {
  const [regions, districts, municipalities, properties] = await Promise.all([
    getRegions(),
    getDistricts(),
    getMunicipalities(),
    getAdvertisementProperties(),
  ]);

  return (
    <AdvertisementFilterDialogTrigger
      regions={regions}
      districts={districts}
      municipalities={municipalities}
      properties={properties}
    />
  );
}
