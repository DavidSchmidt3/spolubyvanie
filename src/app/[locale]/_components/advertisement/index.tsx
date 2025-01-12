import ContactForm from "@/app/[locale]/_components/advertisement/contact-form";
import ImageGallery from "@/app/[locale]/_components/advertisement/image-gallery";
import InfoCard from "@/app/[locale]/_components/advertisement/info-card";
import ViewCounter from "@/app/[locale]/_components/advertisement/view-counter";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/[locale]/_components/ui/card";
import { type Property } from "@/lib/data/advertisements-properties";
import { type Advertisement } from "@/lib/data/advertisements/format";
import { type Locale } from "@/lib/utils/localization/i18n";

type Props = {
  advertisement: Advertisement;
  locale: Locale;
  properties: Property[];
};

export default async function Advertisement({
  advertisement,
  locale,
  properties,
}: Props) {
  const { title, description, advertisement_photos } = advertisement;

  return (
    <>
      <ViewCounter advertisementId={advertisement.id} />
      <Card className="w-full h-auto p-6 rounded-none">
        <CardHeader className="relative flex-col items-center justify-between p-0 pb-2 gap-y-2">
          <h3 className="text-3xl font-bold text-center">{title}</h3>
        </CardHeader>
        <CardContent className="flex flex-col w-full gap-4 p-4 sm:p-8 sm:gap-6 xl:gap-8">
          <p className="text-justify break-words text-wrap">{description}</p>
          <InfoCard
            advertisement={advertisement}
            locale={locale}
            properties={properties}
          />
          <div className="flex justify-center w-full mt-8">
            <div className="w-full max-w-4xl">
              {advertisement_photos.length ? (
                <ImageGallery
                  photoUrls={advertisement_photos}
                  primaryPhotoUrl={advertisement.primary_photo_url}
                />
              ) : null}
            </div>
          </div>
        </CardContent>
        <NextIntlClientProvider
          messages={["translations.advertisement", "alerts.advertisement"]}
        >
          <ContactForm
            userId={advertisement.user_id}
            advertisementTitle={advertisement.title}
          />
        </NextIntlClientProvider>
      </Card>
    </>
  );
}
