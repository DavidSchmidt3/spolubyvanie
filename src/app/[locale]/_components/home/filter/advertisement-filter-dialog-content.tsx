import ConfigTab from "@/app/[locale]/_components/home/filter/config-tab";
import FilterTab from "@/app/[locale]/_components/home/filter/filter-tab";
import {
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/app/[locale]/_components/ui/credenza";
import { Form } from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/[locale]/_components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/[locale]/_components/ui/tooltip";
import { TABS, useFilterDialog } from "@/context/filter-dialog";
import { useControlledForm } from "@/hooks/form";
import {
  type getDistricts,
  type getMunicipalities,
  type getRegions,
} from "@/lib/data/administrative-divisions";
import { type Property } from "@/lib/data/advertisements-properties";
import {
  ADVERTISEMENTS_FILTER_SCHEMA,
  type AdvertisementFilterFormValues,
} from "@/lib/data/advertisements/schema";
import { type User, type UserFilter } from "@/lib/data/user";
import { getFilterFormDefaultValues } from "@/lib/utils/filter-form";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type Props = {
  regions: Awaited<ReturnType<typeof getRegions>>;
  districts: Awaited<ReturnType<typeof getDistricts>>;
  municipalities: Awaited<ReturnType<typeof getMunicipalities>>;
  properties: Property[];
  userFilters: UserFilter[];
  onSubmit: (data: AdvertisementFilterFormValues) => void;
  isFetching: boolean;
  user: User;
};

export default function AdvertisementFilterDialogContent({
  regions,
  districts,
  municipalities,
  onSubmit,
  isFetching,
  properties,
  userFilters,
  user,
}: Props) {
  "use no memo";
  const searchParams = useSearchParams();
  const { setConfigTabState, activeTab, setActiveTab } = useFilterDialog();

  const defaultValues = useMemo<AdvertisementFilterFormValues>(() => {
    return getFilterFormDefaultValues(searchParams, properties);
  }, [searchParams, properties]);

  const form = useControlledForm<AdvertisementFilterFormValues>({
    schema: ADVERTISEMENTS_FILTER_SCHEMA,
    defaultValues,
  });

  const t = useTranslations("translations.advertisement_list");

  return (
    <CredenzaContent className="max-w-3xl pb-8 bottom-0 h-auto md:overflow-y-auto md:h-min md:max-h-[calc(100dvh-2rem)]">
      <CredenzaHeader>
        <CredenzaTitle className="text-2xl flex gap-2 items-center">
          {t("filter.title")}
          {!user && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Icons.info className="h-5 w-5" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <span>{t("filter.login_to_save")}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CredenzaTitle>
      </CredenzaHeader>
      <CredenzaBody className="overflow-y-auto">
        <Tabs
          defaultValue="account"
          className="w-full"
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as (typeof TABS)[keyof typeof TABS]);
            if (value === TABS.FILTER) {
              setConfigTabState("view");
            }
          }}
        >
          <TabsList className="w-full mb-2">
            <TabsTrigger value={TABS.FILTER}>
              {t("tabs.filter.title")}
            </TabsTrigger>
            {user ? (
              <TabsTrigger value={TABS.CONFIG}>
                {t("tabs.config.title")}
              </TabsTrigger>
            ) : null}
          </TabsList>
          <TabsContent value={TABS.FILTER}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FilterTab
                  form={form}
                  regions={regions}
                  districts={districts}
                  municipalities={municipalities}
                  isFetching={isFetching}
                  properties={properties}
                  user={user}
                />
              </form>
            </Form>
          </TabsContent>
          <TabsContent value={TABS.CONFIG}>
            <ConfigTab userFilters={userFilters} />
          </TabsContent>
        </Tabs>
      </CredenzaBody>
    </CredenzaContent>
  );
}
