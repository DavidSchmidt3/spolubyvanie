"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/[locale]/_components/ui/alert-dialog";
import { Button, buttonVariants } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { type DeleteAdvertisementsInput } from "@/lib/data/actions/my-advertisements/schema";
import { type Advertisement } from "@/lib/data/advertisements/format";
import { cn } from "@/lib/utils";
import { useRouter } from "@/lib/utils/localization/navigation";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";

type Props = {
  advertisement: Advertisement;
  isExecuting: boolean;
  execute: (data: DeleteAdvertisementsInput) => void;
};

export default function AdvertisementActions({
  advertisement,
  isExecuting,
  execute,
}: Props) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const t = useTranslations("translations");
  const router = useRouter();
  const [isRoutingPending, startTransition] = useTransition();

  function preventGoingToAdvertisementDetail(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDialogCancel = (e: React.MouseEvent) => {
    preventGoingToAdvertisementDetail(e);
    setConfirmDialogOpen(false);
  };

  const handleDialogConfirm = (e: React.MouseEvent) => {
    preventGoingToAdvertisementDetail(e);
    setConfirmDialogOpen(false);
    execute({ advertisement_id: advertisement.id });
  };

  const handleEditButtonClick = () => {
    startTransition(() => {
      router.push({
        pathname: "/advertisement/[id]/edit",
        params: { id: advertisement.id },
      });
    });
  };

  const handleDeleteButtonClick = (e: React.MouseEvent) => {
    preventGoingToAdvertisementDetail(e);
    setConfirmDialogOpen(true);
  };

  return (
    <div
      className="flex gap-2 flex-col sm:flex-row"
      data-pending={isRoutingPending}
    >
      <Button
        className="flex gap-2 h-min"
        onClick={handleEditButtonClick}
        disabled={isExecuting}
      >
        <Icons.edit className="h-4 w-4" />
        {t("advertisement.edit.button")}
      </Button>
      <Button
        onClick={handleDeleteButtonClick}
        variant="destructive"
        className="flex gap-2 h-min z-10"
        disabled={isExecuting}
      >
        {isExecuting && (
          <Icons.spinner className="w-4 h-4 mr-2 animate-spin p" />
        )}
        <Icons.trash className="h-4 w-4" />
        {t("advertisement.delete.button")}
      </Button>
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("my_advertisements.delete.confirm_dialog.title")}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            {t("my_advertisements.delete.confirm_dialog.content")}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDialogCancel}>
              {t("my_advertisements.delete.confirm_dialog.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDialogConfirm}
              className={`${cn(buttonVariants({ variant: "destructive" }))}`}
            >
              {t("my_advertisements.delete.confirm_dialog.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
