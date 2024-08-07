import AvailableFromField from "@/app/[locale]/_components/advertisement/form/available-from-field";
import DescriptionField from "@/app/[locale]/_components/advertisement/form/description-field";
import TextField from "@/app/[locale]/_components/advertisement/form/text-field";
import { AdvertisementTypeFilter } from "@/app/[locale]/_components/home/filter/advertisement-type-filter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/[locale]/_components/ui/card";
import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { useTranslations } from "next-intl";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<AdvertisementUpsertFormValues>;
  getNumericProps: (
    min?: string
  ) => React.InputHTMLAttributes<HTMLInputElement>;
  isOffering: boolean;
  adTypeSelectDisabled: boolean;
};

export default function GeneralCard({
  form,
  getNumericProps,
  isOffering,
  adTypeSelectDisabled,
}: Props) {
  const t = useTranslations("translations.add_advertisement");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("general.title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <AdvertisementTypeFilter
          form={form}
          clearable={false}
          disabled={adTypeSelectDisabled}
        />
        <AvailableFromField control={form.control} isOffering={isOffering} />
        <TextField
          control={form.control}
          name="price"
          inputProps={getNumericProps()}
          label={t("form.price.label")}
          placeholder={t("form.price.placeholder")}
        />
        <TextField
          control={form.control}
          name="title"
          label={t("form.title.label")}
          placeholder={t("form.title.placeholder")}
        />
        <DescriptionField control={form.control} />
      </CardContent>
    </Card>
  );
}
