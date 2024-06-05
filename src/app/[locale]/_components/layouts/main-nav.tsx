import { cn } from "@/lib/utils";
import { Link } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("navigation");

  return (
    <nav
      className={cn(
        "flex gap-5 items-center space-x-4 lg:space-x-6",
        className
      )}
      {...props}
    >
      <Link href="/">{t("home.label")}</Link>
      <div className="hidden sm:block space-x-8">
        <Link href="/settings">{t("settings.label")}</Link>
        <Link href="/login">{t("login.label")}</Link>
      </div>
    </nav>
  );
}
