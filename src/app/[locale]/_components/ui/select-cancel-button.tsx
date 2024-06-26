import { Button } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";

type Props = {
  onCancel: (value?: string) => void;
};

export default function SelectCancelButton({ onCancel }: Props) {
  return (
    <Button
      variant="ghost"
      className="w-8 h-8 p-1"
      onClick={() => {
        onCancel(undefined);
      }}
    >
      <Icons.cross />
    </Button>
  );
}
