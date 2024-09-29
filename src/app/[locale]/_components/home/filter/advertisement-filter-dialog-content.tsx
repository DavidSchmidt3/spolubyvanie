import AdministrativeDivisionFilter from "@/app/[locale]/_components/home/filter/administrative-division-filter";
import { AdvertisementTypeFilter } from "@/app/[locale]/_components/home/filter/advertisement-type-filter";
import PriceFilter from "@/app/[locale]/_components/home/filter/price-filter";
import PropertiesFilter from "@/app/[locale]/_components/home/filter/properties-filter";
import SortByField from "@/app/[locale]/_components/home/filter/sort";
import { Button } from "@/app/[locale]/_components/ui/button";
import {
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/app/[locale]/_components/ui/credenza";
import { Form } from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useAdvertisementType } from "@/hooks/advertisement-type";
import {
  type getDistricts,
  type getMunicipalities,
  type getRegions,
} from "@/lib/data/administrative-divisions";
import { type Property } from "@/lib/data/advertisements-properties";
import {
  ADVERTISEMENT_FILTER_DEFAULT_VALUES,
  type AdvertisementFilterFormValues,
} from "@/lib/data/advertisements/schema";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { useWatch, type UseFormReturn } from "react-hook-form";

type Props = {
  regions: Awaited<ReturnType<typeof getRegions>>;
  districts: Awaited<ReturnType<typeof getDistricts>>;
  municipalities: Awaited<ReturnType<typeof getMunicipalities>>;
  form: UseFormReturn<AdvertisementFilterFormValues>;
  properties: Property[];
  onSubmit: (data: AdvertisementFilterFormValues) => void;
  isFetching: boolean;
};

export default function AdvertisementFilterDialogContent({
  regions,
  districts,
  municipalities,
  form,
  onSubmit,
  isFetching,
  properties,
}: Props) {
  const values = useWatch({
    control: form.control,
  });
  const isFilterActive = Object.keys(values).some(
    (key) =>
      !_.isEqual(
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

  const t = useTranslations("translations.advertisement_list");
  return (
    <CredenzaContent className="max-w-3xl pb-8 bottom-0 h-auto md:overflow-y-auto md:h-min md:max-h-[calc(100dvh-2rem)]">
      <CredenzaHeader>
        <CredenzaTitle className="text-2xl">{t("filter.title")}</CredenzaTitle>
      </CredenzaHeader>
      <CredenzaBody className="overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-8 px-1">
              <AdministrativeDivisionFilter
                regions={regions}
                districts={districts}
                municipalities={municipalities}
                form={form}
              />
              <div className="order-1 sm:order-2 flex flex-col gap-y-2 gap-x-4 sm:gap-x-8">
                <PriceFilter control={form.control} />
                <AdvertisementTypeFilter form={form} />
              </div>
              {isOffering && (
                <div className="flex flex-col gap-y-4 order-3 sm:col-span-2">
                  <PropertiesFilter
                    form={form}
                    properties={properties}
                    fieldName="properties"
                  />
                </div>
              )}
              <div className="flex flex-col gap-y-4 order-4 sm:col-span-2">
                <SortByField form={form} />
              </div>
              <div className="flex flex-col gap-y-4 order-5 my-2 sm:col-span-2">
                <Button
                  type="submit"
                  variant="ringHover"
                  aria-label={t("filter.button")}
                  className="text-base mt-5 sm:mt-0 flex gap-x-1"
                  disabled={isFetching}
                >
                  {isFetching && (
                    <Icons.spinner className="w-4 h-4 animate-spin" />
                  )}
                  <Icons.magnifier className="w-6 h-6" />
                  {t("filter.button")}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  className="text-base h-auto flex gap-x-1"
                  disabled={!isFilterActive || isFetching}
                  onClick={() =>
                    form.reset(ADVERTISEMENT_FILTER_DEFAULT_VALUES)
                  }
                >
                  <Icons.cross className="w-6 h-6" />
                  {t("filter.reset.button")}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CredenzaBody>
    </CredenzaContent>
  );
}
