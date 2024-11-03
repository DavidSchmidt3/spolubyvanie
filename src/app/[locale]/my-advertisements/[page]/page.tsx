import MyAdvertisementsList from "@/app/[locale]/_components/my-advertisements/list";
import { getUser } from "@/lib/data/user";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { type Locale } from "@/lib/utils/localization/i18n";
import { redirect } from "@/lib/utils/localization/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

type Props = {
  params: Promise<{
    page: string;
    locale: Locale;
  }>;
};

export default async function Page({ params }: Props) {
  const { page, locale } = await params;
  const messages = await getMessages();
  const user = await getUser();

  if (!user)
    return redirect({
      locale,
      href: {
        pathname: "/[page]",
        params: { page: "1" },
      },
    });

  return (
    <NextIntlClientProvider
      messages={pickLocaleMessages(messages, [
        "translations.my_advertisements",
        "translations.advertisement",
        "translations.add_advertisement",
        "alerts.my_advertisements",
      ])}
    >
      <div className="flex flex-col justify-start h-full overflow-auto">
        <MyAdvertisementsList page={page} locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
