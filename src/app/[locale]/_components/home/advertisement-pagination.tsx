import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/[locale]/_components/ui/pagination";
import { type AdvertisementFullSchemaValues } from "@/lib/data/actions/advertisements/schema";
import { type AdvertisementMeta } from "@/lib/data/advertisements";
import {
  buildPaginatedQuery,
  getCurrentQueryString,
} from "@/lib/utils/localization/navigation";
import { type SafeParseReturnType } from "zod";

type Props = {
  paginationData: AdvertisementMeta;
  safelyParsedSearchParams: SafeParseReturnType<
    AdvertisementFullSchemaValues,
    AdvertisementFullSchemaValues
  >;
};

export default function AdvertisementPagination({
  paginationData,
  safelyParsedSearchParams,
}: Props) {
  const { isFirstPage, isLastPage, currentPage, pageCount } = paginationData;
  const currentQueryString = getCurrentQueryString(
    safelyParsedSearchParams.data as Record<string, string>
  );

  return (
    <Pagination>
      <PaginationContent className="pb-4 justify-center flex-wrap">
        {!isFirstPage && (
          <PaginationItem>
            <PaginationPrevious
              href={{
                pathname: "/",
                query: buildPaginatedQuery(currentQueryString, currentPage - 1),
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
                    href={{
                      pathname: "/",
                      query: buildPaginatedQuery(currentQueryString, page),
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
                pathname: "/",
                query: buildPaginatedQuery(currentQueryString, currentPage + 1),
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
