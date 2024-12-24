import { LOCALES, type Locale } from "@/lib/utils/localization/i18n";
import { redirect } from "@/lib/utils/localization/navigation";
import { use } from "react";

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default function Page({ params }: Props) {
  const { locale } = use(params);
  redirect({
    locale,
    href: {
      pathname: "/[page]",
      params: { page: "1" },
    },
  });

  return null;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
