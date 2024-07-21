import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/[locale]/_components/ui/card";
import { type Advertisement as AdvertisementType } from "@/lib/data/advertisements";
import { getImageFullUrl } from "@/lib/utils/supabase";
import Image from "next/image";

type Props = {
  advertisement: AdvertisementType;
};

export default function Advertisement({ advertisement }: Props) {
  const {
    price,
    title,
    description,
    street,
    primary_photo_url,
    municipality,
    district,
    region,
  } = advertisement;

  return (
    <Card className="w-full h-auto p-6">
      <CardHeader className="p-0 pb-2">
        <h3 className="text-3xl font-bold text-center">{title}</h3>
      </CardHeader>
      <CardContent className="grid p-3 pt-3 grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 w-full">
        <div className="w-full relative">
          <Image
            src={
              primary_photo_url
                ? getImageFullUrl(primary_photo_url)
                : "/room.webp"
            }
            alt="Advertisement"
            width="1440"
            height="1080"
            className="rounded-lg"
          />
        </div>
        <div className="grid grid-rows-1 grid-cols-1 xl:grid-cols-2 gap-4 relative">
          <p className="text-wrap break-words">{description}</p>
          <div className="flex flex-col gap-y-3">
            <div className="flex justify-between text-xl gap-x-8">
              <p>Cena:</p>
              <span className="font-bold text-right">{price} €</span>
            </div>
            <div className="flex justify-between text-xl gap-x-8">
              <p>Ulica:</p>
              <span className="font-bold text-right">{street}</span>
            </div>
            <div className="flex justify-between text-xl gap-x-8">
              <p>Obec:</p>
              <span className="font-bold text-right">{municipality}</span>
            </div>
            <div className="flex justify-between text-xl gap-x-8">
              <p>Okres:</p>
              <span className="font-bold text-right">{district}</span>
            </div>
            <div className="flex justify-between text-xl gap-x-8">
              <p>Kraj:</p>
              <div className="font-bold text-right break-words overflow-hidden">
                {region}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
