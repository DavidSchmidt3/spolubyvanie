import MyAdvertisementsList from "@/app/[locale]/_components/my-advertisements/list";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";
import { getUser } from "@/lib/data/user";
import { LOCALES, type Locale } from "@/lib/utils/localization/i18n";
import { redirect } from "@/lib/utils/localization/navigation";

type Props = {
  params: Promise<{
    page: string;
    locale: Locale;
  }>;
};

export default async function Page({ params }: Props) {
  const { page, locale } = await params;
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
      messages={[
        "translations.my_advertisements",
        "translations.advertisement",
        "translations.add_advertisement",
        "alerts.my_advertisements",
      ]}
    >
      <div className="flex flex-col justify-start h-full overflow-auto">
        <MyAdvertisementsList page={page} locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
