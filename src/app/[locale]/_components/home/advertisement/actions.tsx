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
import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import { deleteAdvertisement } from "@/lib/data/actions/my-advertisements";
import { type Advertisement } from "@/lib/data/advertisements/format";
import { cn } from "@/lib/utils";
import { useRouter } from "@/lib/utils/localization/navigation";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";

type Props = {
  advertisement: Advertisement;
};

export default function AdvertisementActions({ advertisement }: Props) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const t = useTranslations("translations");
  const { toast } = useToast();
  const router = useRouter();
  const { execute, isExecuting, hasErrored, hasSucceeded } =
    useAction(deleteAdvertisement);

  useEffect(() => {
    if (hasErrored) {
      toast({
        title: "alerts.my_advertisements.delete.error.title",
        variant: "error",
      });
    }

    if (hasSucceeded) {
      router.refresh();
      toast({
        title: "alerts.my_advertisements.delete.success.title",
        variant: "success",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasErrored, hasSucceeded]);

  function preventGoingToAdvertisementDetail(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <div className="flex gap-2 flex-col sm:flex-row">
      <Button
        className="flex gap-2 h-min"
        onClick={() =>
          router.push({
            pathname: "/advertisement/[id]/edit",
            params: { id: advertisement.id },
          })
        }
      >
        <Icons.edit className="h-4 w-4" />
        {t("advertisement.edit.button")}
      </Button>
      <Button
        onClick={(e) => {
          preventGoingToAdvertisementDetail(e);
          setConfirmDialogOpen(true);
        }}
        variant="destructive"
        className="flex gap-2 h-min z-10"
        disabled={isExecuting}
      >
        {isExecuting && (
          <Icons.spinner className="w-4 h-4 mr-2 animate-spin p" />
        )}
        <Icons.cross className="h-4 w-4" />
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
            <AlertDialogCancel
              onClick={(e) => {
                preventGoingToAdvertisementDetail(e);
                setConfirmDialogOpen(false);
              }}
            >
              {t("my_advertisements.delete.confirm_dialog.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                preventGoingToAdvertisementDetail(e);
                setConfirmDialogOpen(false);
                execute({ advertisement_id: advertisement.id });
              }}
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
