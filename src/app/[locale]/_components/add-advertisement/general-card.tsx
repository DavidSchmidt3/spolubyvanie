import AvailableFromField from "@/app/[locale]/_components/add-advertisement/available-from-field";
import DescriptionField from "@/app/[locale]/_components/add-advertisement/description-field";
import TextField from "@/app/[locale]/_components/add-advertisement/text-field";
import { AdvertisementTypeFilter } from "@/app/[locale]/_components/home/filter/advertisement-type-filter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/[locale]/_components/ui/card";
import { type AdvertisementAddFormValues } from "@/lib/data/actions/add-advertisement/schema";
import { useTranslations } from "next-intl";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<AdvertisementAddFormValues>;
  getNumericProps: (
    min?: string
  ) => React.InputHTMLAttributes<HTMLInputElement>;
};

export default function GeneralCard({ form, getNumericProps }: Props) {
  const t = useTranslations("translations.add_advertisement");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("general.title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <AdvertisementTypeFilter form={form} />
        <AvailableFromField control={form.control} />
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
