import Map from "@/app/[locale]/_components/map";
import { LOCALES } from "@/lib/utils/localization/i18n";

export default function Page() {
  return <Map />;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
