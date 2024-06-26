import { Button } from "@/app/[locale]/_components/ui/button";
import { useTranslations } from "next-intl";

export default function SubmitButton() {
  const t = useTranslations("translations.advertisement");
  return (
    <Button type="submit" variant="ringHover">
      {t("filter.button")}
    </Button>
  );
}
