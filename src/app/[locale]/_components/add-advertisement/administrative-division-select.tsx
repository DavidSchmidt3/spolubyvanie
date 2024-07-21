import AdministrativeDivisionsTip from "@/app/[locale]/_components/home/filter/administrative-divisions-tip";
import PopoverFilterField from "@/app/[locale]/_components/home/filter/popover-filter-field";
import { useAdministrativeDivision } from "@/hooks/administrative-division";
import { type AdvertisementAddFormValues } from "@/lib/data/actions/add-advertisement/schema";
import {
  type District,
  type Municipality,
  type Region,
} from "@/lib/data/administrative-divisions";
import { useTranslations } from "next-intl";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  regions: Region[];
  districts: District[];
  municipalities: Municipality[];
  form: UseFormReturn<AdvertisementAddFormValues>;
};

export default function AdministrativeDivisionSelect({
  regions,
  districts,
  municipalities,
  form,
}: Props) {
  const t = useTranslations("translations.advertisement");
  const { filterMunicipality, filterDistrict, filterRegion } =
    useAdministrativeDivision({
      form,
      municipalities,
      districts,
      regions,
    });

  return (
    <div className="flex flex-col gap-y-2 gap-x-4 sm:gap-x-8">
      <PopoverFilterField
        filterData={regions}
        filterFunction={filterRegion}
        placeholderText={t("region.search_placeholder")}
        selectRowText={t("region.select_text")}
        emptyText={t("region.empty_text")}
        title={t("region.title")}
        fieldName="region"
        form={form}
      />
      <PopoverFilterField
        filterData={districts}
        filterFunction={filterDistrict}
        placeholderText={t("district.search_placeholder")}
        selectRowText={t("district.select_text")}
        emptyText={t("district.empty_text")}
        title={t("district.title")}
        form={form}
        fieldName="district"
      />
      <PopoverFilterField
        filterData={municipalities}
        filterFunction={filterMunicipality}
        placeholderText={t("municipality.search_placeholder")}
        selectRowText={t("municipality.select_text")}
        emptyText={t("municipality.empty_text")}
        title={t("municipality.title")}
        form={form}
        fieldName="municipality"
      />
      <AdministrativeDivisionsTip />
    </div>
  );
}
