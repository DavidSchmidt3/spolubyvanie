import Container from "@/app/[locale]/_components/common/container";
import PasswordChangeForm from "@/app/[locale]/_components/password-change/form";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

export default async function PasswordChange() {
  const messages = await getMessages();
  const t = await getTranslations("translations");

  return (
    <Container>
      <div className="container relative flex flex-col items-center justify-center h-full px-5 sm:px-8">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full sm:w-[350px] max-w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("password_change.title")}
            </h1>
          </div>
          <NextIntlClientProvider
            messages={pickLocaleMessages(messages, [
              "translations.password_change",
              "translations.auth",
              "alerts.password_change",
              "alerts.auth",
            ])}
          >
            <PasswordChangeForm />
          </NextIntlClientProvider>
        </div>
      </div>
    </Container>
  );
}
