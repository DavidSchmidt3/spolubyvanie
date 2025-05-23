import Container from "@/app/[locale]/_components/common/container";
import { LOCALES } from "@/lib/utils/localization/i18n";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("translations");
  return (
    <Container className="h-dvh">
      <h1 className="text-xl text-center">
        {t("contact.title")}{" "}
        <a
          href="mailto:
        spolubyvanieinfo@gmail.com"
        >
          <b>spolubyvanieinfo@gmail.com</b>
        </a>
      </h1>
    </Container>
  );
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
