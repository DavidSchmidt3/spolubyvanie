import PropertiesFormField from "@/app/[locale]/_components/advertisement/form/properties-form-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/[locale]/_components/ui/card";
import { type Property } from "@/lib/data/advertisements-properties";
import { useTranslations } from "next-intl";

type Props = {
  properties: Property[];
};

export default function AdditionalDetailsCard({ properties }: Props) {
  const t = useTranslations("translations.add_advertisement");

  return (
    <Card className="md:col-span-2 xl:col-span-3">
      <CardHeader>
        <CardTitle>{t("additional_details.title")}</CardTitle>
        <CardDescription>{t("additional_details.description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <PropertiesFormField
          properties={properties}
          fieldName="properties"
          className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        />
      </CardContent>
    </Card>
  );
}
