import {
  ConfigTabTable,
  type DeleteFilterInput,
} from "@/app/[locale]/_components/home/filter/config-tab/config-tab-table";
import { useFilterDialog } from "@/context/filter-dialog";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { type UserFilter } from "@/lib/data/user";

import { createFilter, deleteFilter } from "@/lib/data/actions/filters";
import { useOptimisticAction } from "next-safe-action/hooks";
import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import ConfigTabAddNew, { type FilterFormValues } from "./config-tab-add-new";

type Props = {
  userFilters: UserFilter[];
  form: UseFormReturn<AdvertisementFilterFormValues>;
  userId: string;
};

type StateToUse = "create" | "delete";
export default function ConfigTab({ userFilters, form, userId }: Props) {
  const { configTabState } = useFilterDialog();
  const [stateToUse, setStateToUse] = useState<StateToUse>("create");

  const {
    execute: createFilterExecute,
    isExecuting: createFilterIsExecuting,
    hasSucceeded: createFilterHasSucceeded,
    hasErrored: createFilterHasErrored,
    result: createFilterResult,
    optimisticState: optimisticCreateFilterState,
  } = useOptimisticAction(createFilter, {
    currentState: { userFilters },
    updateFn: (state, newFilter) => {
      const newFilterWithUserId = {
        ...newFilter,
        user_id: userId,
        id: crypto.randomUUID(),
        notify_with_email: false,
      };

      return {
        userFilters: [...state.userFilters, newFilterWithUserId],
      };
    },
  });

  const {
    execute: deleteFilterExecute,
    isExecuting: deleteFilterIsExecuting,
    hasSucceeded: deleteFilterHasSucceeded,
    hasErrored: deleteFilterHasErrored,
    result: deleteFilterResult,
    optimisticState: optimisticDeleteFilterState,
  } = useOptimisticAction(deleteFilter, {
    currentState: { userFilters },
    updateFn: (state, filterToDelete) => {
      return {
        userFilters: state.userFilters.filter(
          (filter) => filter.id !== filterToDelete.id
        ),
      };
    },
  });

  const createFilterExecuteWrapper = (newFilter: FilterFormValues) => {
    setStateToUse("create");
    createFilterExecute(newFilter);
  };

  const deleteFilterExecuteWrapper = (filterToDelete: DeleteFilterInput) => {
    setStateToUse("delete");
    deleteFilterExecute({ id: filterToDelete.id });
  };

  if (configTabState === "view") {
    return (
      <ConfigTabTable
        execute={deleteFilterExecuteWrapper}
        isExecuting={deleteFilterIsExecuting}
        userFilters={
          stateToUse === "create"
            ? optimisticCreateFilterState.userFilters
            : optimisticDeleteFilterState.userFilters
        }
        hasErrored={deleteFilterHasErrored}
        hasSucceeded={deleteFilterHasSucceeded}
        result={deleteFilterResult}
      />
    );
  }

  return (
    <ConfigTabAddNew
      form={form}
      hasErrored={createFilterHasErrored}
      hasSucceeded={createFilterHasSucceeded}
      result={createFilterResult}
      isExecuting={createFilterIsExecuting}
      execute={createFilterExecuteWrapper}
    />
  );
}
