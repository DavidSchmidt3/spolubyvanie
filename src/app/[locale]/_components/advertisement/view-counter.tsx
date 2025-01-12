"use client";
import { addAdvertisementView } from "@/lib/data/actions/upsert-advertisement/view";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";

type Props = {
  advertisementId: string;
};

function ViewCounter({ advertisementId }: Props) {
  const { execute } = useAction(addAdvertisementView);

  useEffect(() => {
    if (!advertisementId) return;
    console.log("adding view for advertisement", advertisementId);
    execute(advertisementId);
  }, [execute, advertisementId]);

  return null;
}

export default ViewCounter;
