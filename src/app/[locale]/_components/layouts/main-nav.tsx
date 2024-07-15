import { TransitionLink } from "@/app/[locale]/_components/common/transition-link";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useTranslations } from "next-intl";

export function MainNav({ ...props }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("translations");

  return (
    <nav
      className="flex items-center gap-2 space-x-2 sm:space-x-6 sm:gap-5 lg:space-x-6 sm:mx-6"
      {...props}
    >
      <TransitionLink
        href={{
          pathname: "/[page]",
          params: { page: "1" },
        }}
        className="text-base sm:text-lg"
      >
        <div className="flex items-center gap-x-1 sm:gap-x-2">
          <Icons.home className="w-4 h-4" />
          <p>{t("navigation.home.label")}</p>
        </div>
      </TransitionLink>
      <TransitionLink
        href="/add-advertisement"
        className="text-base text-center sm:text-lg"
      >
        <div className="flex items-center gap-x-1 sm:gap-x-2">
          <Icons.plus className="w-5 h-5" />
          <p>{t("navigation.add_advertisement.label")}</p>
        </div>
      </TransitionLink>
      <TransitionLink href="/contact" className="hidden text-lg sm:block">
        <div className="flex items-center gap-x-2">
          <Icons.person className="w-5 h-5" />
          <p>{t("navigation.contact.label")}</p>
        </div>
      </TransitionLink>
    </nav>
  );
}
