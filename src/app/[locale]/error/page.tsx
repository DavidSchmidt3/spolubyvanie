import Container from "@/app/[locale]/_components/common/container";
import { useTranslations } from "next-intl";

export default function ErrorPage() {
  const t = useTranslations("translations");
  return <Container>{t("common.error.label")}</Container>;
}
