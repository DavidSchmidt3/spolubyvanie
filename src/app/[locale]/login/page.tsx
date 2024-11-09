import UserAuthForm from "@/app/[locale]/_components/login/form";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";
import { LOCALES, type Locale } from "@/lib/utils/localization/i18n";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { connection } from "next/server";
import FormShell from "../_components/form/shell";

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function LoginPage({ params }: Props) {
  await connection();
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <FormShell title="translations.login.label">
      <NextIntlClientProvider
        messages={[
          "translations.auth",
          "translations.login",
          "alerts.login",
          "alerts.auth",
        ]}
      >
        <UserAuthForm />
      </NextIntlClientProvider>
    </FormShell>
  );
}

export async function generateMetadata(props: Props) {
  await connection();
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("login.title"),
    description: t("login.description"),
  };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
