import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/[locale]/_components/ui/pagination";
import { type MyAdvertisementsMeta } from "@/lib/data/my-advertisements";

type Props = {
  paginationData: MyAdvertisementsMeta;
  page: string;
};

export default function MyAdvertisementPagination({
  paginationData,
  page,
}: Props) {
  // component is either way rendered only if paginationData is present
  const { isFirstPage, isLastPage, currentPage, pageCount } = paginationData!;

  return (
    <Pagination>
      <PaginationContent className="flex-wrap justify-center pb-4">
        {!isFirstPage && (
          <PaginationItem className="w-full text-center sm:w-auto">
            <PaginationPrevious
              href={{
                pathname: "/my-advertisements/[page]",
                params: { page: (parseInt(page) - 1).toString() },
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
                  href={{
                    pathname: "/my-advertisements/[page]",
                    params: { page },
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
              href={{
                pathname: "/my-advertisements/[page]",
                params: { page: (parseInt(page) + 1).toString() },
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
