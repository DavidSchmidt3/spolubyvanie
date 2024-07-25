"use client";
import { type pathnames } from "@/lib/utils/localization/i18n";
import {
  Link,
  pushRouteWithTransition,
  usePathname,
  useRouter,
} from "@/lib/utils/localization/navigation";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const [params, setParams] = useState([] as string[]);

  const searchParams = useSearchParams();
  const searchParamsEntries = searchParams.entries();

  // We need to prevent redirecting to the same page, because the useeffect watching for pathname or params changes
  // will never trigger and transition background will stay on forever
  function newRouteMatchesCurrentRoute() {
    let isEqual = false;
    if (typeof href === "string") {
      isEqual = href === pathname;
    } else if (typeof href === "object") {
      isEqual = href.pathname === pathname;

      if (isEqual && "params" in href) {
        const hrefParams = Object.values(href.params);
        isEqual = params.every((param, index) => param === hrefParams[index]);
      }
    }
    return isEqual;
  }

  async function handleTransition(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault();

    if (newRouteMatchesCurrentRoute()) return;
    await pushRouteWithTransition(href, router);
  }

  useEffect(() => {
    const body = document.querySelector("body");
    body?.classList.remove("page-transition");
    setParams(window.location.pathname.split("/").slice(2));
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
