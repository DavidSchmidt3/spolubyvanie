import Container from "@/app/[locale]/_components/common/container";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("translations");
  return (
    <Container>
      <h1 className="text-xl">
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
