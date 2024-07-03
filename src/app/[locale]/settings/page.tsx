import Container from "@/app/[locale]/_components/common/container";
import SettingsForm from "@/app/[locale]/_components/settings/form";
import { getSettings } from "@/lib/data/settings";
import { getUser } from "@/lib/data/user";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function SettingsPage() {
  const [messages, userSettings, user] = await Promise.all([
    getMessages(),
    getSettings(),
    getUser(),
  ]);

  return (
    <NextIntlClientProvider
      messages={pickLocaleMessages(messages, [
        "translations.common",
        "translations.settings",
        "alerts.settings",
      ])}
    >
      <Container>
        <SettingsForm userSettings={userSettings} user={user} />
      </Container>
    </NextIntlClientProvider>
  );
}
