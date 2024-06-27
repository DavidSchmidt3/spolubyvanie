"use client";
import usePrevious from "@/hooks/previous-value";
import {
  type District,
  type Municipality,
  type Region,
} from "@/lib/utils/data/administrative-divisions";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import PopoverFilterField from "./popover-filter-field";

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
  const t = useTranslations("translations.advertisement");
  const [selectedRegion, setSelectedRegion] = useState<FilterData>();
  const prevRegion = usePrevious(selectedRegion);
  const [selectedDistrict, setSelectedDistrict] = useState<FilterData>();
  const prevDistrict = usePrevious(selectedDistrict);
  const [selectedMunicipality, setSelectedMunicipality] =
    useState<FilterData>();
  const prevMunicipality = usePrevious(selectedMunicipality);

  function filterMunicipality(municipality: FilterData) {
    if (!selectedRegion && !selectedDistrict) {
      return true;
    }

    if (selectedRegion && !selectedDistrict) {
      return municipality.region_id === selectedRegion.id;
    }

    if (!selectedRegion && selectedDistrict) {
      return municipality.district_id === selectedDistrict.id;
    }

    return (
      municipality.district_id === selectedDistrict?.id &&
      municipality.region_id === selectedRegion?.id
    );
  }

  function filterDistrict(district: FilterData) {
    if (!selectedRegion) {
      return true;
    }
    return district.region_id === selectedRegion.id;
  }

  function filterRegion(_: FilterData) {
    return true;
  }

  // If we change the region and the district id is not the same as the selected region's district id, we need to set the district to undefined
  // So we also need to set the municipality to undefined, because it will be in the wrong district
  function afterRegionChange() {
    if (selectedDistrict?.region_id !== selectedRegion?.id) {
      setSelectedDistrict(undefined);
      setSelectedMunicipality(undefined);
      return;
    }

    if (selectedMunicipality?.district_id !== selectedDistrict?.id) {
      setSelectedMunicipality(undefined);
    }
  }

  // If we change the district and there is no region selected, we need to set the region to the selected district's region
  // Also if the selected municipality district is not the same as the selected district, we need to set the municipality to undefined
  function afterDistrictChange() {
    if (selectedMunicipality?.district_id !== selectedDistrict?.id) {
      setSelectedMunicipality(undefined);
    }
    if (!selectedRegion) {
      const region = regions.find(
        (region) => region.id === selectedDistrict?.region_id
      );
      setSelectedRegion(region);
    }
  }

  // If we change the municipality and there is no district selected, we need to set the district to the selected municipality's district
  function afterMunicipalityChange() {
    if (!selectedDistrict) {
      const district = districts.find(
        (district) => district.id === selectedMunicipality?.district_id
      );
      setSelectedDistrict(district);
    }
  }

  useEffect(() => {
    if (prevRegion?.id !== selectedRegion?.id) {
      afterRegionChange();
    }

    if (prevDistrict?.id !== selectedDistrict?.id) {
      afterDistrictChange();
    }

    if (prevMunicipality?.id !== selectedMunicipality?.id) {
      afterMunicipalityChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRegion, selectedDistrict, selectedMunicipality]);

  function handleRegionChange(regionId?: string) {
    const region = regions.find((region) => region.id === regionId);
    setSelectedRegion(region);
  }

  function handleDistrictChange(districtId?: string) {
    const district = districts.find((district) => district.id === districtId);
    setSelectedDistrict(district);
  }

  function handleMunicipalityChange(municipalityId?: string) {
    const municipality = municipalities.find(
      (municipality) => municipality.id === municipalityId
    );
    setSelectedMunicipality(municipality);
  }

  return (
    <div className="flex flex-col gap-y-2 gap-x-4 sm:gap-x-8">
      <PopoverFilterField
        filterData={regions}
        selectedRow={selectedRegion?.id}
        setSelectedRow={handleRegionChange}
        filterFunction={filterRegion}
        placeholderText={t("region.search_placeholder")}
        selectRowText={t("region.select_text")}
        emptyText={t("region.empty_text")}
        title={t("region.title")}
      />
      <PopoverFilterField
        filterData={districts}
        selectedRow={selectedDistrict?.id}
        setSelectedRow={handleDistrictChange}
        filterFunction={filterDistrict}
        placeholderText={t("district.search_placeholder")}
        selectRowText={t("district.select_text")}
        emptyText={t("district.empty_text")}
        title={t("district.title")}
      />
      <PopoverFilterField
        filterData={municipalities}
        selectedRow={selectedMunicipality?.id}
        setSelectedRow={handleMunicipalityChange}
        filterFunction={filterMunicipality}
        placeholderText={t("municipality.search_placeholder")}
        selectRowText={t("municipality.select_text")}
        emptyText={t("municipality.empty_text")}
        title={t("municipality.title")}
      />
    </div>
  );
}
