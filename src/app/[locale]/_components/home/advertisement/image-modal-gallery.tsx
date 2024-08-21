import ImageGallery from "@/app/[locale]/_components/advertisement/image-gallery";
import DetailButton from "@/app/[locale]/_components/home/advertisement/detail-button";
import {
  Credenza,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/app/[locale]/_components/ui/credenza";
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
  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaContent className="max-w-3xl rounded-md px-4">
        <CredenzaHeader>
          <CredenzaTitle className="text-center text-lg font-bold">
            {advertisement.title}
          </CredenzaTitle>
        </CredenzaHeader>
        <ImageGallery
          photoUrls={advertisement.advertisement_photos}
          primaryPhotoUrl={advertisement.primary_photo_url}
        />
        <CredenzaFooter className="justify-center sm:justify-center flex-row w-full">
          <DetailButton
            id={advertisement.id}
            text={t("show_full_advertisement.link")}
          />
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
