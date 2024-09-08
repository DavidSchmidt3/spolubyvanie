import RoomsSlider from "@/app/[locale]/_components/advertisement/form/rooms-slider";
import TextField from "@/app/[locale]/_components/advertisement/form/text-field";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/[locale]/_components/ui/card";
import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { type Property } from "@/lib/data/advertisements-properties";
import { useTranslations } from "next-intl";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<AdvertisementUpsertFormValues>;
  getNumericProps: (
    min?: string
  ) => React.InputHTMLAttributes<HTMLInputElement>;
  properties: Property[];
};

export default function DetailsCard({ form, getNumericProps }: Props) {
  const t = useTranslations("translations.add_advertisement");

  return (
    <Card className="md:col-span-2 xl:col-span-1">
      <CardHeader>
        <CardTitle>{t("details.title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
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
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
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
        <div className="w-full col-span-2">
          <RoomsSlider
            control={form.control}
            label={t("form.apartment_rooms.label")}
          />
        </div>
      </CardContent>
    </Card>
  );
}
