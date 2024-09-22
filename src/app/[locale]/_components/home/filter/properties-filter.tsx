import PropertiesFormField from "@/app/[locale]/_components/advertisement/form/properties-form-field";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/[locale]/_components/ui/accordion";
import { type Property } from "@/lib/data/advertisements-properties";
import { useTranslations } from "next-intl";
import {
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  properties: Property[];
  form: UseFormReturn<T>;
  fieldName: Path<T>;
};

export default function PropertiesFilter<T extends FieldValues>({
  properties,
  form,
  fieldName,
}: Props<T>) {
  const t = useTranslations("translations.advertisement_list");

  return (
    <Accordion type="single" collapsible className="w-full -my-4">
      <AccordionItem value="item-1">
        <AccordionTrigger>{t("filter.advanced.label")}</AccordionTrigger>
        <AccordionContent>
          <PropertiesFormField
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
            properties={properties}
            form={form}
            fieldName={fieldName}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
