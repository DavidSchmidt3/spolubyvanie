import TransitionLink from "@/app/[locale]/_components/navigation/transition-link";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import Logout from "@/app/[locale]/_components/user-nav/logout";
import type { User } from "@/lib/data/user";
import { useLocale, useTranslations } from "next-intl";
import { use } from "react";

export function MainNav({
  user: userPromise,
  isCollapsed,
  setIsCollapsed,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  user: Promise<User | null>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTranslations("translations");
  const user = use(userPromise);
  const locale = useLocale();

  const handleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-start">
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-0 text-base"
          onClick={handleCollapse}
        >
          <div className="flex items-center gap-3 min-w-0 w-full">
            {isCollapsed ? (
              <Icons.arrowRight className="w-5 h-5 flex-shrink-0" />
            ) : (
              <Icons.arrowLeft className="w-5 h-5 flex-shrink-0" />
            )}
            <div className="min-w-0">
              <p className="truncate">{t("navigation.collapse.label")}</p>
            </div>
          </div>
        </Button>
      </div>
      <nav
        className={`flex flex-col items-start px-3 gap-y-2 mt-4 w-full ${
          isCollapsed ? "justify-center" : "justify-start"
        }`}
        {...props}
      >
        {/* Top nav links */}
        <TransitionLink
          href={{
            pathname: "/[page]",
            params: { page: "1" },
          }}
          className="text-base sm:text-lg group"
        >
          <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
            <Icons.home className="w-5 h-5 group-hover:motion-preset-seesaw flex-shrink-0" />
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="truncate">{t("navigation.home.label")}</p>
              </div>
            )}
          </div>
        </TransitionLink>
        <TransitionLink href="/map" className="text-lg group">
          <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
            <Icons.map className="w-5 h-5 group-hover:motion-preset-seesaw flex-shrink-0" />
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="truncate">{t("navigation.map.label")}</p>
              </div>
            )}
          </div>
        </TransitionLink>
        {user && (
          <TransitionLink
            href={{
              pathname: "/my-advertisements/[page]",
              params: { page: "1" },
            }}
            className="text-base text-center sm:text-lg group"
          >
            <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
              <Icons.building className="w-5 h-5 group-hover:motion-preset-seesaw flex-shrink-0" />
              {!isCollapsed && (
                <div className="min-w-0">
                  <p className="truncate">
                    {t("navigation.my_advertisements.label")}
                  </p>
                </div>
              )}
            </div>
          </TransitionLink>
        )}
        <TransitionLink
          href="/add-advertisement"
          className="text-base text-center sm:text-lg group"
        >
          <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
            <Icons.plus className="w-5 h-5 group-hover:motion-preset-seesaw flex-shrink-0" />
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="truncate">
                  {t("navigation.add_advertisement.label")}
                </p>
              </div>
            )}
          </div>
        </TransitionLink>
        <TransitionLink href="/contact" className="text-lg group">
          <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
            <Icons.person className="w-5 h-5 group-hover:motion-preset-seesaw flex-shrink-0" />
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="truncate">{t("navigation.contact.label")}</p>
              </div>
            )}
          </div>
        </TransitionLink>
      </nav>
      {/* User section at the bottom */}
      <div className="mt-auto flex flex-col w-full px-3 pb-4 gap-y-2">
        <div className="border-t border-border mb-2" />
        <TransitionLink href="/settings" className="text-base group">
          <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
            <Icons.settings className="w-5 h-5 group-hover:motion-preset-seesaw flex-shrink-0" />
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="truncate">{t("settings.title")}</p>
              </div>
            )}
          </div>
        </TransitionLink>
        {/* User links */}
        {user ? (
          <>
            <TransitionLink
              href={{
                pathname: "/my-advertisements/[page]",
                params: { page: "1" },
              }}
              className="text-base group"
            >
              <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
                <Icons.building className="w-5 h-5 group-hover:motion-preset-seesaw flex-shrink-0" />
                {!isCollapsed && (
                  <div className="min-w-0">
                    <p className="truncate">
                      {t("navigation.my_advertisements.label")}
                    </p>
                  </div>
                )}
              </div>
            </TransitionLink>
            <div className="w-full">
              <Logout locale={locale}>
                {({ disabled, onClick, isExecuting }) => (
                  <Button
                    aria-label={t("logout.button")}
                    variant="ghost"
                    className="w-full justify-start h-8 px-0 text-base text-left cursor-pointer hover:bg-accent/90 group"
                    type="submit"
                    disabled={disabled}
                    onClick={onClick}
                  >
                    <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
                      {isExecuting && (
                        <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      <Icons.door className="w-5 h-5 group-hover:motion-preset-seesaw flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="min-w-0">
                          <p className="truncate">{t("logout.button")}</p>
                        </div>
                      )}
                    </div>
                  </Button>
                )}
              </Logout>
            </div>
            <div
              className={`text-xs text-muted-foreground truncate px-1 h-5 flex items-center transition-all duration-300 ${
                user.email && !isCollapsed
                  ? "opacity-100 max-h-5 overflow-hidden"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              <span>{user.email}</span>
            </div>
          </>
        ) : (
          <>
            <TransitionLink
              href="/add-advertisement"
              className="text-base group"
            >
              <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
                <Icons.plus className="w-5 h-5 group-hover:motion-preset-seesaw flex-shrink-0" />
                {!isCollapsed && (
                  <div className="min-w-0">
                    <p className="truncate">
                      {t("navigation.add_advertisement.label")}
                    </p>
                  </div>
                )}
              </div>
            </TransitionLink>
            <TransitionLink href="/login" className="text-base group">
              <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
                <Icons.person className="w-5 h-5 group-hover:motion-preset-seesaw flex-shrink-0" />
                {!isCollapsed && (
                  <div className="min-w-0">
                    <p className="truncate">{t("login.button")}</p>
                  </div>
                )}
              </div>
            </TransitionLink>
          </>
        )}
      </div>
    </div>
  );
}
