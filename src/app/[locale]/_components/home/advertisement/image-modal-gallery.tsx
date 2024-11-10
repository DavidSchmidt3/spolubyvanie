import ImageGallery from "@/app/[locale]/_components/advertisement/image-gallery";
import DetailButton from "@/app/[locale]/_components/home/advertisement/detail-button";
import {
  Credenza,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/app/[locale]/_components/ui/credenza";
import { useMediaQuery } from "@/hooks/media-query";
import { type Advertisement } from "@/lib/data/advertisements/format";
import { useTranslations } from "next-intl";

type Props = {
  advertisement: Advertisement;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function ImageModalGallery({
  advertisement,
  open,
  setOpen,
}: Props) {
  const t = useTranslations("translations.advertisement");
  const isBiggerThanSm = useMediaQuery("sm");

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaContent className="max-w-3xl rounded-md px-4 md:overflow-y-auto md:h-min md:max-h-[calc(100dvh-2rem)]">
        <CredenzaHeader>
          <CredenzaTitle className="text-lg font-bold text-center">
            {advertisement.title}
          </CredenzaTitle>
        </CredenzaHeader>
        <ImageGallery
          photoUrls={advertisement.advertisement_photos}
          primaryPhotoUrl={advertisement.primary_photo_url}
          showFullscreenButton={isBiggerThanSm}
        />
        <CredenzaFooter className="flex-row justify-center w-full sm:justify-center">
          <DetailButton
            id={advertisement.id}
            text={t("show_full_advertisement.link")}
          />
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
