import MyAdvertisementsList from "@/app/[locale]/_components/my-advertisements/list";
import { getUser } from "@/lib/data/user";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { redirect } from "@/lib/utils/localization/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function Page() {
  const messages = await getMessages();
  const user = await getUser();

  if (!user)
    return redirect({
      pathname: "/[page]",
      params: { page: "1" },
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
        <MyAdvertisementsList />
      </div>
    </NextIntlClientProvider>
  );
}
