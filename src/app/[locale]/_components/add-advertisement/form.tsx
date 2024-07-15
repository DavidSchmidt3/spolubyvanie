"use client";
import AdministrativeDivisionSelect from "@/app/[locale]/_components/add-advertisement/administrative-division-select";
import Container from "@/app/[locale]/_components/common/container";
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

export default function AddAdvertisementForm({
  regions,
  districts,
  municipalities,
}: Props) {
  "use no memo";
  const t = useTranslations("translations.add_advertisement");

  const defaultValues = useMemo<AdvertisementAddFormValues>(() => {
    return {
      user_id: "",
      municipality: "",
      region: "",
      district: "",
      price: "",
      type: "",
      street: "",
      apartment_area: "",
      room_area: "",
      floor: "",
      max_floor: "",
      description: "",
      available_from: new Date().toISOString(),
      primary_photo: "",
      photos: [],
      title: "",
    };
  }, []);

  const form = useControlledForm<AdvertisementAddFormValues>({
    schema: ADVERTISEMENT_ADD_SCHEMA,
    defaultValues,
  });

  return (
    <Container>
      <h1 className="text-2xl font-bold text-center">{t("title")}</h1>
      <Form {...form}>
        <form>
          <AdministrativeDivisionSelect
            form={form}
            regions={regions}
            districts={districts}
            municipalities={municipalities}
          />
        </form>
      </Form>
    </Container>
  );
}
