import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/[locale]/_components/ui/card";
import { FileUploader } from "@/app/[locale]/_components/ui/file-uploader";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { useTranslations } from "next-intl";
import { useFormContext, type ControllerRenderProps } from "react-hook-form";

export default function PhotosUploadCard() {
  const form = useFormContext<AdvertisementUpsertFormValues>();
  const t = useTranslations("translations.add_advertisement");

  function onFilesUpload(
    files: File[],
    field: ControllerRenderProps<AdvertisementUpsertFormValues, "photos">
  ) {
    field.onChange(files);
    const primaryPhoto = form.getValues("primary_photo");
    if (!primaryPhoto && files.length) {
      form.setValue("primary_photo", files[0]!.name);
    }
    if (primaryPhoto && !files.some((file) => file.name === primaryPhoto)) {
      form.setValue("primary_photo", files[0]?.name ?? "");
    }
  }

  return (
    <Card className="col-span-1 md:col-span-2 xl:col-span-3">
      <CardHeader>
        <CardTitle>{t("photos.title")}</CardTitle>
        <CardDescription className="text-base whitespace-pre text-wrap">
          {t("photos.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="photos"
          render={({ field }) => (
            <div className="space-y-6">
              <FormItem className="w-full">
                <FormControl>
                  <FileUploader
                    maxFiles={10}
                    maxSize={4 * 1024 * 1024}
                    control={form.control}
                    compressionQuality={0.3}
                    value={field.value}
                    onValueChange={(files: File[]) =>
                      onFilesUpload(files, field)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}
