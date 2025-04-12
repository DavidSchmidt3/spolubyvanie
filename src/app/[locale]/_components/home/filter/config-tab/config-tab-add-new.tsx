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
import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import { TABS, useFilterDialog } from "@/context/filter-dialog";
import { useControlledForm } from "@/hooks/form";
import { upsertFilter } from "@/lib/data/actions/filters";
import { FILTER_FORM_SCHEMA } from "@/lib/data/actions/filters/schema";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { createQueryStringFromObject } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useMemo } from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";

type FilterFormValues = z.infer<typeof FILTER_FORM_SCHEMA>;

type Props = {
  form: UseFormReturn<AdvertisementFilterFormValues>;
};

export default function ConfigTabAddNew({ form }: Props) {
  const t = useTranslations("translations.advertisement_list.tabs.config");
  const { toast } = useToast();
  const { execute, isExecuting, hasSucceeded, hasErrored } =
    useAction(upsertFilter);

  const { setActiveTab, setConfigTabState } = useFilterDialog();

  const defaultValues = useMemo<FilterFormValues>(() => {
    return {
      name: "",
      query: "",
    };
  }, []);

  const nameForm = useControlledForm<FilterFormValues>({
    schema: FILTER_FORM_SCHEMA,
    defaultValues,
  });

  const onSubmit = async (data: FilterFormValues) => {
    const currentFilterValues = form.getValues();
    const queryString = createQueryStringFromObject(currentFilterValues);

    console.log(queryString);
    execute({
      name: data.name,
      query: queryString,
    });
  };

  useEffect(() => {
    if (hasErrored) {
      toast({
        title: "alerts.filters.save.error.title",
        variant: "error",
      });
    }

    if (hasSucceeded) {
      toast({
        title: "alerts.filters.save.success.title",
        variant: "success",
      });
      setActiveTab(TABS.CONFIG);
      setConfigTabState("view");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasErrored, hasSucceeded]);

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
