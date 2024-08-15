"use client";

import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { useRouter } from "@/lib/utils/localization/navigation";
import { useEffect } from "react";

type Props = {
  nextPage: string;
  currentQueryString: Zod.SafeParseReturnType<
    AdvertisementFilterFormValues,
    AdvertisementFilterFormValues
  >["data"];
};

export default function AdvertisementPaginationPrefetch({
  nextPage,
  currentQueryString,
}: Props) {
  const router = useRouter();

  useEffect(() => {
    for (let i = 0; i <= 1; i++) {
      const page = parseInt(nextPage) + i;
      router.prefetch({
        pathname: "/[page]",
        params: { page: page.toString() },
        query: currentQueryString,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPage, currentQueryString]);

  return null; // This component doesn't render anything
}
