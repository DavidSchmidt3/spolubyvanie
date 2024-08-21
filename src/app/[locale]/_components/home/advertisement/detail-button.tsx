import { Button } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { type Advertisement as AdvertisementType } from "@/lib/data/advertisements/format";
import { Link } from "@/lib/utils/localization/navigation";

type Props = {
  id: AdvertisementType["id"];
  text: string;
};

export default function DetailButton({ id, text }: Props) {
  return (
    <Link
      href={{
        pathname: "/advertisement/[id]",
        params: { id },
      }}
      className=""
      prefetch={false}
    >
      <Button
        className="flex items-center gap-x-2 max-w-full text-wrap"
        variant="ringHover"
      >
        <Icons.magnifier className="w-8 sm:w-10 h-8 sm:h-10" />
        <p className="font-bold">{text}</p>
      </Button>
    </Link>
  );
}
