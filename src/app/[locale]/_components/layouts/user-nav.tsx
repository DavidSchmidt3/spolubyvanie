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
import { logout } from "@/app/[locale]/login/actions";
import { getUser } from "@/lib/utils/data/user";
import { Link } from "@/lib/utils/localization/navigation";
import { getTranslations } from "next-intl/server";

export default async function UserNav() {
  const t = await getTranslations("translations");
  const user = await getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8 text-muted-foreground">
            <Icons.avatar className="w-8 h-8" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/settings" className="w-full">
            {t("settings.title")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/login">{t("login.button")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="w-full p-0 hover:bg-popover text-left justify-start h-6"
            type="submit"
            onClick={logout}
          >
            {t("logout.button")}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
