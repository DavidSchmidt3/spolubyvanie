import { Button } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useTranslations } from "next-intl";

type Props = {
  onCancel: (value?: string) => void;
};

export default function SelectCancelButton({ onCancel }: Props) {
  const t = useTranslations("translations");
  return (
    <Button
      variant="ghost"
      aria-label={t("common.cancel.label")}
      className="w-8 h-8 p-1"
      onClick={() => {
        onCancel(undefined);
      }}
    >
      <Icons.cross />
    </Button>
  );
}
