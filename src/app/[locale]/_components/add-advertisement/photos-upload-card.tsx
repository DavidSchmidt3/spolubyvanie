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
import { type AdvertisementAddFormValues } from "@/lib/data/actions/add-advertisement/schema";
import { useTranslations } from "next-intl";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<AdvertisementAddFormValues>;
};

export default function PhotosUploadCard({ form }: Props) {
  const t = useTranslations("translations.add_advertisement");

  return (
    <Card className="col-span-1 md:col-span-2 xl:col-span-3">
      <CardHeader>
        <CardTitle>{t("photos.title")}</CardTitle>
        <CardDescription className="text-base">
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
                    onValueChange={(files: File[]) => {
                      field.onChange(files);
                      const primaryPhoto = form.getValues("primary_photo");
                      if (!primaryPhoto && files.length) {
                        form.setValue("primary_photo", files[0]!.name);
                      }
                      if (
                        primaryPhoto &&
                        !files.some((file) => file.name === primaryPhoto)
                      ) {
                        form.setValue("primary_photo", files[0]?.name ?? "");
                      }
                    }}
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
