import ImageGallery from "@/app/[locale]/_components/advertisement/image-gallery";
import InfoCard from "@/app/[locale]/_components/advertisement/info-card";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/[locale]/_components/ui/card";
import { type Advertisement } from "@/lib/data/advertisements/format";
import { type Locale } from "@/lib/utils/localization/i18n";

type Props = {
  advertisement: Advertisement;
  locale: Locale;
};

export default function Advertisement({ advertisement, locale }: Props) {
  const { title, description, advertisement_photos } = advertisement;

  return (
    <Card className="w-full h-auto p-6 rounded-none">
      <CardHeader className="p-0 pb-2 flex-col gap-y-2  items-center relative justify-between">
        <h3 className="text-3xl font-bold text-center">{title}</h3>
      </CardHeader>
      <CardContent className="p-4 sm:p-8 flex flex-col gap-4 sm:gap-6 xl:gap-8 w-full">
        <p className="text-wrap break-words text-justify">{description}</p>
        <InfoCard advertisement={advertisement} locale={locale} />
        <div className="flex justify-center w-full mt-8">
          <div className="w-full max-w-4xl">
            {advertisement_photos.length ? (
              <ImageGallery photoUrls={advertisement_photos} />
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
