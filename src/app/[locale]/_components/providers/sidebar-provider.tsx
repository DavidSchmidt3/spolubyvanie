"use client";

import { MainNav } from "@/app/[locale]/_components/layouts/main-nav";
import MainNavLoader from "@/app/[locale]/_components/layouts/main-nav-loader";
import { Sidebar } from "@/app/[locale]/_components/ui/sidebar";
import type { User } from "@/lib/data/user";
import { cn } from "@/lib/utils";
import { Suspense, useState } from "react";

type Props = {
  userPromise: Promise<User | null>;
  children: React.ReactNode;
};

export function SidebarProvider({ userPromise, children }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-full z-[1] relative transition-all duration-300",
          isCollapsed ? "ml-16 md:ml-16" : "ml-16 md:ml-60"
        )}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          className={cn("sidebar", isCollapsed && "collapsed")}
        >
          <Suspense fallback={<MainNavLoader />}>
            <MainNav
              user={userPromise}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          </Suspense>
        </Sidebar>
        {children}
      </div>
    </>
  );
}
