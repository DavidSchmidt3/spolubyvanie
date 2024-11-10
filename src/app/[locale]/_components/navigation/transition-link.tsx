"use client";

import { Link, useRouter } from "@/lib/utils/localization/navigation";
import { useTransition } from "react";

type RouterType = ReturnType<typeof useRouter>;
type PushType = RouterType["push"];
export type HrefType = Parameters<PushType>[0];

type Props = {
  className?: string;
  href: HrefType;
  prefetch?: boolean | null;
  children?: React.ReactNode;
  ariaCurrent?:
    | boolean
    | "false"
    | "true"
    | "page"
    | "step"
    | "location"
    | "date"
    | "time";
};

export default function TransitionLink({
  href,
  className,
  prefetch,
  children,
  ariaCurrent,
}: Props) {
  const [isRoutingPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div data-pending={isRoutingPending}>
      <Link
        href={href}
        prefetch={prefetch}
        aria-current={ariaCurrent}
        passHref
        className={className}
        onClick={() => startTransition(() => router.push(href))}
      >
        {children}
      </Link>
    </div>
  );
}
