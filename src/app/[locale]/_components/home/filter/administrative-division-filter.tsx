import PopoverFilterField from "@/app/[locale]/_components/home/filter/popover-filter-field";
import usePrevious from "@/hooks/previous-value";
import { type AdvertisementFilterFormValues } from "@/lib/data/actions/advertisements/schema";
import {
  type District,
  type Municipality,
  type Region,
} from "@/lib/data/administrative-divisions";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { type UseFormReturn } from "react-hook-form";
import PopoverMultiselectFilterField from "./popover-multiselect-filter-field";

type Props = {
  regions: Region[];
  districts: District[];
  municipalities: Municipality[];
  form: UseFormReturn<AdvertisementFilterFormValues>;
};

export type FilterData = {
  id: string;
  name: string;
  region_id: string;
  district_id?: string;
};

export default function AdministrativeDivisionFilter({
  regions,
  districts,
  municipalities,
  form,
}: Props) {
  "use no memo";
  const t = useTranslations("translations.advertisement");
  const selectedRegion = form.watch("region");
  const selectedDistricts = form.watch("districts");
  const selectedMunicipalities = form.watch("municipalities");
  const prevRegion = usePrevious(selectedRegion);
  const prevDistricts = usePrevious(selectedDistricts);
  const prevMunicipalities = usePrevious(selectedMunicipalities);

  function filterMunicipality(municipality: FilterData) {
    if (selectedMunicipalities?.includes(municipality.id)) {
      return false;
    }

    if (!selectedRegion && !selectedDistricts?.length) {
      return true;
    }

    if (selectedRegion && !selectedDistricts?.length) {
      return municipality.region_id === selectedRegion;
    }

    if (!selectedRegion && selectedDistricts?.length) {
      return selectedDistricts?.includes(municipality.district_id!) ?? false;
    }

    return (
      (selectedDistricts?.includes(municipality.district_id!) &&
        municipality.region_id === selectedRegion) ??
      false
    );
  }

  function filterDistrict(district: FilterData) {
    if (selectedDistricts?.includes(district.id)) {
      return false;
    }

    if (!selectedRegion) {
      return true;
    }
    return district.region_id === selectedRegion;
  }

  function filterRegion(_: Region) {
    return true;
  }

  function getSelectedMunicipalitiesObjects() {
    return municipalities.filter((municipality) => {
      if (!selectedMunicipalities?.length) {
        return false;
      }
      return selectedMunicipalities?.includes(municipality.id);
    });
  }

  function getSelectedMunicipalitiesDistrictsId() {
    const selectedMunicipalitiesObjects = getSelectedMunicipalitiesObjects();

    return (
      districts
        .filter((district) =>
          selectedMunicipalitiesObjects.some(
            (municipality) => municipality.district_id === district.id
          )
        )
        .map((district) => district.id) ?? []
    );
  }

  function getSelectedDistrictRegionId() {
    const selectedDistrictObject = districts.find(
      (district) => district.id === selectedDistricts?.[0]
    );
    return (
      regions.find((region) => region.id === selectedDistrictObject?.region_id)
        ?.id ?? ""
    );
  }

  // If we change the region and the district id is not the same as the selected region's district id, we need to set the district to undefined
  // So we also need to set the municipality to undefined, because it will be in the wrong district
  function afterRegionChange() {
    if (getSelectedDistrictRegionId() !== selectedRegion) {
      form.setValue("municipalities", []);
      form.setValue("districts", []);
      return;
    }

    if (!_.isEqual(getSelectedMunicipalitiesDistrictsId(), selectedDistricts)) {
      form.setValue("municipalities", []);
    }
  }

  // If we change the district and there is no region selected, we need to set the region to the selected district's region
  // Also if the selected municipality district is not the same as the selected district, we need to handle and filter out municipalities which don't belong to any of the selected districts
  function afterDistrictChange() {
    const selectedMunicipalitiesDistrictsId =
      getSelectedMunicipalitiesDistrictsId();

    const selectedMunicipalitiesObjects = getSelectedMunicipalitiesObjects();
    if (!_.isEqual(selectedMunicipalitiesDistrictsId, selectedDistricts)) {
      const newMunicipalities = selectedMunicipalitiesObjects
        .filter((municipality) =>
          selectedDistricts?.includes(municipality.district_id)
        )
        .map((municipality) => municipality.id);
      form.setValue("municipalities", newMunicipalities);
    }
    if (!selectedRegion) {
      form.setValue("region", getSelectedDistrictRegionId());
    }
  }

  // If we change the municipality and there is no district selected, we need to set the district to the selected municipality's district
  function afterMunicipalityChange() {
    if (!selectedDistricts?.length) {
      form.setValue("districts", getSelectedMunicipalitiesDistrictsId());
    }
  }

  useEffect(() => {
    if (prevRegion !== selectedRegion) {
      afterRegionChange();
    }

    if (!_.isEqual(prevDistricts, selectedDistricts)) {
      afterDistrictChange();
    }

    if (!_.isEqual(prevMunicipalities, selectedMunicipalities)) {
      afterMunicipalityChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRegion, selectedDistricts, selectedMunicipalities]);

  return (
    <div className="flex flex-col gap-y-2 gap-x-4 sm:gap-x-8 order-2 sm:order-1">
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
      <PopoverMultiselectFilterField
        filterData={districts}
        filterFunction={filterDistrict}
        placeholderText={t("district.search_placeholder")}
        selectRowText={t("district.select_text")}
        emptyText={t("district.empty_text")}
        title={t("district.title")}
        form={form}
        fieldName="districts"
      />
      <PopoverMultiselectFilterField
        filterData={municipalities}
        filterFunction={filterMunicipality}
        placeholderText={t("municipality.search_placeholder")}
        selectRowText={t("municipality.select_text")}
        emptyText={t("municipality.empty_text")}
        title={t("municipality.title")}
        form={form}
        fieldName="municipalities"
      />
    </div>
  );
}
