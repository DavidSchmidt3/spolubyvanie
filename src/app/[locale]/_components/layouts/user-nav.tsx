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
import { Link } from "@/lib/utils/localization/navigation";

export function UserNav() {
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
            <p className="text-sm font-medium leading-none">meno</p>
            <p className="text-xs leading-none text-muted-foreground">
              {/* {user?.email} */} email
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/settings" className="w-full">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/login">Login</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form>
            <Button
              variant="ghost"
              className="w-full"
              type="submit"
              formAction={logout}
            >
              Logout
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
