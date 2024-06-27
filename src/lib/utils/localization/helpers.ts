import { type AllKeys, type PathKeys } from "global";
import { pick } from "lodash";
import { type AbstractIntlMessages } from "next-intl";

export function pickLocaleMessages(
  messages: AbstractIntlMessages,
  keys: PathKeys<IntlMessages>[]
) {
  const additionalKeys = [
    "alerts.global",
    "translations.common",
  ] as AllKeys<IntlMessages>[];
  const combinedKeys = [...keys, ...additionalKeys];
  return pick(messages, combinedKeys);
}
