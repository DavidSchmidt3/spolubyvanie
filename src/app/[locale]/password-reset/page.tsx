import Container from "@/app/[locale]/_components/common/container";
import PasswordResetForm from "@/app/[locale]/_components/password-reset/form";
import { LOCALES, type Language } from "@/lib/utils/localization/i18n";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";

type Props = {
  params: {
    locale: Language;
  };
};

export const dynamic = "force-static";
export default async function PasswordReset({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("translations");

  return (
    <Container>
      <div className="container relative flex flex-col items-center justify-center h-full px-5 sm:px-8">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full sm:w-[350px] max-w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("password_reset.title")}
            </h1>
          </div>
          <NextIntlClientProvider
            messages={pick(messages, [
              "translations.password_reset",
              "translations.auth",
              "alerts.password_reset",
              "alerts.auth",
            ])}
          >
            <PasswordResetForm />
          </NextIntlClientProvider>
        </div>
      </div>
    </Container>
  );
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("password_reset.title"),
    description: t("password_reset.description"),
  };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
