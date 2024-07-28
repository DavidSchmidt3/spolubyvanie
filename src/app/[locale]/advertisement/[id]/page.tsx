import Advertisement from "@/app/[locale]/_components/advertisement";
import { getAdvertisement } from "@/lib/data/advertisement";

type Props = {
  params: {
    id: string;
  };
};

export default async function AdvertisementPage({ params }: Props) {
  const { id } = params;
  const advertisement = await getAdvertisement(id);
  if (!advertisement) {
    // return redirect("not-found"); // TODO: Create not-found page
    return <div>Not found</div>;
  }

  return <Advertisement advertisement={advertisement} />;
}
