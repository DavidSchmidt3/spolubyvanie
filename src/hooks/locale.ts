import { type Locale } from "@/lib/utils/localization/i18n";
import { useParams } from "next/navigation";

export const useLocale = () => {
  const params = useParams();
  const locale = params.locale as Locale;

  return locale;
};
