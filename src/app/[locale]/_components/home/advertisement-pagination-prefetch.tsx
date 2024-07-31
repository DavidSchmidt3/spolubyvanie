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
    router.prefetch({
      pathname: "/[page]",
      params: { page: nextPage },
      query: currentQueryString,
    });
  }, [nextPage, currentQueryString, router]);

  return null; // This component doesn't render anything
}
