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
  ADVERTISEMENTS_FILTER_SCHEMA,
  type AdvertisementFilterFormValues,
} from "@/lib/data/advertisements/schema";
import { type pathnames } from "@/lib/utils/localization/i18n";
import { usePathname, useRouter } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultValues = useMemo<AdvertisementFilterFormValues>(() => {
    return {
      municipality: searchParams.get("municipality") ?? "",
      district: searchParams.get("district") ?? "",
      region: searchParams.get("region") ?? "",
      price_min: searchParams.get("price_min") ?? "",
      price_max: searchParams.get("price_max") ?? "",
      advertisement_type: searchParams.get("advertisement_type") ?? "",
    };
  }, [searchParams]);

  const form = useControlledForm<AdvertisementFilterFormValues>({
    schema: ADVERTISEMENTS_FILTER_SCHEMA,
    defaultValues,
  });

  const t = useTranslations("translations");

  function createQueryString(data: AdvertisementFilterFormValues) {
    const queryString = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      if (data[key as keyof typeof data]) {
        queryString.append(key, data[key as keyof typeof data] ?? "");
      }
    });
    return queryString.toString();
  }

  async function onSubmit(data: AdvertisementFilterFormValues) {
    const newPathnameWithQuery = `${pathname}?${createQueryString(
      data
    )}` as (typeof pathnames)["/"];
    router.push(newPathnameWithQuery);
    setOpen(false);
  }

  return (
    <Card className="rounded-none">
      <CardContent className="flex flex-col items-center justify-between px-5 py-5 sm:px-10 sm:flex-row gap-y-4 gap-x-6">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-xl font-bold sm:text-3xl">
            {t("advertisement.title")}
          </h1>
          <h2 className="text-justify text-base sm:text-lg">
            {t("advertisement.description")}
          </h2>
        </div>
        <Credenza open={open} onOpenChange={setOpen}>
          <CredenzaTrigger asChild className="px-4 py-2 sm:py-2">
            <Button
              className="flex w-48 gap-2 text-base text-wrap h-14 bg-foreground text-background hover:bg-accent-foreground hover:text-background"
              variant="outline"
            >
              <Icons.filter className="w-8 h-8" />
              {t("advertisement.filter.title")}
            </Button>
          </CredenzaTrigger>
          {open && (
            <AdvertisementFilterDialogContent
              regions={regions}
              districts={districts}
              municipalities={municipalities}
              form={form}
              onSubmit={onSubmit}
            />
          )}
        </Credenza>
      </CardContent>
    </Card>
  );
}
