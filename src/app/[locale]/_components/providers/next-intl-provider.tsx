import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { type Locale } from "@/lib/utils/localization/i18n";
import { type PathKeys } from "global";
import {
  NextIntlClientProvider as IntlClientProvider,
  useMessages,
} from "next-intl";

type Props = {
  children: React.ReactNode;
  messages?: PathKeys<IntlMessages>[] | IntlMessages;
  locale?: Locale;
};

export default function NextIntlClientProvider({
  children,
  locale,
  messages,
}: Props) {
  const allMessages = useMessages();

  return (
    <IntlClientProvider
      messages={
        Array.isArray(messages)
          ? pickLocaleMessages(allMessages, messages)
          : messages
      }
      locale={locale}
    >
      {children}
    </IntlClientProvider>
  );
}
