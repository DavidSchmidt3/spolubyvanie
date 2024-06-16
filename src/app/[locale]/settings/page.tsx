import Container from "@/app/[locale]/_components/common/container";
import SettingsForm from "@/app/[locale]/_components/settings/form";
import { getSettings } from "@/lib/utils/data/settings";
import { getUser } from "@/lib/utils/data/user";
import { pick } from "lodash";
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
      messages={pick(messages, [
        "translations.common",
        "translations.settings",
        "translations.errors",
      ])}
    >
      <Container>
        <SettingsForm userSettings={userSettings} user={user} />
      </Container>
    </NextIntlClientProvider>
  );
}
