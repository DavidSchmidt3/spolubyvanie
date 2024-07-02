import PopoverFilterField from "@/app/[locale]/_components/home/popover-filter-field";
import usePrevious from "@/hooks/previous-value";
import {
  type District,
  type Municipality,
  type Region,
} from "@/lib/utils/data/administrative-divisions";
import { type AdvertisementFilterFormValues } from "@/lib/utils/data/advertisements/schema";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  regions: Region[];
  districts: District[];
  municipalities: Municipality[];
  form: UseFormReturn<AdvertisementFilterFormValues>;
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
  form,
}: Props) {
  const t = useTranslations("translations.advertisement");
  const selectedRegion = form.watch("region");
  const selectedDistrict = form.watch("district");
  const selectedMunicipality = form.watch("municipality");
  const prevRegion = usePrevious(selectedRegion);
  const prevDistrict = usePrevious(selectedDistrict);
  const prevMunicipality = usePrevious(selectedMunicipality);

  function filterMunicipality(municipality: FilterData) {
    if (!selectedRegion && !selectedDistrict) {
      return true;
    }

    if (selectedRegion && !selectedDistrict) {
      return municipality.region_id === selectedRegion;
    }

    if (!selectedRegion && selectedDistrict) {
      return municipality.district_id === selectedDistrict;
    }

    return (
      municipality.district_id === selectedDistrict &&
      municipality.region_id === selectedRegion
    );
  }

  function filterDistrict(district: FilterData) {
    if (!selectedRegion) {
      return true;
    }
    return district.region_id === selectedRegion;
  }

  function filterRegion(_: FilterData) {
    return true;
  }

  function getSelectedMunicipalityDistrictId() {
    const selectedMunicipalityObject = municipalities.find(
      (municipality) => municipality.id === selectedMunicipality
    );
    return districts.find(
      (district) => district.id === selectedMunicipalityObject?.district_id
    )?.id;
  }

  function getSelectedDistrictRegionId() {
    const selectedDistrictObject = districts.find(
      (district) => district.id === selectedDistrict
    );
    return regions.find(
      (region) => region.id === selectedDistrictObject?.region_id
    )?.id;
  }

  // If we change the region and the district id is not the same as the selected region's district id, we need to set the district to undefined
  // So we also need to set the municipality to undefined, because it will be in the wrong district
  function afterRegionChange() {
    if (getSelectedDistrictRegionId() !== selectedRegion) {
      form.setValue("municipality", undefined);
      form.setValue("district", undefined);
      return;
    }

    if (getSelectedMunicipalityDistrictId() !== selectedDistrict) {
      form.setValue("municipality", undefined);
    }
  }

  // If we change the district and there is no region selected, we need to set the region to the selected district's region
  // Also if the selected municipality district is not the same as the selected district, we need to set the municipality to undefined
  function afterDistrictChange() {
    if (getSelectedMunicipalityDistrictId() !== selectedDistrict) {
      form.setValue("municipality", undefined);
    }
    if (!selectedRegion) {
      form.setValue("region", getSelectedDistrictRegionId());
    }
  }

  // If we change the municipality and there is no district selected, we need to set the district to the selected municipality's district
  function afterMunicipalityChange() {
    if (!selectedDistrict) {
      form.setValue("district", getSelectedMunicipalityDistrictId());
    }
  }

  useEffect(() => {
    if (prevRegion !== selectedRegion) {
      afterRegionChange();
    }

    if (prevDistrict !== selectedDistrict) {
      afterDistrictChange();
    }

    if (prevMunicipality !== selectedMunicipality) {
      afterMunicipalityChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRegion, selectedDistrict, selectedMunicipality]);

  return (
    <div className="flex flex-col gap-y-2 gap-x-4 sm:gap-x-8">
      <PopoverFilterField
        filterData={regions}
        filterFunction={filterRegion}
        placeholderText={t("region.search_placeholder")}
        selectRowText={t("region.select_text")}
        emptyText={t("region.empty_text")}
        title={t("region.title")}
        control={form.control}
        fieldName="region"
        setValue={form.setValue}
      />
      <PopoverFilterField
        filterData={districts}
        filterFunction={filterDistrict}
        placeholderText={t("district.search_placeholder")}
        selectRowText={t("district.select_text")}
        emptyText={t("district.empty_text")}
        title={t("district.title")}
        control={form.control}
        fieldName="district"
        setValue={form.setValue}
      />
      <PopoverFilterField
        filterData={municipalities}
        filterFunction={filterMunicipality}
        placeholderText={t("municipality.search_placeholder")}
        selectRowText={t("municipality.select_text")}
        emptyText={t("municipality.empty_text")}
        title={t("municipality.title")}
        control={form.control}
        fieldName="municipality"
        setValue={form.setValue}
      />
    </div>
  );
}
