import AdministrativeDivisionSelect from "@/app/[locale]/_components/advertisement/form/administrative-division-select";
import TextField from "@/app/[locale]/_components/advertisement/form/text-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/[locale]/_components/ui/card";
import {
  type District,
  type Municipality,
  type Region,
} from "@/lib/data/administrative-divisions";
import { useTranslations } from "next-intl";

type Props = {
  isOffering: boolean | null;
  regions: Region[];
  districts: District[];
  municipalities: Municipality[];
};

export default function LocationCard({
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
        <CardDescription>{t("location.description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <AdministrativeDivisionSelect
          regions={regions}
          districts={districts}
          municipalities={municipalities}
        />
        {isOffering && (
          <TextField
            name="street"
            placeholder={t("form.street.placeholder")}
            label={t("form.street.label")}
          />
        )}
      </CardContent>
    </Card>
  );
}
