"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/_components/ui/select";
import SelectCancelButton from "@/app/[locale]/_components/ui/select-cancel-button";
import { adTypeKeys, type AdType } from "@/lib/utils/data/advertisements/types";
import { type MessageKeys } from "global";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function AdvertisementTypeFilter() {
  const [selectedAdType, setSelectedAdType] = useState("");
  const t = useTranslations();

  return (
    <div className="flex justify-center w-full gap-1 flex-col relative">
      <h4 className="text-sm">
        {t("translations.advertisement.types.select_label")}
      </h4>
      <Select value={selectedAdType} onValueChange={setSelectedAdType}>
        <SelectTrigger
          className="h-11 text-center justify-between w-full px-4"
          value={selectedAdType}
          aria-label={t("translations.advertisement.types.select_text")}
        >
          <SelectValue
            placeholder={t("translations.advertisement.types.select_text")}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>
              {t("translations.advertisement.types.select_label")}
            </SelectLabel>
            {Object.keys(adTypeKeys).map((key) => {
              const adTypeKey = parseInt(key) as AdType;
              const value =
                `translations.advertisement.types.${adTypeKeys[adTypeKey]}` as MessageKeys<IntlMessages>;
              return (
                <SelectItem key={key} value={key}>
                  {t(value)}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="z-20 flex items-center -ml-11 absolute right-0 bottom-0 mr-2 mb-1.5">
        {selectedAdType && (
          <SelectCancelButton onCancel={() => setSelectedAdType("")} />
        )}
      </div>
    </div>
  );
}
