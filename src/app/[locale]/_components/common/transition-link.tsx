"use client";
import { type pathnames } from "@/lib/utils/localization/i18n";
import {
  Link,
  pushRouteWithTransition,
  usePathname,
  useRouter,
} from "@/lib/utils/localization/navigation";
import React from "react";

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

  async function handleTransition(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault();
    if (href === pathname) return;
    await pushRouteWithTransition<Pathname>(href, router);
  }

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
