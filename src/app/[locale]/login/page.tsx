import UserAuthForm from "@/app/[locale]/_components/login/form";
import LoginShell from "@/app/[locale]/_components/login/shell";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";

export default function LoginPage() {
  // await connection();
  // const { locale } = await params;

  // setRequestLocale(locale);

  return (
    <LoginShell>
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
