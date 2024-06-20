import Container from "@/app/[locale]/_components/common/container";
import UserRegisterForm from "@/app/[locale]/_components/register/form";
import {
  LOCALES,
  pickLocaleMessages,
  type Locale,
} from "@/lib/utils/localization/i18n";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";

type Props = {
  params: {
    locale: Locale;
  };
};

export const dynamic = "force-static";
export default async function RegisterPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("translations");

  return (
    <Container>
      <div className="container relative flex flex-col items-center justify-center h-full px-5 sm:px-8">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full sm:w-[350px] max-w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("register.label")}
            </h1>
          </div>
          <NextIntlClientProvider
            messages={pickLocaleMessages(messages, [
              "translations.register",
              "translations.auth",
              "alerts.register",
              "alerts.auth",
            ])}
          >
            <UserRegisterForm />
          </NextIntlClientProvider>
        </div>
      </div>
    </Container>
  );
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("register.title"),
    description: t("register.description"),
  };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
