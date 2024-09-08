import AdvertisementPaginationPrefetch from "@/app/[locale]/_components/home/advertisement/pagination-prefetch";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/[locale]/_components/ui/pagination";
import { type AdvertisementMeta } from "@/lib/data/advertisements";
import { ADVERTISEMENTS_FILTER_SCHEMA } from "@/lib/data/advertisements/schema";
import { createQueryParamsFromObject } from "@/lib/utils/localization/navigation";
import { type ParsedUrlQuery } from "querystring";

type Props = {
  paginationData: AdvertisementMeta;
  searchParams: ParsedUrlQuery;
  page: string;
};

export default function AdvertisementPagination({
  paginationData,
  searchParams,
  page,
}: Props) {
  // component is either way rendered only if paginationData is present
  const { isFirstPage, isLastPage, currentPage, pageCount } = paginationData!;
  const { data: currentQueryString } =
    ADVERTISEMENTS_FILTER_SCHEMA.safeParse(searchParams);

  const parsedQueryString = createQueryParamsFromObject(currentQueryString);

  return (
    <>
      <AdvertisementPaginationPrefetch
        nextPage={(parseInt(page) + 1).toString()}
        currentQueryString={currentQueryString}
      />
      <Pagination>
        <PaginationContent className="pb-4 justify-center flex-wrap">
          {!isFirstPage && (
            <PaginationItem className="w-full text-center sm:w-auto">
              <PaginationPrevious
                prefetch={true}
                href={{
                  pathname: "/[page]",
                  params: { page: (parseInt(page) - 1).toString() },
                  query: parsedQueryString,
                }}
              />
            </PaginationItem>
          )}
          {Array.from({ length: 5 }, (_, index) => {
            const page = currentPage - 2 + index;
            if (page > 0 && page <= pageCount) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    prefetch={page < currentPage}
                    href={{
                      pathname: "/[page]",
                      params: { page },
                      query: parsedQueryString,
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
          {!isLastPage && (
            <PaginationItem className="w-full text-center sm:w-auto">
              <PaginationNext
                prefetch={false}
                href={{
                  pathname: "/[page]",
                  params: { page: (parseInt(page) + 1).toString() },
                  query: parsedQueryString,
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
