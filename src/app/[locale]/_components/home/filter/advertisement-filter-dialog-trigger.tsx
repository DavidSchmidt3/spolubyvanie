"use client";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Card, CardContent } from "@/app/[locale]/_components/ui/card";
import {
  Credenza,
  CredenzaTrigger,
} from "@/app/[locale]/_components/ui/credenza";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useControlledForm } from "@/hooks/form";
import {
  type getDistricts,
  type getMunicipalities,
  type getRegions,
} from "@/lib/data/administrative-divisions";
import {
  ADVERTISEMENT_FILTER_DEFAULT_VALUES,
  ADVERTISEMENTS_FILTER_SCHEMA,
  type AdvertisementFilterFormValues,
  type SortByOptions,
  type SortOrder,
} from "@/lib/data/advertisements/schema";
import {
  createQueryParamsFromObject,
  createQueryStringFromObject,
  getCurrentQueryString,
  usePathname,
  useRouter,
} from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
const AdvertisementFilterDialogContent = dynamic(
  () => import("./advertisement-filter-dialog-content"),
  { ssr: false }
);

type Props = {
  regions: Awaited<ReturnType<typeof getRegions>>;
  districts: Awaited<ReturnType<typeof getDistricts>>;
  municipalities: Awaited<ReturnType<typeof getMunicipalities>>;
};

export default function AdvertisementFilterDialog({
  regions,
  districts,
  municipalities,
}: Props) {
  "use no memo";
  const [initialized, setInitialized] = useState(false);
  const [open, setOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("translations.advertisement_list");

  const defaultValues = useMemo<AdvertisementFilterFormValues>(() => {
    return {
      municipality:
        searchParams.get("municipality")?.split(",") ??
        ADVERTISEMENT_FILTER_DEFAULT_VALUES.municipality,
      district:
        searchParams.get("district")?.split(",") ??
        ADVERTISEMENT_FILTER_DEFAULT_VALUES.district,
      region:
        searchParams.get("region") ??
        ADVERTISEMENT_FILTER_DEFAULT_VALUES.region,
      price_min:
        searchParams.get("price_min") ??
        ADVERTISEMENT_FILTER_DEFAULT_VALUES.price_min,
      price_max:
        searchParams.get("price_max") ??
        ADVERTISEMENT_FILTER_DEFAULT_VALUES.price_max,
      advertisement_type:
        searchParams.get("advertisement_type") ??
        ADVERTISEMENT_FILTER_DEFAULT_VALUES.advertisement_type,
      sort_by:
        (searchParams.get("sort_by") as SortByOptions) ??
        ADVERTISEMENT_FILTER_DEFAULT_VALUES.sort_by,
      sort_order:
        (searchParams.get("sort_order") as SortOrder) ??
        ADVERTISEMENT_FILTER_DEFAULT_VALUES.sort_order,
    };
  }, [searchParams]);

  const form = useControlledForm<AdvertisementFilterFormValues>({
    schema: ADVERTISEMENTS_FILTER_SCHEMA,
    defaultValues,
  });

  async function onSubmit(data: AdvertisementFilterFormValues) {
    const currentQueryString = getCurrentQueryString(searchParams);
    const newQueryString = createQueryStringFromObject(data);
    if (currentQueryString === newQueryString) {
      setOpen(false);
      return;
    }
    setIsFetching(true);
    const queryParams = createQueryParamsFromObject(data);
    router.push({
      pathname: "/[page]",
      params: { page: "1" },
      query: queryParams,
    });
  }

  useEffect(() => {
    setOpen(false);
    setIsFetching(false);
  }, [pathname]);

  function onOpenChange(open: boolean) {
    setOpen(open);
    if (open && !initialized) {
      setInitialized(true);
    }
  }

  return (
    <Card className="rounded-none">
      <CardContent className="flex flex-col items-center justify-between px-5 py-5 sm:px-10 sm:flex-row gap-y-4 gap-x-6">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-xl font-bold sm:text-3xl">{t("title")}</h1>
          <h2 className="text-base text-left sm:text-lg">{t("description")}</h2>
        </div>
        <div className="flex flex-col gap-4">
          <Credenza onOpenChange={onOpenChange} open={open}>
            <CredenzaTrigger asChild className="px-4 py-2 sm:py-2">
              <Button
                className="flex w-48 gap-2 text-base text-wrap h-14 bg-foreground text-background hover:bg-accent-foreground hover:text-background"
                variant="outline"
              >
                <Icons.filter className="w-8 h-8" />
                {t("filter.title")}
              </Button>
            </CredenzaTrigger>
            {initialized && (
              <AdvertisementFilterDialogContent
                regions={regions}
                districts={districts}
                municipalities={municipalities}
                form={form}
                onSubmit={onSubmit}
                isFetching={isFetching}
              />
            )}
          </Credenza>
        </div>
      </CardContent>
    </Card>
  );
}
