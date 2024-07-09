import { actionClient } from "@/lib/data/actions/safe-action-client";
import {
  getAdvertisementsCached,
  getAdvertisementsFiltered,
} from "@/lib/data/advertisements";
import { formatZodErrors } from "@/lib/utils/zod";
import * as z from "zod";
import { ADVERTISEMENTS_FULL_SCHEMA } from "./schema";

export const getAdvertisements = actionClient
  .schema(ADVERTISEMENTS_FULL_SCHEMA.or(z.null()), {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput }) => {
    if (!parsedInput || Object.keys(parsedInput).length === 0) {
      return getAdvertisementsCached();
    }

    return getAdvertisementsFiltered(parsedInput);
  });
