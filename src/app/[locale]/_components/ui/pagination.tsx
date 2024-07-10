import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import {
  buttonVariants,
  type ButtonProps,
} from "@/app/[locale]/_components/ui/button";
import { cn } from "@/lib/utils";
import { type Locale, type pathnames } from "@/lib/utils/localization/i18n";
import { Link } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps<Pathname extends keyof typeof pathnames> = {
  isActive?: boolean;
  locale?: Locale;
  className?: string;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<typeof Link<Pathname>>;

const PaginationLink = <Pathname extends keyof typeof pathnames>({
  className,
  isActive,
  href,
  size = "icon",
  ...props
}: PaginationLinkProps<Pathname>) => (
  <Link
    aria-current={isActive ? "page" : undefined}
    href={href}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = <Pathname extends keyof typeof pathnames>({
  className,
  ...props
}: PaginationLinkProps<Pathname>) => {
  const t = useTranslations("translations.common.pagination");
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="w-4 h-4" />
      <span>{t("previous")}</span>
    </PaginationLink>
  );
};
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = <Pathname extends keyof typeof pathnames>({
  className,
  ...props
}: PaginationLinkProps<Pathname>) => {
  const t = useTranslations("translations.common.pagination");

  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span>{t("next")}</span>
      <ChevronRight className="w-4 h-4" />
    </PaginationLink>
  );
};
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="w-4 h-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
