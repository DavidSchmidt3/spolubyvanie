import { actionClient } from "@/lib/data/actions/safe-action-client";
import {
  getAdvertisementsCached,
  getAdvertisementsFiltered,
} from "@/lib/data/advertisements";
import { formatZodErrors } from "@/lib/utils/zod";
import * as z from "zod";
import { ADVERTISEMENTS_FILTER_SCHEMA } from "./schema";

export const getAdvertisements = actionClient
  .schema(ADVERTISEMENTS_FILTER_SCHEMA.or(z.null()), {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput }) => {
    if (!parsedInput) {
      return getAdvertisementsCached();
    }

    return getAdvertisementsFiltered(parsedInput);
  });
