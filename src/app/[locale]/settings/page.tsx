import Container from "@/app/[locale]/_components/common/container";
import SettingsForm from "@/app/[locale]/_components/forms/settings-form";
import { api } from "@/trpc/server";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function SettingsPage() {
  const [messages, userSettings, user] = await Promise.all([
    getMessages(),
    api.userSettings.get(),
    api.user.get(),
  ]);

  return (
    <NextIntlClientProvider
      messages={pick(messages, ["common", "settings", "errors"])}
    >
      <Container>
        <SettingsForm userSettings={userSettings} user={user} />
      </Container>
    </NextIntlClientProvider>
  );
}
