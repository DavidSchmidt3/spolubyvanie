import AdministrativeDivisionFilter from "@/app/[locale]/_components/home/filter/administrative-division-filter";
import { AdvertisementTypeFilter } from "@/app/[locale]/_components/home/filter/advertisement-type-filter";
import AgeFilter from "@/app/[locale]/_components/home/filter/age-filter";
import OtherDetailsFilter from "@/app/[locale]/_components/home/filter/other-details-filter";
import PriceFilter from "@/app/[locale]/_components/home/filter/price-filter";
import PropertiesFilter from "@/app/[locale]/_components/home/filter/properties-filter";
import SortByField from "@/app/[locale]/_components/home/filter/sort";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { TABS, useFilterDialog } from "@/context/filter-dialog";
import { useAdvertisementType } from "@/hooks/advertisement-type";
import { useResetFormAfterClearingAdvertisementType } from "@/hooks/reset-filter-form";
import {
  type District,
  type Municipality,
  type Region,
} from "@/lib/data/administrative-divisions";
import { type Property } from "@/lib/data/advertisements-properties";
import {
  ADVERTISEMENT_FILTER_DEFAULT_VALUES,
  type AdvertisementFilterFormValues,
} from "@/lib/data/advertisements/schema";
import { type User } from "@/lib/data/user";
import { isEqual } from "lodash";
import { useTranslations } from "next-intl";
import { useWatch, type UseFormReturn } from "react-hook-form";

type FilterTabProps = {
  form: UseFormReturn<AdvertisementFilterFormValues>;
  isFetching: boolean;
  regions: Region[];
  districts: District[];
  municipalities: Municipality[];
  properties: Property[];
  user: User;
};

export default function FilterTab({
  form,
  isFetching,
  regions,
  districts,
  municipalities,
  properties,
  user,
}: FilterTabProps) {
  const { setActiveTab, setConfigTabState } = useFilterDialog();
  const t = useTranslations("translations.advertisement_list");

  const values = useWatch({
    control: form.control,
  });

  const isFilterActive = Object.keys(values).some(
    (key) =>
      !isEqual(
        form.getValues()[
          key as keyof typeof ADVERTISEMENT_FILTER_DEFAULT_VALUES
        ],
        ADVERTISEMENT_FILTER_DEFAULT_VALUES[
          key as keyof typeof ADVERTISEMENT_FILTER_DEFAULT_VALUES
        ]
      )
  );

  const advertisementType = useWatch({
    control: form.control,
    name: "advertisement_type",
  });
  const isOffering = useAdvertisementType(advertisementType);
  const isTypeSelected = isOffering !== null;

  useResetFormAfterClearingAdvertisementType(form, advertisementType);

  const handleResetFilter = () => {
    form.reset(ADVERTISEMENT_FILTER_DEFAULT_VALUES);
  };

  const handleSaveFilter = () => {
    setActiveTab(TABS.CONFIG);
    setConfigTabState("add");
  };

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-8 px-1">
      <div className="col-span-2">
        <AdvertisementTypeFilter />
      </div>
      {isTypeSelected ? (
        <>
          <AdministrativeDivisionFilter
            regions={regions}
            districts={districts}
            municipalities={municipalities}
          />
          <div className="order-1 sm:order-2 flex flex-col gap-y-2 gap-x-4 sm:gap-x-8">
            <PriceFilter control={form.control} />
          </div>
          <div className="flex flex-col gap-y-4 order-3 sm:col-span-2">
            <AgeFilter control={form.control} isOffering={isOffering} />
          </div>
          {isOffering && (
            <>
              <div className="flex flex-col gap-y-4 order-4 sm:col-span-2">
                <OtherDetailsFilter />
              </div>
              <div className="flex flex-col gap-y-4 order-5 sm:col-span-2">
                <PropertiesFilter
                  properties={properties}
                  fieldName="properties"
                />
              </div>
            </>
          )}
        </>
      ) : null}
      <div className="flex flex-col gap-y-4 order-6 col-span-2">
        <SortByField />
      </div>
      <div className="flex flex-col gap-y-4 order-7 my-2 col-span-2">
        <Button
          type="submit"
          variant="ringHover"
          aria-label={t("filter.button")}
          className="text-base mt-5 sm:mt-0 flex gap-x-1 group"
          disabled={isFetching}
        >
          {isFetching && <Icons.spinner className="w-4 h-4 animate-spin" />}
          <Icons.magnifier className="w-6 h-6 group-hover:motion-preset-seesaw" />
          {t("filter.button")}
        </Button>
        <Button
          type="button"
          variant="destructive"
          className="text-base h-auto flex gap-x-1 group"
          disabled={!isFilterActive || isFetching}
          onClick={handleResetFilter}
        >
          <Icons.cross className="w-6 h-6 group-hover:motion-preset-seesaw" />
          {t("filter.reset.button")}
        </Button>
        {user && (
          <Button
            type="button"
            variant="outline"
            className="text-base h-auto flex gap-x-1 group"
            onClick={handleSaveFilter}
            disabled={!isFilterActive || isFetching}
          >
            <Icons.save className="w-6 h-6 group-hover:motion-preset-seesaw" />
            {t("filter.save.button")}
          </Button>
        )}
      </div>
    </div>
  );
}
