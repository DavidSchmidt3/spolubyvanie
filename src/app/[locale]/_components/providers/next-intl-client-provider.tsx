import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { type PathKeys } from "global";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { use } from "react";

type Props = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messagesPromise: Promise<any>;
  messagesLocal: PathKeys<IntlMessages>[];
};

export default function NextIntlClientProviderLocal({
  children,
  messagesPromise,
  messagesLocal,
}: Props) {
  const messages = use(messagesPromise) as AbstractIntlMessages;
  return (
    <NextIntlClientProvider
      messages={pickLocaleMessages(messages, messagesLocal)}
    >
      {children}
    </NextIntlClientProvider>
  );
}
