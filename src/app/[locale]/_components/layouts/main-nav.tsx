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
    </nav>
  );
}
