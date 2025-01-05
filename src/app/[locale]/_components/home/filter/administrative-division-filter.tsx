import AdministrativeDivisionsTip from "@/app/[locale]/_components/home/filter/administrative-divisions-tip";
import PopoverFilterField from "@/app/[locale]/_components/home/filter/popover-filter-field";
import PopoverMultiselectFilterField from "@/app/[locale]/_components/home/filter/popover-multiselect-filter-field";
import { useAdministrativeDivision } from "@/hooks/administrative-division";
import {
  type District,
  type Municipality,
  type Region,
} from "@/lib/data/administrative-divisions";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

type Props = {
  regions: Region[];
  districts: District[];
  municipalities: Municipality[];
};

export type FilterData = {
  id: string;
  name: string;
  region_id?: string;
  district_id?: string;
};

export default function AdministrativeDivisionFilter({
  regions,
  districts,
  municipalities,
}: Props) {
  "use no memo";
  const form = useFormContext<AdvertisementFilterFormValues>();
  const t = useTranslations("translations.advertisement");
  const { filterMunicipality, filterDistrict, filterRegion } =
    useAdministrativeDivision({
      form,
      municipalities,
      districts,
      regions,
    });

  return (
    <div className="flex flex-col gap-y-2 gap-x-4 sm:gap-x-8 order-2 sm:order-1">
      <PopoverFilterField
        filterData={regions}
        filterFunction={filterRegion}
        placeholderText={t("region.search_placeholder")}
        selectRowText={t("region.select_text")}
        emptyText={t("region.empty_text")}
        title={t("region.title")}
        fieldName="region"
      />
      <PopoverMultiselectFilterField
        filterData={districts}
        filterFunction={filterDistrict}
        placeholderText={t("district.search_placeholder")}
        selectRowText={t("district.select_text")}
        emptyText={t("district.empty_text")}
        title={t("district.title")}
        fieldName="district"
      />
      <PopoverMultiselectFilterField
        filterData={municipalities}
        filterFunction={filterMunicipality}
        placeholderText={t("municipality.search_placeholder")}
        selectRowText={t("municipality.select_text")}
        emptyText={t("municipality.empty_text")}
        title={t("municipality.title")}
        fieldName="municipality"
      />
      <AdministrativeDivisionsTip />
    </div>
  );
}
