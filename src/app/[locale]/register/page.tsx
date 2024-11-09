import FormShell from "@/app/[locale]/_components/form/shell";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";
import UserRegisterForm from "@/app/[locale]/_components/register/form";
import { LOCALES, type Locale } from "@/lib/utils/localization/i18n";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <FormShell title="translations.register.label">
      <NextIntlClientProvider
        messages={[
          "translations.register",
          "translations.auth",
          "alerts.register",
          "alerts.auth",
        ]}
      >
        <UserRegisterForm />
      </NextIntlClientProvider>
    </FormShell>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("register.title"),
    description: t("register.description"),
  };
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
