import TransitionLink from "@/app/[locale]/_components/navigation/transition-link";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { type Advertisement as AdvertisementType } from "@/lib/data/advertisements/format";

type Props = {
  id: AdvertisementType["id"];
  text: string;
};

export default function DetailButton({ id, text }: Props) {
  return (
    <TransitionLink
      href={{
        pathname: "/advertisement/[id]",
        params: { id },
      }}
      className=""
    >
      <Button
        className="flex items-center max-w-full gap-x-2 text-wrap"
        variant="ringHover"
      >
        <Icons.magnifier className="w-8 h-8 sm:w-10 sm:h-10" />
        <p className="font-bold">{text}</p>
      </Button>
    </TransitionLink>
  );
}
