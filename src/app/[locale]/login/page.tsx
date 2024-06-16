import Container from "@/app/[locale]/_components/common/container";
import UserAuthForm from "@/app/[locale]/_components/login/form";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const messages = await getMessages();
  const t = await getTranslations("translations");
  return (
    <Container>
      <div className="container relative flex-col h-full items-center justify-center flex px-5 sm:px-8">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full sm:w-[350px] max-w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("login.label")}
            </h1>
          </div>
          <NextIntlClientProvider
            messages={pick(messages, ["translations.login", "alerts.login"])}
          >
            <UserAuthForm />
          </NextIntlClientProvider>
        </div>
      </div>
    </Container>
  );
}
