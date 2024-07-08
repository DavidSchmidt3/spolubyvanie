import AdministrativeDivisionFilter from "@/app/[locale]/_components/home/filter/administrative-division-filter";
import { AdvertisementTypeFilter } from "@/app/[locale]/_components/home/filter/advertisement-type-filter";
import PriceFilter from "@/app/[locale]/_components/home/filter/price-filter";
import { Button } from "@/app/[locale]/_components/ui/button";
import {
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/app/[locale]/_components/ui/credenza";
import { Form } from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { type AdvertisementFilterFormValues } from "@/lib/data/actions/advertisements/schema";
import {
  type getDistricts,
  type getMunicipalities,
  type getRegions,
} from "@/lib/data/administrative-divisions";
import { useRouter } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  regions: Awaited<ReturnType<typeof getRegions>>;
  districts: Awaited<ReturnType<typeof getDistricts>>;
  municipalities: Awaited<ReturnType<typeof getMunicipalities>>;
  form: UseFormReturn<AdvertisementFilterFormValues>;
  onSubmit: (data: AdvertisementFilterFormValues) => void;
  isFilterActive: boolean;
  isFetching: boolean;
};

export default function AdvertisementFilterDialogContent({
  regions,
  districts,
  municipalities,
  form,
  onSubmit,
  isFilterActive,
  isFetching,
}: Props) {
  "use no memo";
  const router = useRouter();
  const t = useTranslations("translations.advertisement");
  return (
    <CredenzaContent className="max-w-3xl pb-8 bottom-0 h-fit">
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
                <AdvertisementTypeFilter
                  control={form.control}
                  setValue={form.setValue}
                />
              </div>
              <div className="flex flex-col gap-y-4 order-3 my-2 sm:col-span-2">
                <Button
                  type="submit"
                  variant="ringHover"
                  aria-label={t("filter.button")}
                  className="text-base mt-5 sm:mt-0"
                  disabled={isFetching}
                >
                  {isFetching && (
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin p" />
                  )}
                  {t("filter.button")}
                </Button>
                {isFilterActive && (
                  <Button
                    type="button"
                    variant="destructive"
                    className="text-base h-auto"
                    onClick={() => router.push("/")}
                    disabled={isFetching}
                  >
                    <Icons.cross className="w-6 h-6" />
                    {t("filter.clear.button")}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CredenzaBody>
    </CredenzaContent>
  );
}
