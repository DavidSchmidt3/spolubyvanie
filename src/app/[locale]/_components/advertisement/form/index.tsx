"use client";
import AdditionalDetailsCard from "@/app/[locale]/_components/advertisement/form/additional-details-card";
import FlatDetailsCard from "@/app/[locale]/_components/advertisement/form/details-card";
import GeneralCard from "@/app/[locale]/_components/advertisement/form/general-card";
import AddAdvertisementLoading from "@/app/[locale]/_components/advertisement/form/loading";
import LocationCard from "@/app/[locale]/_components/advertisement/form/location-card";
import PhotosUploadCard from "@/app/[locale]/_components/advertisement/form/photos-upload-card";
import Container from "@/app/[locale]/_components/common/container";
import { Button } from "@/app/[locale]/_components/ui/button";
import PersistedForm from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import { useAdvertisementType } from "@/hooks/advertisement-type";
import { usePersistedForm } from "@/hooks/form";
import { upsertAdvertisement } from "@/lib/data/actions/upsert-advertisement";
import {
  ADVERTISEMENT_UPSERT_SCHEMA,
  type AdvertisementUpsertFormValues,
} from "@/lib/data/actions/upsert-advertisement/schema";
import {
  type District,
  type Municipality,
  type Region,
} from "@/lib/data/administrative-divisions";
import { getFormDefaultValues } from "@/lib/data/advertisement/format";
import { type Property } from "@/lib/data/advertisements-properties";
import { dataUrlToFile, type Photo } from "@/lib/utils";
import { type Locale } from "@/lib/utils/localization/i18n";
import { useRouter } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useMemo, useTransition } from "react";

type PropsBase = {
  regions: Region[];
  districts: District[];
  municipalities: Municipality[];
  properties: Property[];
  locale: Locale;
};

type EditProps = PropsBase & {
  isEdit: true;
  initialDefaultValues: AdvertisementUpsertFormValues;
  photos?: Photo[];
};

type CreateProps = PropsBase & {
  isEdit?: false;
};

export default function AdvertisementForm({
  regions,
  districts,
  municipalities,
  properties,
  locale,
  isEdit = false,
  ...props
}: EditProps | CreateProps) {
  "use no memo";
  const t = useTranslations("translations");
  const { execute, isExecuting, result, hasErrored, hasSucceeded } =
    useAction(upsertAdvertisement);
  const { toast } = useToast();
  const router = useRouter();
  const [isRoutingPending, startTransition] = useTransition();

  function getNumericProps(min?: string) {
    return {
      type: "number",
      inputMode: "numeric",
      min,
      pattern: "[0-9]*",
    } as React.InputHTMLAttributes<HTMLInputElement>;
  }

  async function initializePhotos() {
    if (isEdit) {
      const photosBase64String = (props as EditProps).photos;
      if (!photosBase64String) {
        return;
      }

      const photos = photosBase64String
        ?.map((photo) => dataUrlToFile(photo))
        .filter((photo) => !!photo);

      form.setValue("photos", photos);
    }
  }

  const defaultValues = useMemo<AdvertisementUpsertFormValues>(() => {
    if (isEdit) {
      return (props as EditProps).initialDefaultValues;
    }
    return getFormDefaultValues(locale, properties);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, form, persistConfig, resetPersistedValues } =
    usePersistedForm({
      name: "add_advertisement",
      exclude: ["photos", "primary_photo", "available_from"],
      defaultValues,
      schema: ADVERTISEMENT_UPSERT_SCHEMA,
      skipPersist: isEdit,
    });

  useEffect(() => {
    void initializePhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  function onSubmit(data: AdvertisementUpsertFormValues) {
    execute(data);
  }

  useEffect(() => {
    if (hasErrored) {
      toast({
        title: isEdit
          ? "alerts.add_advertisement.save.edit.error.title"
          : "alerts.add_advertisement.save.add.error.title",
        description: result.validationErrors ?? result.serverError,
        variant: "error",
      });
    }

    if (hasSucceeded) {
      toast({
        title: isEdit
          ? "alerts.add_advertisement.save.edit.success.title"
          : "alerts.add_advertisement.save.add.success.title",
        variant: "success",
      });
      resetPersistedValues();
      startTransition(() => {
        router.push({
          pathname: "/my-advertisements/[page]",
          params: { page: "1" },
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, hasErrored, hasSucceeded]);

  const advertisementType = form.watch("advertisement_type");
  const isOffering = useAdvertisementType(advertisementType);
  const isPending = form.formState.isSubmitting || isExecuting;

  if (isLoading) {
    return <AddAdvertisementLoading />;
  }

  return (
    <Container
      className="p-1 sm:py-3"
      fullWidth
      data-pending={isRoutingPending}
    >
      <h1 className="text-2xl font-bold text-center sm:text-3xl">
        {isEdit ? t("edit_advertisement.title") : t("add_advertisement.title")}
      </h1>
      <PersistedForm
        persistConfig={persistConfig}
        onSubmit={onSubmit}
        skipPersist={isEdit}
      >
        <div
          className={`grid grid-cols-1 gap-2 mx-4 mt-4 gap-y-4 sm:gap-4 md:grid-cols-2 ${
            isOffering ? "xl:grid-cols-3" : "xl:grid-cols-2"
          }`}
        >
          <GeneralCard
            adTypeSelectDisabled={isEdit}
            getNumericProps={getNumericProps}
            isOffering={isOffering}
          />
          <LocationCard
            municipalities={municipalities}
            isOffering={isOffering}
            districts={districts}
            regions={regions}
          />
          {isOffering && (
            <>
              <FlatDetailsCard getNumericProps={getNumericProps} />
              <AdditionalDetailsCard properties={properties} />
            </>
          )}
          <PhotosUploadCard />
        </div>
        <div className="flex flex-col mx-4 mt-8">
          <Button type="submit" className="w-full" variant="ringHover">
            {isPending && (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin p" />
            )}
            {isEdit
              ? t("edit_advertisement.submit.button")
              : t("add_advertisement.submit.button")}
          </Button>
        </div>
      </PersistedForm>
    </Container>
  );
}
