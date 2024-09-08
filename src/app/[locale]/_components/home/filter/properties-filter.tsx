import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/[locale]/_components/ui/accordion";
import { Checkbox } from "@/app/[locale]/_components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { useLocale } from "@/hooks/locale";
import { type Property } from "@/lib/data/advertisements-properties";
import { advertisementPropertySortOrder } from "@/lib/data/advertisements-properties/types";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { useTranslations } from "next-intl";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  properties: Property[];
  form: UseFormReturn<AdvertisementFilterFormValues>;
};

export default function PropertiesFilter({ properties, form }: Props) {
  const t = useTranslations("translations.advertisement_list");
  const locale = useLocale();

  const groupedProperties =
    // eslint-disable-next-line
    (properties && Map.groupBy(properties, ({ type }) => type)) ?? new Map();

  return (
    <Accordion type="single" collapsible className="w-full -my-4">
      <AccordionItem value="item-1">
        <AccordionTrigger>{t("filter.advanced.label")}</AccordionTrigger>
        <AccordionContent>
          <FormField
            control={form.control}
            name="properties"
            render={() => (
              <FormItem className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Array.from(groupedProperties.entries())
                  .sort(([keyA], [keyB]) => {
                    return (
                      advertisementPropertySortOrder[keyA] -
                      advertisementPropertySortOrder[keyB]
                    );
                  })
                  .map(([key, value]) => {
                    return (
                      <div className="flex flex-col gap-y-2" key={key}>
                        <h4 className="font-bold text-lg">
                          {t(`properties.${key}`)}
                        </h4>
                        {value
                          .sort((a, b) => {
                            return (
                              (a.order ?? Number.MAX_SAFE_INTEGER) -
                              (b.order ?? Number.MAX_SAFE_INTEGER)
                            );
                          })
                          .map((item) => {
                            return (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="properties"
                                render={({ field }) => {
                                  const value = field.value as Record<
                                    string,
                                    boolean
                                  >;

                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={value[item.id]}
                                          onCheckedChange={(
                                            checked: boolean
                                          ) => {
                                            form.setValue("properties", {
                                              ...value,
                                              [item.id]: checked,
                                            });
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal hover:cursor-pointer">
                                        {item[`${locale}_translation`]}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            );
                          })}
                      </div>
                    );
                  })}
                <FormMessage />
              </FormItem>
            )}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
