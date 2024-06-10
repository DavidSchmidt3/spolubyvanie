import Container from "@/app/[locale]/_components/common/container";
import { useTranslations } from "next-intl";

export default function ErrorPage() {
  const t = useTranslations("common");
  return <Container>{t("error.label")}</Container>;
}
