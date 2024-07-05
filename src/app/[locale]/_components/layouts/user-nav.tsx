import { Avatar } from "@/app/[locale]/_components/ui/avatar";
import { Button } from "@/app/[locale]/_components/ui/button";

import { TransitionLink } from "@/app/[locale]/_components/common/transition-link";
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
import { getTranslations } from "next-intl/server";

export default async function UserNav() {
  const t = await getTranslations("translations");
  const user = await getUser();

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
          <DropdownMenuItem className="cursor-pointer hover:bg-accent/90 text-base">
            {t("settings.title")}
          </DropdownMenuItem>
        </TransitionLink>
        {user ? (
          <DropdownMenuItem>
            <form action={logout} className="w-full">
              <Button
                aria-label={t("logout.button")}
                variant="ghost"
                className="w-full p-0 hover:bg-accent/90 text-left justify-start h-6 cursor-pointer text-base"
                type="submit"
              >
                {t("logout.button")}
              </Button>
            </form>
          </DropdownMenuItem>
        ) : (
          <TransitionLink href="/login" className="w-full">
            <DropdownMenuItem className="cursor-pointer hover:bg-accent/90 text-base">
              {t("login.button")}
            </DropdownMenuItem>
          </TransitionLink>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
