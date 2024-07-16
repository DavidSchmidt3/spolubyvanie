"use client";
import AdministrativeDivisionSelect from "@/app/[locale]/_components/add-advertisement/administrative-division-select";
import AvailableFromField from "@/app/[locale]/_components/add-advertisement/available-from-field";
import DescriptionField from "@/app/[locale]/_components/add-advertisement/description-field";
import TextField from "@/app/[locale]/_components/add-advertisement/text-field";
import Container from "@/app/[locale]/_components/common/container";
import { AdvertisementTypeFilter } from "@/app/[locale]/_components/home/filter/advertisement-type-filter";
import { Button } from "@/app/[locale]/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/[locale]/_components/ui/card";
import { FileUploader } from "@/app/[locale]/_components/ui/file-uploader";
import { Form } from "@/app/[locale]/_components/ui/form";
import { useControlledForm } from "@/hooks/form";
import {
  ADVERTISEMENT_ADD_SCHEMA,
  type AdvertisementAddFormValues,
} from "@/lib/data/actions/add-advertisement/schema";
import {
  type District,
  type Municipality,
  type Region,
} from "@/lib/data/administrative-divisions";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

type Props = {
  regions: Region[];
  districts: District[];
  municipalities: Municipality[];
};

function getNumericProps(min?: string) {
  return {
    type: "number",
    inputMode: "numeric",
    min,
    pattern: "[0-9]*",
  } as React.InputHTMLAttributes<HTMLInputElement>;
}

export default function AddAdvertisementForm({
  regions,
  districts,
  municipalities,
}: Props) {
  "use no memo";
  const t = useTranslations("translations.add_advertisement");

  const defaultValues = useMemo<AdvertisementAddFormValues>(() => {
    return {
      municipality: "",
      region: "",
      district: "",
      price: "",
      advertisement_type: "",
      street: "",
      apartment_area: "",
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

  const form = useControlledForm<AdvertisementAddFormValues>({
    schema: ADVERTISEMENT_ADD_SCHEMA,
    defaultValues,
  });

  function onSubmit(data: AdvertisementAddFormValues) {
    console.log(data);
  }

  return (
    <Container className="p-1 sm:py-3" fullWidth>
      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        {t("title")}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="gap-y-4 mx-4 mt-4 grid gap-2 sm:gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{t("location.title")}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-2">
                <AdministrativeDivisionSelect
                  form={form}
                  regions={regions}
                  districts={districts}
                  municipalities={municipalities}
                />
                <TextField
                  control={form.control}
                  name="street"
                  placeholder={t("form.street.placeholder")}
                  label={t("form.street.label")}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("general.title")}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-2">
                <AdvertisementTypeFilter form={form} />
                <AvailableFromField control={form.control} />
                <TextField
                  control={form.control}
                  name="price"
                  inputProps={getNumericProps()}
                  label={t("form.price.label")}
                  placeholder={t("form.price.placeholder")}
                />
                <TextField
                  control={form.control}
                  name="title"
                  label={t("form.title.label")}
                  placeholder={t("form.title.placeholder")}
                />
                <DescriptionField control={form.control} />
              </CardContent>
            </Card>
            <Card className="md:col-span-2 xl:col-span-1">
              <CardHeader>
                <CardTitle>{t("details.title")}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                  <TextField
                    control={form.control}
                    name="room_area"
                    inputProps={getNumericProps("1")}
                    placeholder={t("form.room_area.placeholder")}
                    label={t("form.room_area.label")}
                  />
                  <TextField
                    control={form.control}
                    name="apartment_area"
                    inputProps={getNumericProps("1")}
                    placeholder={t("form.apartment_area.placeholder")}
                    label={t("form.apartment_area.label")}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                  <TextField
                    control={form.control}
                    name="floor"
                    inputProps={getNumericProps("0")}
                    placeholder={t("form.floor.placeholder")}
                    label={t("form.floor.label")}
                  />
                  <TextField
                    control={form.control}
                    name="max_floor"
                    inputProps={getNumericProps("0")}
                    placeholder={t("form.max_floor.placeholder")}
                    label={t("form.max_floor.label")}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-2 xl:col-span-3">
              <CardHeader>
                <CardTitle>{t("photos.title")}</CardTitle>
                <CardDescription className="text-base">
                  {t("photos.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploader
                  maxFiles={4}
                  maxSize={4 * 1024 * 1024}
                  onUpload={async (files: File[]) => {
                    console.log(files);
                  }}
                />
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col mx-4 mt-8">
            <Button type="submit" className="w-full" variant="ringHover">
              {t("submit.button")}
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  );
}
