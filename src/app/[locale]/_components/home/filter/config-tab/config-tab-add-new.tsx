import { useRouter } from "next/navigation";

import { Button } from "@/app/[locale]/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { Input } from "@/app/[locale]/_components/ui/input";
import { TABS, useFilterDialog } from "@/context/filter-dialog";
import { useActionToast } from "@/hooks/action-toast";
import { useControlledForm } from "@/hooks/form";
import { UPSERT_FILTER_FORM_SCHEMA } from "@/lib/data/actions/filters/schema";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { createQueryStringFromObject } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";

export type FilterFormValues = z.infer<typeof UPSERT_FILTER_FORM_SCHEMA>;

type Props = {
  form: UseFormReturn<AdvertisementFilterFormValues>;
  hasErrored: boolean;
  hasSucceeded: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any;
  isExecuting: boolean;
  execute: (data: FilterFormValues) => void;
};

export default function ConfigTabAddNew({
  form,
  hasErrored,
  hasSucceeded,
  result,
  isExecuting,
  execute,
}: Props) {
  const t = useTranslations("translations.advertisement_list.tabs.config");
  const router = useRouter();

  const onActionSuccess = () => {
    router.refresh();
    setActiveTab(TABS.CONFIG);
    setConfigTabState("view");
  };

  useActionToast({
    hasErrored,
    hasSucceeded,
    result,
    successTitle: "alerts.filters.save.success.title",
    errorTitle: "alerts.filters.save.error.title",
    onSuccess: onActionSuccess,
  });

  const { setActiveTab, setConfigTabState } = useFilterDialog();

  const defaultValues = useMemo<FilterFormValues>(() => {
    return {
      name: "",
      query: "",
    };
  }, []);

  const nameForm = useControlledForm<FilterFormValues>({
    schema: UPSERT_FILTER_FORM_SCHEMA,
    defaultValues,
  });

  const onSubmit = async (data: FilterFormValues) => {
    const currentFilterValues = form.getValues();
    const queryString = createQueryStringFromObject(currentFilterValues);

    execute({
      name: data.name,
      query: queryString,
    });
  };

  return (
    <div className="space-y-4 px-4">
      <h2 className="text-lg font-semibold">{t("save_new.title")}</h2>
      <Form {...nameForm}>
        <form onSubmit={nameForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={nameForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("table.title")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("table.title")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={isExecuting}>
              {isExecuting && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t("save_new.button")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
