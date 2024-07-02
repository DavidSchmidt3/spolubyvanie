import { Button } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type Props = {
  onCancel: (value?: string | null) => void;
  className?: string;
};

export default function SelectCancelButton({ onCancel, className }: Props) {
  const t = useTranslations("translations");
  return (
    <Button
      variant="ghost"
      aria-label={t("common.cancel.label")}
      className={cn("w-8 h-8 p-1", className)}
      onClick={() => onCancel()}
    >
      <Icons.cross />
    </Button>
  );
}
