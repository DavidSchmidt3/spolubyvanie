import FormShell from "@/app/[locale]/_components/form/shell";
import PasswordResetForm from "@/app/[locale]/_components/password-reset/form";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";
import { LOCALES, type Locale } from "@/lib/utils/localization/i18n";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function PasswordReset({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <FormShell title="translations.password_reset.title">
      <NextIntlClientProvider
        messages={[
          "translations.password_reset",
          "translations.auth",
          "alerts.password_reset",
          "alerts.auth",
        ]}
      >
        <PasswordResetForm />
      </NextIntlClientProvider>
    </FormShell>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("password_reset.title"),
    description: t("password_reset.description"),
  };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
