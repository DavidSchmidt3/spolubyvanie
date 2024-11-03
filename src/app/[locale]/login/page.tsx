import UserAuthForm from "@/app/[locale]/_components/login/form";
import LoginShell from "@/app/[locale]/_components/login/shell";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-client-provider";
import { getMessages, getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default function LoginPage() {
  // await connection();
  // const { locale } = await params;

  // setRequestLocale(locale);
  const messages = getMessages();
  const t = getTranslations("translations");

  return (
    <LoginShell promiseT={t}>
      <Suspense fallback={<div>Loading...</div>}>
        <NextIntlClientProvider
          messagesLocal={[
            "translations.auth",
            "translations.login",
            "alerts.login",
            "alerts.auth",
          ]}
          messagesPromise={messages}
        >
          <UserAuthForm />
        </NextIntlClientProvider>
      </Suspense>
    </LoginShell>
  );
}

// export async function generateMetadata(props: Props) {
//   await connection();
//   const params = await props.params;

//   const { locale } = params;

//   const t = await getTranslations({ locale, namespace: "metadata" });

//   return {
//     title: t("login.title"),
//     description: t("login.description"),
//   };
// }

// export function generateStaticParams() {
//   return LOCALES.map((locale) => ({ locale: locale.code }));
// }
