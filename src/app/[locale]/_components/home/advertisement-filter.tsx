"use client";
import AdministrativeDivisionFilter from "@/app/[locale]/_components/home/administrative-division-filter";
import { AdvertisementTypeFilter } from "@/app/[locale]/_components/home/advertisement-type-filter";
import PriceFilter from "@/app/[locale]/_components/home/price-filter";
import SubmitButton from "@/app/[locale]/_components/home/submit-button";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Card, CardContent } from "@/app/[locale]/_components/ui/card";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/app/[locale]/_components/ui/credenza";
import { Form } from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useControlledForm } from "@/hooks/form";
import {
  type getDistricts,
  type getMunicipalities,
  type getRegions,
} from "@/lib/utils/data/administrative-divisions";
import {
  ADVERTISEMENTS_FILTER_SCHEMA,
  type AdvertisementFilterFormValues,
} from "@/lib/utils/data/advertisements/schema";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

type Props = {
  regions: Awaited<ReturnType<typeof getRegions>>;
  districts: Awaited<ReturnType<typeof getDistricts>>;
  municipalities: Awaited<ReturnType<typeof getMunicipalities>>;
};

export default function AdvertisementFilter({
  regions,
  districts,
  municipalities,
}: Props) {
  "use no memo";
  const defaultValues = useMemo<AdvertisementFilterFormValues>(() => {
    return {
      municipality: null,
      district: null,
      region: null,
      price_min: "",
      price_max: "",
      advertisement_type: "",
    };
  }, []);

  const form = useControlledForm<AdvertisementFilterFormValues>({
    schema: ADVERTISEMENTS_FILTER_SCHEMA,
    defaultValues,
  });

  const t = useTranslations("translations");

  function onSubmit(data: AdvertisementFilterFormValues) {
    console.log(data);
  }

  return (
    <Card className="rounded-none">
      <CardContent className="flex flex-col items-center justify-between px-5 py-5 sm:px-10 sm:flex-row gap-y-4 gap-x-6">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-xl font-bold sm:text-3xl">
            {t("advertisement.title")}
          </h1>
          <h2 className="text-justify text-md sm:text-lg">
            {t("advertisement.description")}
          </h2>
        </div>
        <Credenza>
          <CredenzaTrigger asChild className="px-4 py-2 sm:py-2">
            <Button
              className="flex w-48 gap-2 text-md text-wrap h-14 bg-foreground text-background hover:bg-accent-foreground hover:text-background"
              variant="outline"
            >
              <Icons.filter className="w-8 h-8" />
              {t("advertisement.filter.title")}
            </Button>
          </CredenzaTrigger>
          <CredenzaContent className="max-w-3xl pb-8">
            <CredenzaHeader>
              <CredenzaTitle>{t("advertisement.filter.title")}</CredenzaTitle>
            </CredenzaHeader>
            <CredenzaBody>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-8">
                    <AdministrativeDivisionFilter
                      regions={regions}
                      districts={districts}
                      municipalities={municipalities}
                      form={form}
                    />
                    <div className="flex flex-col gap-y-2 gap-x-4 sm:gap-x-8">
                      <PriceFilter control={form.control} />
                      <AdvertisementTypeFilter
                        control={form.control}
                        resetField={form.resetField}
                      />
                    </div>
                    <SubmitButton />
                  </div>
                </form>
              </Form>
            </CredenzaBody>
          </CredenzaContent>
        </Credenza>
      </CardContent>
    </Card>
  );
}
