import Container from "@/app/[locale]/_components/common/container";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";
import SettingsForm from "@/app/[locale]/_components/settings/form";
import { getSettings } from "@/lib/data/settings";
import { getUser } from "@/lib/data/user";

export default async function SettingsPage() {
  const [userSettings, user] = await Promise.all([getSettings(), getUser()]);

  return (
    <NextIntlClientProvider
      messages={[
        "translations.common",
        "translations.settings",
        "alerts.settings",
      ]}
    >
      <Container>
        <SettingsForm userSettings={userSettings} user={user} />
      </Container>
    </NextIntlClientProvider>
  );
}
