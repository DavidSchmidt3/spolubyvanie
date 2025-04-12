import { ConfigTabTable } from "@/app/[locale]/_components/home/filter/config-tab/config-tab-table";
import { useFilterDialog } from "@/context/filter-dialog";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { type UserFilter } from "@/lib/data/user";

import { type UseFormReturn } from "react-hook-form";
import ConfigTabAddNew from "./config-tab-add-new";

type Props = {
  userFilters: UserFilter[];
  form: UseFormReturn<AdvertisementFilterFormValues>;
};

export default function ConfigTab({ userFilters, form }: Props) {
  const { configTabState } = useFilterDialog();

  if (configTabState === "view") {
    return <ConfigTabTable userFilters={userFilters} />;
  }

  return <ConfigTabAddNew form={form} />;
}
