import Container from "@/app/[locale]/_components/common/container";
import { TransitionLink } from "@/app/[locale]/_components/common/transition-link";
import { Button } from "@/app/[locale]/_components/ui/button";
import { useTranslations } from "next-intl";

export default function LoginPrompt() {
  const t = useTranslations("translations.add_advertisement");

  return (
    <Container>
      <div className="flex flex-col items-center mx-4 gap-y-4">
        <h1 className="text-2xl font-bold text-center">
          {t("login_prompt.title")}
        </h1>
        <TransitionLink href="/login" className="w-full">
          <Button variant="ringHover" className="w-full">
            {t("login_prompt.link")}
          </Button>
        </TransitionLink>
      </div>
    </Container>
  );
}
