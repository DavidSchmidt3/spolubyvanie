"use client";
import { type pathnames } from "@/lib/utils/localization/i18n";
import {
  Link,
  pushRouteWithTransition,
  usePathname,
  useRouter,
} from "@/lib/utils/localization/navigation";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type TransitionLinkProps<Pathname extends keyof typeof pathnames> = {
  children: React.ReactNode;
  className?: string;
  locale?: string | false;
} & React.ComponentProps<typeof Link<Pathname>>;

export const TransitionLink = <Pathname extends keyof typeof pathnames>({
  children,
  href,
  className,
  ...props
}: TransitionLinkProps<Pathname>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsEntries = searchParams.entries();

  async function handleTransition(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault();
    if (href === pathname) return;
    await pushRouteWithTransition(href, router);
  }

  useEffect(() => {
    const body = document.querySelector("body");
    body?.classList.remove("page-transition");
  }, [pathname, searchParamsEntries]);

  return (
    <Link
      {...props}
      prefetch
      className={className}
      href={href}
      onClick={handleTransition}
    >
      {children}
    </Link>
  );
};
