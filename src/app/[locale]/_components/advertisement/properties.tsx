import { Icons } from "@/app/[locale]/_components/ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/[locale]/_components/ui/table";
import { useGroupedProperties } from "@/hooks/grouped-properties";
import { type Property } from "@/lib/data/advertisements-properties";
import { type Advertisement } from "@/lib/data/advertisements/format";
import { type Locale } from "@/lib/utils/localization/i18n";
import { useTranslations } from "next-intl";

type Props = {
  advertisementProperties: Advertisement["advertisements_properties"];
  locale: Locale;
  properties: Property[];
};

export default function Properties({
  properties,
  locale,
  advertisementProperties,
}: Props) {
  const t = useTranslations("translations");
  const groupedProperties = useGroupedProperties(properties);

  return (
    <div className="grid grid-cols-1 col-span-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {groupedProperties.map(([key, value]) => {
        const sortedValue = value.toSorted((a, b) => {
          const aContains = advertisementProperties.some(
            (property) => property.property_id === a.id
          );
          const bContains = advertisementProperties.some(
            (property) => property.property_id === b.id
          );

          if (aContains && !bContains) return -1;
          if (!aContains && bContains) return 1;
          return 0;
        });

        return (
          <Table className="flex flex-col w-full gap-y-2" key={key}>
            <TableHeader className="text-lg font-bold">
              <TableRow>
                <TableHead>
                  {t(`advertisement_list.properties.${key}`)}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {sortedValue.map((item) => {
                const containsProperty = advertisementProperties.find(
                  (property) => property.property_id === item.id
                );
                return (
                  <TableRow
                    key={item.id}
                    className={`${
                      containsProperty ? "bg-success/40" : "bg-destructive/50"
                    } w-full`}
                  >
                    <TableCell className="w-full">
                      {item[`${locale}_translation`]}
                    </TableCell>
                    <TableCell>
                      {containsProperty ? <Icons.tick /> : <Icons.cross />}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        );
      })}
    </div>
  );
}
