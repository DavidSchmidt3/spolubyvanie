import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("translations");
  return <main>{t("navigation.home.label")}</main>;
}
