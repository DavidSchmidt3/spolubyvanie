import AdministrativeDivisionSelect from "@/app/[locale]/_components/advertisement/form/administrative-division-select";
import TextField from "@/app/[locale]/_components/advertisement/form/text-field";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/[locale]/_components/ui/card";
import { type AdvertisementAddFormValues } from "@/lib/data/actions/add-advertisement/schema";
import {
  type District,
  type Municipality,
  type Region,
} from "@/lib/data/administrative-divisions";
import { useTranslations } from "next-intl";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<AdvertisementAddFormValues>;
  isOffering: boolean;
  regions: Region[];
  districts: District[];
  municipalities: Municipality[];
};

export default function LocationCard({
  form,
  districts,
  municipalities,
  regions,
  isOffering,
}: Props) {
  const t = useTranslations("translations.add_advertisement");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("location.title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <AdministrativeDivisionSelect
          form={form}
          regions={regions}
          districts={districts}
          municipalities={municipalities}
        />
        {isOffering && (
          <TextField
            control={form.control}
            name="street"
            placeholder={t("form.street.placeholder")}
            label={t("form.street.label")}
          />
        )}
      </CardContent>
    </Card>
  );
}
