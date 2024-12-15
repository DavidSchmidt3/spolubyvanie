"use client";

import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/[locale]/_components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/[locale]/_components/ui/drawer";
import { cn } from "@/lib/utils";
import { useMediaQueryContext } from "../providers/media-query-provider";

interface BaseProps {
  children: React.ReactNode;
}

interface RootCredenzaProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface CredenzaProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const Credenza = ({ children, ...props }: RootCredenzaProps) => {
  const isDesktop = useMediaQueryContext();

  const Credenza = isDesktop ? Dialog : Drawer;

  return <Credenza {...props}>{children}</Credenza>;
};

const CredenzaTrigger = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQueryContext();
  const CredenzaTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <CredenzaTrigger
      className={className}
      {...props}
      aria-describedby={undefined}
    >
      {children}
    </CredenzaTrigger>
  );
};

const CredenzaClose = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQueryContext();
  const CredenzaClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <CredenzaClose className={className} {...props}>
      {children}
    </CredenzaClose>
  );
};

const CredenzaContent = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQueryContext();
  const CredenzaContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <CredenzaContent
      className={cn(className, "max-h-[95dvh]")}
      {...props}
      aria-describedby={undefined}
    >
      {children}
    </CredenzaContent>
  );
};

const CredenzaDescription = ({
  className,
  children,
  ...props
}: CredenzaProps) => {
  const isDesktop = useMediaQueryContext();
  const CredenzaDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <CredenzaDescription className={className} {...props}>
      {children}
    </CredenzaDescription>
  );
};

const CredenzaHeader = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQueryContext();
  const CredenzaHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <CredenzaHeader className={className} {...props}>
      {children}
    </CredenzaHeader>
  );
};

const CredenzaTitle = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQueryContext();
  const CredenzaTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <CredenzaTitle className={className} {...props}>
      {children}
    </CredenzaTitle>
  );
};

const CredenzaBody = ({ className, children, ...props }: CredenzaProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const CredenzaFooter = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQueryContext();
  const CredenzaFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <CredenzaFooter className={className} {...props}>
      {children}
    </CredenzaFooter>
  );
};

export {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
};
