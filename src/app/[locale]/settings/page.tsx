import Container from "@/app/[locale]/_components/common/container";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";
import SettingsForm from "@/app/[locale]/_components/settings/form";
import Loading from "@/app/[locale]/_components/settings/loading";
import { getSettings } from "@/lib/data/settings";
import { getUser } from "@/lib/data/user";
import { LOCALES } from "@/lib/utils/localization/i18n";
import { Suspense } from "react";

export default function SettingsPage() {
  const userSettingsPromise = getSettings();
  const userPromise = getUser();

  return (
    <NextIntlClientProvider
      messages={[
        "translations.common",
        "translations.settings",
        "alerts.settings",
      ]}
    >
      <Container>
        <Suspense fallback={<Loading />}>
          <SettingsForm
            userSettingsPromise={userSettingsPromise}
            userPromise={userPromise}
          />
        </Suspense>
      </Container>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
