"use client";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Card, CardContent } from "@/app/[locale]/_components/ui/card";
import {
  Credenza,
  CredenzaTrigger,
} from "@/app/[locale]/_components/ui/credenza";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import {
  FilterDialogProvider,
  TABS,
  useFilterDialog,
} from "@/context/filter-dialog";
import {
  type District,
  type Municipality,
  type Region,
} from "@/lib/data/administrative-divisions";
import { type Property } from "@/lib/data/advertisements-properties";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { type User, type UserFilter } from "@/lib/data/user";
import {
  createQueryParamsFromObject,
  createQueryStringFromObject,
  getCurrentQueryString,
  usePathname,
  useRouter,
} from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const DynamicAdvertisementFilterDialogContent = dynamic(
  () => import("./advertisement-filter-dialog-content"),
  { ssr: false }
);

type Props = {
  regions: Region[];
  districts: District[];
  municipalities: Municipality[];
  properties: Property[];
  userFilters: UserFilter[];
  user: User;
};

function AdvertisementFilterDialogTrigger({
  regions,
  districts,
  municipalities,
  properties,
  userFilters,
  user,
}: Props) {
  const [initialized, setInitialized] = useState(false);
  const [open, setOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { setConfigTabState, setActiveTab } = useFilterDialog();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("translations.advertisement_list");
  const [isRoutingPending, startTransition] = useTransition();

  async function onSubmit(data: AdvertisementFilterFormValues) {
    const currentQueryString = getCurrentQueryString(searchParams);
    const newQueryString = createQueryStringFromObject(data);
    if (currentQueryString === newQueryString) {
      setOpen(false);
      return;
    }
    setIsFetching(true);
    const queryParams = createQueryParamsFromObject(data);
    startTransition(() => {
      router.push({
        pathname: "/[page]",
        params: { page: "1" },
        query: queryParams,
      });
    });
  }

  useEffect(() => {
    setOpen(false);
    setIsFetching(false);
  }, [pathname]);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
    }
  }, [initialized]);

  function onOpenChange(open: boolean) {
    setOpen(open);
    if (open) {
      setConfigTabState("view");
      setActiveTab(TABS.FILTER);
    }
  }

  return (
    <Card className="rounded-none" data-pending={isRoutingPending}>
      <CardContent className="flex flex-col items-center justify-between px-5 py-5 sm:px-10 sm:flex-row gap-y-4 gap-x-6">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-xl font-bold sm:text-3xl">{t("title")}</h1>
          <h2 className="text-base text-left sm:text-lg">{t("description")}</h2>
        </div>
        <div className="flex flex-col gap-4">
          <Credenza onOpenChange={onOpenChange} open={open}>
            <CredenzaTrigger asChild className="px-4 py-2 sm:py-2">
              <Button
                className="flex w-48 gap-2 text-base text-wrap h-14 bg-foreground text-background hover:bg-accent-foreground hover:text-background group"
                variant="outline"
              >
                <Icons.filter className="w-8 h-8 group-hover:motion-preset-seesaw" />
                {t("filter.title")}
              </Button>
            </CredenzaTrigger>
            {initialized && (
              <DynamicAdvertisementFilterDialogContent
                regions={regions}
                districts={districts}
                municipalities={municipalities}
                userFilters={userFilters}
                properties={properties}
                user={user}
                onSubmit={onSubmit}
                isFetching={isFetching}
              />
            )}
          </Credenza>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdvertisementFilterDialog(props: Props) {
  return (
    <FilterDialogProvider>
      <AdvertisementFilterDialogTrigger {...props} />
    </FilterDialogProvider>
  );
}
