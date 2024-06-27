"use client";
import { Button } from "@/app/[locale]/_components/ui/button";
import { CardTitle } from "@/app/[locale]/_components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/[locale]/_components/ui/collapsible";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function CollapsibleWrapper({ children, title }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible className="" open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        asChild
        className="w-full hover:cursor-pointer px-4 py-2 sm:py-4 mx-4"
      >
        <div className="flex items-center justify-between pr-8">
          <CardTitle className="inline mr-2 text-xl sm:text-2xl">
            {title}
          </CardTitle>
          <Button variant="ghost" size="icon">
            {open ? (
              <ChevronUpIcon className="h-6 w-6 transition-transform duration-300 [&[data-state=open]]:rotate-180" />
            ) : (
              <ChevronDownIcon className="h-6 w-6 transition-transform duration-300 [&[data-state=open]]:rotate-180" />
            )}
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        forceMount
        className={open ? "px-4 py-2 sm:py-4 mx-4" : ""}
      >
        <div className={open ? "block" : "hidden"}>{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
