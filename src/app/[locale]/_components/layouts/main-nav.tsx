import { TransitionLink } from "@/app/[locale]/_components/common/transition-link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("translations");

  return (
    <nav
      className={cn(
        "flex gap-5 items-center space-x-4 lg:space-x-6",
        className
      )}
      {...props}
    >
      <TransitionLink href="/" className="text-lg">
        {t("navigation.home.label")}
      </TransitionLink>
      <TransitionLink href="/contact" className="text-lg">
        {t("navigation.contact.label")}
      </TransitionLink>
    </nav>
  );
}
