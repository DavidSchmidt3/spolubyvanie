import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("translation");
  return <main>{t("navigation.home.label")}</main>;
}
