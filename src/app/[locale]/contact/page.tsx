import Container from "@/app/[locale]/_components/common/container";
import { LOCALES } from "@/lib/utils/localization/i18n";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("translations");
  return (
    <Container>
      <h1 className="text-xl text-center">
        {t("contact.title")}{" "}
        <a
          href="mailto:
        david.schmidt382001@gmail.com"
        >
          <b>david.schmidt382001@gmail.com</b>
        </a>
      </h1>
    </Container>
  );
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
