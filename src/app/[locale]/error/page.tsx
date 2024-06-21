import Container from "@/app/[locale]/_components/common/container";
import { LOCALES, type Locale } from "@/lib/utils/localization/i18n";
import { Link } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: {
    locale: Locale;
  };
};

export const dynamic = "force-static";
export default function ErrorPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("translations");
  return (
    <Container className="text-center">
      <h1 className="text-2xl">{t("common.error.label")}</h1>
      <div className="mt-5"></div>
      <Link href="/" className="underline hover:text-primary text-xl">
        {t("common.error.redirect_home")}
      </Link>
    </Container>
  );
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("error.title"),
    description: t("error.description"),
  };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
