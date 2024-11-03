import Container from "@/app/[locale]/_components/common/container";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Link } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("translations.advertisement");
  return (
    <Container className="text-center">
      <div className="flex flex-col gap-y-5">
        <h1 className="text-2xl sm:text-3xl">{t("not_found.title")}</h1>
        <Link
          href={{
            pathname: "/[page]",
            params: { page: "1" },
          }}
        >
          <Button variant="ringHover">{t("not_found.link")}</Button>
        </Link>
      </div>
    </Container>
  );
}
