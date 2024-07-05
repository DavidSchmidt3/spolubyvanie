import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/[locale]/_components/ui/card";
import { type Advertisement as AdvertisementType } from "@/lib/data/advertisements";
import Image from "next/image";

type Props = {
  advertisement: AdvertisementType;
};

export default function Advertisement({ advertisement }: Props) {
  const { price, title, description, street, municipality, district, region } =
    advertisement;

  return (
    <Card className="w-full h-auto p-6">
      <CardHeader className="p-0 pb-2">
        <h3 className="text-3xl font-bold text-center">{title}</h3>
      </CardHeader>
      <CardContent className="grid p-3 pt-3 grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 w-full">
        <div className="w-full h-full relative">
          <Image
            src="/room.jpg"
            alt="Advertisement"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="grid grid-rows-1 xl:grid-cols-2 gap-4">
          <div>
            <p>{description}</p>
          </div>
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
              <span className="font-bold text-right">{region}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
