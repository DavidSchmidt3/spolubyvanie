import SortByField from "@/app/[locale]/_components/home/filter/sort/sort-by-field";
import SortOrderField from "@/app/[locale]/_components/home/filter/sort/sort-order-field";

export default function SortByFields() {
  return (
    <div className="relative flex flex-col sm:flex-row w-full gap-4 justify-between ">
      <SortByField />
      <SortOrderField />
    </div>
  );
}
