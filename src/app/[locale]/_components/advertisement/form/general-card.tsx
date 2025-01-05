import AvailableFromField from "@/app/[locale]/_components/advertisement/form/available-from-field";
import DescriptionField from "@/app/[locale]/_components/advertisement/form/description-field";
import TextField from "@/app/[locale]/_components/advertisement/form/text-field";
import { AdvertisementTypeFilter } from "@/app/[locale]/_components/home/filter/advertisement-type-filter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/[locale]/_components/ui/card";
import { useTranslations } from "next-intl";
import AgeField from "./age-field";

type Props = {
  getNumericProps: (
    min?: string
  ) => React.InputHTMLAttributes<HTMLInputElement>;
  isOffering: boolean | null;
  adTypeSelectDisabled: boolean;
};

export default function GeneralCard({
  getNumericProps,
  isOffering,
  adTypeSelectDisabled,
}: Props) {
  const t = useTranslations("translations.add_advertisement");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("general.title")}</CardTitle>
        <CardDescription>{t("general.description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <AdvertisementTypeFilter
          clearable={false}
          disabled={adTypeSelectDisabled}
        />
        <AvailableFromField isOffering={isOffering} />
        <TextField
          name="price"
          inputProps={getNumericProps()}
          label={t("form.price.label")}
          placeholder={t("form.price.placeholder")}
        />
        <TextField
          name="title"
          label={t("form.title.label")}
          placeholder={t("form.title.placeholder")}
        />
        <DescriptionField />
        <AgeField isOffering={isOffering} />
      </CardContent>
    </Card>
  );
}
