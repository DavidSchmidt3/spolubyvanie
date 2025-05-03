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
import { useActionToast } from "@/hooks/action-toast";
import { type DELETE_FILTER_SCHEMA } from "@/lib/data/actions/filters/schema";
import { type UserFilter } from "@/lib/data/user";
import {
  createQueryParamsFromObject,
  useRouter,
} from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { type z } from "zod";

export type DeleteFilterInput = z.infer<typeof DELETE_FILTER_SCHEMA>;
type Props = {
  userFilters: UserFilter[];
  hasErrored: boolean;
  hasSucceeded: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any;
  execute: (data: DeleteFilterInput) => void;
  isExecuting: boolean;
};

export function ConfigTabTable({
  userFilters,
  hasErrored,
  hasSucceeded,
  result,
  execute,
  isExecuting,
}: Props) {
  const t = useTranslations("translations.advertisement_list.tabs.config");
  const router = useRouter();
  const [filterToDeleteId, setFilterToDeleteId] = useState<string | null>(null);

  const onActionSuccess = () => {
    router.refresh();
  };

  useActionToast({
    hasErrored,
    hasSucceeded,
    successTitle: "alerts.filters.delete.success.title",
    errorTitle: "alerts.filters.delete.error.title",
    result,
    onSuccess: onActionSuccess,
  });

  const handleDeleteFilter = (id: string) => {
    setFilterToDeleteId(id);
    execute({ id });
  };

  const handleApplyFilter = (id: string) => {
    const filterToApply = userFilters.find((filter) => filter.id === id);
    if (!filterToApply) return;

    const params = new URLSearchParams(decodeURI(filterToApply.query));
    const queryParams = createQueryParamsFromObject(
      Object.fromEntries(params.entries())
    );

    router.push({
      pathname: "/[page]",
      params: { page: "1" },
      query: queryParams,
    });
  };

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
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <Button
                    variant="outline"
                    size="default"
                    className="flex gap-2"
                    onClick={() => handleApplyFilter(filter.id)}
                  >
                    {t("table.apply")}
                    <Icons.filter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    className="text-destructive hover:bg-destructive/10 flex gap-2"
                    onClick={() => handleDeleteFilter(filter.id)}
                    disabled={isExecuting}
                  >
                    {isExecuting && filterToDeleteId === filter.id && (
                      <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    <span className="hidden sm:block">{t("table.delete")}</span>
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
