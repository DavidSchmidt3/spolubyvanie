import Container from "@/app/[locale]/_components/common/container";
import TransitionLink from "@/app/[locale]/_components/navigation/transition-link";
import { LOCALES } from "@/lib/utils/localization/i18n";
import { useTranslations } from "next-intl";

export default function ErrorPage() {
  const t = useTranslations("translations");

  return (
    <Container className="text-center">
      <h1 className="text-3xl">{t("common.error.label")}</h1>
      <div className="mt-5"></div>
      <TransitionLink
        href={{
          pathname: "/[page]",
          params: { page: "1" },
        }}
        className="underline hover:text-primary text-xl"
      >
        {t("common.error.redirect_home")}
      </TransitionLink>
    </Container>
  );
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
