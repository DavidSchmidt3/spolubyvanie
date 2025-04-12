import { Button } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/[locale]/_components/ui/table";
import { type UserFilter } from "@/lib/data/user";
import { useTranslations } from "next-intl";

type Props = {
  userFilters: UserFilter[];
};

export function ConfigTabTable({ userFilters }: Props) {
  const t = useTranslations("translations.advertisement_list.tabs.config");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[70%]">{t("table.title")}</TableHead>
          <TableHead className="text-right">{t("table.actions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userFilters.length > 0 ? (
          userFilters.map((filter) => (
            <TableRow key={filter.id}>
              <TableCell className="font-medium">{filter.name}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      console.log("edit");
                    }}
                    aria-label={t("edit", { name: filter.name })} // TODO: check
                  >
                    <Icons.edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      console.log("delete");
                    }}
                    aria-label={t("delete", { name: filter.name })}
                  >
                    <Icons.trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={2}
              className="text-center py-6 text-muted-foreground"
            >
              {t("no_filters")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
