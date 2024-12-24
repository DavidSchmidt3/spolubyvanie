import FormShell from "@/app/[locale]/_components/form/shell";
import PasswordChangeForm from "@/app/[locale]/_components/password-change/form";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";
import { LOCALES } from "@/lib/utils/localization/i18n";

export default function PasswordChange() {
  return (
    <FormShell title="translations.password_change.title">
      <NextIntlClientProvider
        messages={[
          "translations.password_change",
          "translations.auth",
          "alerts.password_change",
          "alerts.auth",
        ]}
      >
        <PasswordChangeForm />
      </NextIntlClientProvider>
    </FormShell>
  );
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
