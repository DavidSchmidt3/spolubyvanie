import SortByField from "@/app/[locale]/_components/home/filter/sort/sort-by-field";
import SortOrderField from "@/app/[locale]/_components/home/filter/sort/sort-order-field";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<AdvertisementFilterFormValues>;
};

export default function SortByFields({ form }: Props) {
  return (
    <div className="relative flex flex-col sm:flex-row w-full gap-4 justify-between ">
      <SortByField form={form} />
      <SortOrderField form={form} />
    </div>
  );
}
