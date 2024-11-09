import FormShell from "@/app/[locale]/_components/form/shell";
import PasswordChangeForm from "@/app/[locale]/_components/password-change/form";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";

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
