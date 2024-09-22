import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/[locale]/_components/ui/card";
import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { type Property } from "@/lib/data/advertisements-properties";
import { useTranslations } from "next-intl";
import { type UseFormReturn } from "react-hook-form";
import PropertiesFormField from "./properties-form-field";

type Props = {
  form: UseFormReturn<AdvertisementUpsertFormValues>;
  properties: Property[];
};

export default function AdditionalDetailsCard({ form, properties }: Props) {
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
          form={form}
          fieldName="properties"
          className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        />
      </CardContent>
    </Card>
  );
}
