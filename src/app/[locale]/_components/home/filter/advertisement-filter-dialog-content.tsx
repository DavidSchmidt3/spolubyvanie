import AdministrativeDivisionFilter from "@/app/[locale]/_components/home/filter/administrative-division-filter";
import { AdvertisementTypeFilter } from "@/app/[locale]/_components/home/filter/advertisement-type-filter";
import PriceFilter from "@/app/[locale]/_components/home/filter/price-filter";
import SubmitButton from "@/app/[locale]/_components/home/filter/submit-button";
import {
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/app/[locale]/_components/ui/credenza";
import { Form } from "@/app/[locale]/_components/ui/form";
import { type AdvertisementFilterFormValues } from "@/lib/data/actions/advertisements/schema";
import {
  type getDistricts,
  type getMunicipalities,
  type getRegions,
} from "@/lib/data/administrative-divisions";
import { useTranslations } from "next-intl";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  regions: Awaited<ReturnType<typeof getRegions>>;
  districts: Awaited<ReturnType<typeof getDistricts>>;
  municipalities: Awaited<ReturnType<typeof getMunicipalities>>;
  form: UseFormReturn<AdvertisementFilterFormValues>;
  onSubmit: (data: AdvertisementFilterFormValues) => void;
};

export default function AdvertisementFilterDialogContent({
  regions,
  districts,
  municipalities,
  form,
  onSubmit,
}: Props) {
  "use no memo";
  const t = useTranslations("translations");
  return (
    <CredenzaContent className="max-w-3xl pb-8 bottom-0 h-fit">
      <CredenzaHeader>
        <CredenzaTitle className="text-2xl">
          {t("advertisement.filter.title")}
        </CredenzaTitle>
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
              <SubmitButton />
            </div>
          </form>
        </Form>
      </CredenzaBody>
    </CredenzaContent>
  );
}
