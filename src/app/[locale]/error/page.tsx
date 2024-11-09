import Container from "@/app/[locale]/_components/common/container";
import { Link } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";

export default function ErrorPage() {
  const t = useTranslations("translations");

  return (
    <Container className="text-center">
      <h1 className="text-3xl">{t("common.error.label")}</h1>
      <div className="mt-5"></div>
      <Link
        href={{
          pathname: "/[page]",
          params: { page: "1" },
        }}
        className="underline hover:text-primary text-xl"
      >
        {t("common.error.redirect_home")}
      </Link>
    </Container>
  );
}
