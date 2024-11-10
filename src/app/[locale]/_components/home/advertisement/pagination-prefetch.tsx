"use client";

import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import {
  createQueryParamsFromObject,
  useRouter,
} from "@/lib/utils/localization/navigation";
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

  const parsedQueryString = createQueryParamsFromObject(currentQueryString);

  useEffect(() => {
    for (let i = 0; i <= 1; i++) {
      const page = parseInt(nextPage) + i;
      router.prefetch({
        pathname: "/[page]",
        params: { page: page.toString() },
        query: parsedQueryString,
      });
    }
  }, [nextPage, currentQueryString, router, parsedQueryString]);

  return null; // This component doesn't render anything
}
