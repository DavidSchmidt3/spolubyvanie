"use client";
import { type Locale, type pathnames } from "@/lib/utils/localization/i18n";
import {
  Link,
  pushRouteWithTransition,
  usePathname,
  useRouter,
} from "@/lib/utils/localization/navigation";
import { type LinkProps } from "next/link";
import React from "react";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: keyof typeof pathnames;
  className?: string;
  locale?: string | false;
}

export const TransitionLink = ({
  children,
  href,
  className,
  locale,
  ...props
}: TransitionLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();

  async function handleTransition(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault();
    if (href === pathname) return;
    await pushRouteWithTransition(href, router);
  }

  return (
    <Link
      {...props}
      locale={locale as Locale | undefined}
      className={className}
      href={href}
      onClick={handleTransition}
    >
      {children}
    </Link>
  );
};
