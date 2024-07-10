import {
  getDistricts,
  getMunicipalities,
  getRegions,
} from "@/lib/data/administrative-divisions";
import AdvertisementFilterDialogTrigger from "./advertisement-filter-dialog-trigger";

export default async function AdvertisementFilterDataFetcher() {
  const [regions, districts, municipalities] = await Promise.all([
    getRegions(),
    getDistricts(),
    getMunicipalities(),
  ]);

  return (
    <AdvertisementFilterDialogTrigger
      regions={regions}
      districts={districts}
      municipalities={municipalities}
    />
  );
}
