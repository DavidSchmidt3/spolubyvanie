import { ConfigTabTable } from "@/app/[locale]/_components/home/filter/config-tab-table";
import { useFilterDialog } from "@/context/filter-dialog";
import { upsertFilter } from "@/lib/data/actions/filters";
import { type UserFilter } from "@/lib/data/user";
import { useAction } from "next-safe-action/hooks";

type Props = {
  userFilters: UserFilter[];
};

export default function ConfigTab({ userFilters }: Props) {
  // const t = useTranslations("translations.advertisement_list.tabs.config");
  const { execute, isExecuting, result, hasErrored, hasSucceeded } =
    useAction(upsertFilter);
  const { configTabState } = useFilterDialog();

  return configTabState === "view" ? (
    <ConfigTabTable userFilters={userFilters} />
  ) : (
    <div>
      <h1>Add</h1>
    </div>
  );
}
