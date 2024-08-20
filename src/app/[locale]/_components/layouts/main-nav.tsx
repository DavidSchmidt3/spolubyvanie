import { TransitionLink } from "@/app/[locale]/_components/common/transition-link";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { getUser } from "@/lib/data/user";
import { getTranslations } from "next-intl/server";

export async function MainNav({ ...props }: React.HTMLAttributes<HTMLElement>) {
  const t = await getTranslations("translations");
  const user = await getUser();

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
      {user && (
        <TransitionLink
          href="/my-advertisements"
          className="text-base text-center sm:text-lg"
        >
          <div className="flex items-center gap-x-1 sm:gap-x-2">
            <Icons.building className="w-5 h-5" />
            <p>{t("navigation.my_advertisements.label")}</p>
          </div>
        </TransitionLink>
      )}
      <TransitionLink
        href="/add-advertisement"
        className="text-base text-center sm:text-lg hidden sm:block"
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
