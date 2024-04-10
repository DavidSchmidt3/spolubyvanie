import { cn } from "@/lib/utils";
import { Link } from "@/lib/utils/localization/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "flex gap-5 items-center space-x-4 lg:space-x-6",
        className
      )}
      {...props}
    >
      <Link href="/">Home</Link>
      <Link href="/settings">Settings</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}
