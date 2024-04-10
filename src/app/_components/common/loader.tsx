import { Icons } from "@/app/_components/ui/icons";
import { useTranslation } from "react-i18next";

export default function Loader() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-2 justify-center mt-6">
      <Icons.spinner className="h-8 w-8 animate-spin p" />
      <h3 className="text-xl">{t("common.loading.title")}</h3>
    </div>
  );
}
