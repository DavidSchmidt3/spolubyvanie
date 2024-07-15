import { type FilterData } from "@/app/[locale]/_components/home/filter/administrative-division-filter";
import usePrevious from "@/hooks/previous-value";
import { type AdvertisementAddFormValues } from "@/lib/data/actions/add-advertisement/schema";
import {
  type District,
  type Municipality,
  type Region,
} from "@/lib/data/administrative-divisions";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import _ from "lodash";
import { useEffect } from "react";
import {
  useWatch,
  type Control,
  type UseFormReturn,
  type UseFormSetValue,
} from "react-hook-form";

type HookParams = {
  form:
    | UseFormReturn<AdvertisementAddFormValues>
    | UseFormReturn<AdvertisementFilterFormValues>;
  regions: Region[];
  districts: District[];
  municipalities: Municipality[];
};

export const useAdministrativeDivision = ({
  form,
  municipalities,
  districts,
  regions,
}: HookParams) => {
  const control = form.control as Control<
    AdvertisementAddFormValues | AdvertisementFilterFormValues
  >;
  const setValue = form.setValue as UseFormSetValue<
    AdvertisementAddFormValues | AdvertisementFilterFormValues
  >;

  const selectedRegion = useWatch({
    control,
    name: "region",
  });
  const selectedDistrict = useWatch({
    control,
    name: "district",
  });
  const selectedMunicipality = useWatch({
    control,
    name: "municipality",
  });

  const prevRegion = usePrevious(selectedRegion);
  const prevDistrict = usePrevious(selectedDistrict);
  const prevMunicipality = usePrevious(selectedMunicipality);

  function filterMunicipality(municipality: FilterData) {
    // if we have a multiselect, don't show already selected municipalities
    if (
      typeof selectedMunicipality !== "string" &&
      selectedMunicipality?.includes(municipality.id)
    ) {
      return false;
    }

    // If there is no region or district selected, show all municipalities
    if (!selectedRegion && !selectedDistrict?.length) {
      return true;
    }

    // If there is a region selected but no district, show only municipalities from the selected region
    if (selectedRegion && !selectedDistrict?.length) {
      return municipality.region_id === selectedRegion;
    }

    // If there is a district selected but no region, show only municipalities from the selected district
    if (!selectedRegion && selectedDistrict?.length) {
      return selectedDistrict?.includes(municipality.district_id!) ?? false;
    }

    // If we have both a region and a district selected, show only municipalities from the selected region and district
    return (
      (selectedDistrict?.includes(municipality.district_id!) &&
        municipality.region_id === selectedRegion) ??
      false
    );
  }

  function filterDistrict(district: FilterData) {
    // if we have a multiselect, don't show already selected districts
    if (
      typeof selectedDistrict !== "string" &&
      selectedDistrict?.includes(district.id)
    ) {
      return false;
    }

    // If there is no region selected, show all districts
    if (!selectedRegion) {
      return true;
    }

    // If there is a region selected, show only districts from the selected region
    return district.region_id === selectedRegion;
  }

  // We don't need to filter regions, because we always show all regions
  function filterRegion(_: Region) {
    return true;
  }

  // Because we have to use string or array of strings as selected values in form, sometimes we need to get full objects from the selected values
  function getSelectedMunicipalitiesObjects() {
    return municipalities.filter((municipality) => {
      if (!selectedMunicipality?.length) {
        return false;
      }
      return selectedMunicipality?.includes(municipality.id);
    });
  }

  function getSelectedMunicipalitiesDistrictsId() {
    const selectedMunicipalitiesObjects = getSelectedMunicipalitiesObjects();

    // Create a Set of district IDs from the selected municipalities for fast lookup
    const municipalityDistrictIds = new Set(
      selectedMunicipalitiesObjects.map(
        (municipality) => municipality.district_id
      )
    );

    // Filter districts using the Set for O(1) lookups
    const districtsIds = districts
      .filter((district) => municipalityDistrictIds.has(district.id))
      .map((district) => district.id);

    if (typeof selectedDistrict === "string") {
      return districtsIds[0] ?? "";
    }
    return districtsIds;
  }

  function getSelectedDistrictRegionId() {
    const selectedDistrictObject = districts.find(
      (district) =>
        district.id ===
        (typeof selectedDistrict === "string"
          ? selectedDistrict
          : selectedDistrict?.[0]) // it is enough to compare to the first district, if there is any selected, all will be from the same region
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
      setValue(
        "municipality",
        typeof selectedMunicipality === "string" ? "" : []
      );
      setValue("district", typeof selectedDistrict === "string" ? "" : []);
      return;
    }

    const selectedMunicipalitiesDistrictsId =
      getSelectedMunicipalitiesDistrictsId();

    if (!_.isEqual(selectedMunicipalitiesDistrictsId, selectedDistrict)) {
      setValue(
        "municipality",
        typeof selectedMunicipality === "string" ? "" : []
      );
    }
  }

  // If we change the district and there is no region selected, we need to set the region to the selected district's region
  // Also if the selected municipality district is not the same as the selected district, we need to handle and filter out municipalities which don't belong to any of the selected districts
  function afterDistrictChange() {
    const selectedMunicipalitiesDistrictsId =
      getSelectedMunicipalitiesDistrictsId();

    const selectedMunicipalitiesObjects = getSelectedMunicipalitiesObjects();

    if (!_.isEqual(selectedMunicipalitiesDistrictsId, selectedDistrict)) {
      const selectedDistrictsSet = new Set(selectedDistrict);
      const newMunicipalities = selectedMunicipalitiesObjects
        .filter((municipality) =>
          selectedDistrictsSet.has(municipality.district_id)
        )
        .map((municipality) => municipality.id);

      setValue(
        "municipality",
        typeof selectedMunicipality === "string"
          ? newMunicipalities[0] ?? ""
          : newMunicipalities
      );
    }
    if (!selectedRegion) {
      setValue("region", getSelectedDistrictRegionId());
    }
  }

  // If we change the municipality and there is no district selected, we need to set the district to the selected municipality's district
  function afterMunicipalityChange() {
    if (!selectedDistrict?.length) {
      const selectedMunicipalitiesDistrictsId =
        getSelectedMunicipalitiesDistrictsId();
      setValue("district", selectedMunicipalitiesDistrictsId);
    }
  }

  useEffect(() => {
    if (prevRegion !== selectedRegion) {
      afterRegionChange();
    }

    if (!_.isEqual(prevDistrict, selectedDistrict)) {
      afterDistrictChange();
    }

    if (!_.isEqual(prevMunicipality, selectedMunicipality)) {
      afterMunicipalityChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRegion, selectedDistrict, selectedMunicipality]);

  return {
    filterRegion,
    filterDistrict,
    filterMunicipality,
  };
};
