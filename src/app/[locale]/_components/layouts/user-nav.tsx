import TransitionLink from "@/app/[locale]/_components/navigation/transition-link";
import { Avatar } from "@/app/[locale]/_components/ui/avatar";
import { Button } from "@/app/[locale]/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/[locale]/_components/ui/dropdown-menu";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { logout } from "@/lib/data/actions/login";
import { getUser } from "@/lib/data/user";
import { type Locale } from "@/lib/utils/localization/i18n";
import { getTranslations } from "next-intl/server";
import { use } from "react";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function UserNav({ params }: Props) {
  const t = use(getTranslations("translations"));
  const user = use(getUser());
  const { locale } = use(params);
  const logoutWithLocale = logout.bind(null, locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative w-8 h-8 rounded-full"
          aria-label={t("navigation.guest.label")}
        >
          <Avatar className="w-8 h-8 text-muted-foreground">
            <Icons.avatar className="w-8 h-8" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none text-muted-foreground">
              {user?.email ?? t("navigation.guest.label")}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <TransitionLink href="/settings" className="w-full">
          <DropdownMenuItem className="text-base cursor-pointer hover:bg-accent/90">
            <div className="flex items-center gap-x-2">
              <Icons.settings />
              {t("settings.title")}
            </div>
          </DropdownMenuItem>
        </TransitionLink>
        {user ? (
          <>
            <TransitionLink
              href={{
                pathname: "/my-advertisements/[page]",
                params: { page: "1" },
              }}
              className="w-full"
            >
              <DropdownMenuItem className="text-base cursor-pointer hover:bg-accent/90">
                <div className="flex items-center gap-x-2">
                  <Icons.building className="w-4 h-4" />
                  {t("navigation.my_advertisements.label")}
                </div>
              </DropdownMenuItem>
            </TransitionLink>
            <DropdownMenuItem>
              <form className="w-full" action={logoutWithLocale}>
                <Button
                  aria-label={t("logout.button")}
                  variant="ghost"
                  className="justify-start w-full h-6 p-0 text-base text-left cursor-pointer hover:bg-accent/90"
                  type="submit"
                >
                  <div className="flex items-center gap-x-2">
                    <Icons.door />
                    {t("logout.button")}
                  </div>
                </Button>
              </form>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <TransitionLink href="/add-advertisement" className="w-full">
              <DropdownMenuItem className="text-base cursor-pointer hover:bg-accent/90">
                <div className="flex items-center gap-x-2">
                  <Icons.plus className="w-4 h-4" />
                  {t("navigation.add_advertisement.label")}
                </div>
              </DropdownMenuItem>
            </TransitionLink>
            <TransitionLink href="/login" className="w-full">
              <DropdownMenuItem className="text-base cursor-pointer hover:bg-accent/90">
                <div className="flex items-center gap-x-2">
                  <Icons.person />
                  {t("login.button")}
                </div>
              </DropdownMenuItem>
            </TransitionLink>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
