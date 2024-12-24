import TransitionLink from "@/app/[locale]/_components/navigation/transition-link";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";
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
import Logout from "@/app/[locale]/_components/user-nav/logout";
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative w-8 h-8 rounded-full hover:motion-preset-seesaw"
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
          <DropdownMenuItem className="text-base cursor-pointer hover:bg-accent/90 group">
            <div className="flex items-center gap-x-2">
              <Icons.settings className="group-hover:motion-preset-seesaw" />
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
              <DropdownMenuItem className="text-base cursor-pointer hover:bg-accent/90 group">
                <div className="flex items-center gap-x-2">
                  <Icons.building className="w-4 h-4 group-hover:motion-preset-seesaw" />
                  {t("navigation.my_advertisements.label")}
                </div>
              </DropdownMenuItem>
            </TransitionLink>
            <DropdownMenuItem>
              <NextIntlClientProvider messages={["translations.logout"]}>
                <Logout locale={locale} />
              </NextIntlClientProvider>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <TransitionLink href="/add-advertisement" className="w-full group">
              <DropdownMenuItem className="text-base cursor-pointer hover:bg-accent/90">
                <div className="flex items-center gap-x-2">
                  <Icons.plus className="w-4 h-4 group-hover:motion-preset-seesaw" />
                  {t("navigation.add_advertisement.label")}
                </div>
              </DropdownMenuItem>
            </TransitionLink>
            <TransitionLink href="/login" className="w-full group">
              <DropdownMenuItem className="text-base cursor-pointer hover:bg-accent/90">
                <div className="flex items-center gap-x-2 ">
                  <Icons.person className="group-hover:motion-preset-seesaw" />
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
