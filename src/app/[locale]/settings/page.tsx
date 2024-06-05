import Container from "@/app/[locale]/_components/common/container";
import SettingsForm from "@/app/[locale]/_components/forms/settings-form";
import { api } from "@/trpc/server";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function SettingsPage() {
  const messages = await getMessages();
  const userQuery = await api.userSettings.get(
    "cfc7134f-59be-4bde-a76f-0692e8724ac6"
  );

  return (
    <NextIntlClientProvider messages={pick(messages, ["common", "settings"])}>
      <Container>
        <SettingsForm userQuery={userQuery} />
      </Container>
    </NextIntlClientProvider>
  );
}
