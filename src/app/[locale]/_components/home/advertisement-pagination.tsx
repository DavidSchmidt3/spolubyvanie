import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/[locale]/_components/ui/pagination";

export default function AdvertisementPagination() {
  return (
    <Pagination>
      <PaginationContent className="pb-4 justify-center flex-wrap">
        <PaginationItem>
          <PaginationPrevious href="/" />
        </PaginationItem>
        <div className="flex flex-row gap-1">
          <PaginationItem>
            <PaginationLink href="/" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </div>
        <PaginationItem>
          <PaginationNext href="/" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
