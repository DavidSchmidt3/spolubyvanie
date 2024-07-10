import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/[locale]/_components/ui/pagination";
import { type AdvertisementFilterFormValues } from "@/lib/data/actions/advertisements/schema";
import { type AdvertisementMeta } from "@/lib/data/advertisements";
import { type SafeParseReturnType } from "zod";

type Props = {
  paginationData: AdvertisementMeta;
  safelyParsedSearchParams: SafeParseReturnType<
    AdvertisementFilterFormValues,
    AdvertisementFilterFormValues
  >;
  page: string;
};

export default function AdvertisementPagination({
  paginationData,
  safelyParsedSearchParams,
  page,
}: Props) {
  const { isFirstPage, isLastPage, currentPage, pageCount } = paginationData;
  const currentQueryString = safelyParsedSearchParams.data;

  return (
    <Pagination>
      <PaginationContent className="pb-4 justify-center flex-wrap">
        {!isFirstPage && (
          <PaginationItem>
            <PaginationPrevious
              href={{
                pathname: "/[page]",
                params: { page: (parseInt(page) - 1).toString() },
                query: currentQueryString,
              }}
            />
          </PaginationItem>
        )}
        <div className="flex flex-row gap-1">
          {Array.from({ length: 5 }, (_, index) => {
            const page = currentPage - 2 + index;
            if (page > 0 && page <= pageCount) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    prefetch
                    href={{
                      pathname: "/[page]",
                      params: { page },
                      query: currentQueryString,
                    }}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            return null;
          })}
        </div>
        {!isLastPage && (
          <PaginationItem>
            <PaginationNext
              href={{
                pathname: "/[page]",
                params: { page: (parseInt(page) + 1).toString() },
                query: currentQueryString,
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
