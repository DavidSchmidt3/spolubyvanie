"use client";
import DetailsCard from "@/app/[locale]/_components/add-advertisement/details-card";
import GeneralCard from "@/app/[locale]/_components/add-advertisement/general-card";
import LocationCard from "@/app/[locale]/_components/add-advertisement/location-card";
import PhotosUploadCard from "@/app/[locale]/_components/add-advertisement/photos-upload-card";
import Container from "@/app/[locale]/_components/common/container";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Form } from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import {
  useConditionalTrigger,
  usePersistedControlledForm,
} from "@/hooks/form";
import { addAdvertisement } from "@/lib/data/actions/add-advertisement";
import {
  ADVERTISEMENT_ADD_SCHEMA,
  type AdvertisementAddFormValues,
} from "@/lib/data/actions/add-advertisement/schema";
import {
  type District,
  type Municipality,
  type Region,
} from "@/lib/data/administrative-divisions";
import { AdType } from "@/lib/data/advertisements/types";
import { useRouter } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useMemo } from "react";

type Props = {
  regions: Region[];
  districts: District[];
  municipalities: Municipality[];
};

export default function AddAdvertisementForm({
  regions,
  districts,
  municipalities,
}: Props) {
  "use no memo";
  const t = useTranslations("translations.add_advertisement");
  const { execute, isExecuting, result, hasErrored, hasSucceeded } =
    useAction(addAdvertisement);
  const { toast } = useToast();
  const router = useRouter();

  function getNumericProps(min?: string) {
    return {
      type: "number",
      inputMode: "numeric",
      min,
      pattern: "[0-9]*",
    } as React.InputHTMLAttributes<HTMLInputElement>;
  }

  const defaultValues = useMemo<AdvertisementAddFormValues>(() => {
    return {
      municipality: "",
      region: "",
      district: "",
      price: "",
      advertisement_type: "",
      street: "",
      apartment_area: "",
      apartment_rooms: "",
      room_area: "",
      floor: "",
      max_floor: "",
      description: "",
      available_from: new Date(),
      primary_photo: "",
      photos: [],
      title: "",
    };
  }, []);

  const form = usePersistedControlledForm<AdvertisementAddFormValues>({
    schema: ADVERTISEMENT_ADD_SCHEMA,
    defaultValues,
    name: "add-advertisement",
    excludedFields: ["primary_photo", "photos", "available_from"],
  });

  function onSubmit(data: AdvertisementAddFormValues) {
    execute(data);
  }

  useEffect(() => {
    if (hasErrored) {
      toast({
        title: "alerts.add_advertisement.save.error.title",
        description: result.validationErrors ?? result.serverError,
        variant: "destructive",
      });
    }

    if (hasSucceeded) {
      toast({
        title: "alerts.add_advertisement.save.success.title",
        variant: "success",
      });
      router.push({
        pathname: "/[page]",
        params: { page: "1" },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, hasErrored, hasSucceeded]);

  const advertisementType = form.watch("advertisement_type");
  const parsedAdvertisementType = parseInt(advertisementType) as AdType;
  const isOffering = parsedAdvertisementType === AdType.OfferingRoom;
  const isPending = form.formState.isSubmitting || isExecuting;

  useConditionalTrigger({
    form,
    watchField: "max_floor",
    triggerField: "floor",
  });
  useConditionalTrigger({
    form,
    watchField: "apartment_area",
    triggerField: "room_area",
  });

  return (
    <Container className="p-1 sm:py-3" fullWidth>
      <h1 className="text-2xl font-bold text-center sm:text-3xl">
        {t("title")}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className={`grid grid-cols-1 gap-2 mx-4 mt-4 gap-y-4 sm:gap-4 md:grid-cols-2 xl:${
              isOffering ? "grid-cols-3" : "grid-cols-2"
            }`}
          >
            <GeneralCard form={form} getNumericProps={getNumericProps} />
            <LocationCard
              form={form}
              municipalities={municipalities}
              isOffering={isOffering}
              districts={districts}
              regions={regions}
            />
            {isOffering && (
              <>
                <DetailsCard form={form} getNumericProps={getNumericProps} />
                <PhotosUploadCard form={form} />
              </>
            )}
          </div>
          <div className="flex flex-col mx-4 mt-8">
            <Button type="submit" className="w-full" variant="ringHover">
              {isPending && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin p" />
              )}
              {t("submit.button")}
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  );
}
