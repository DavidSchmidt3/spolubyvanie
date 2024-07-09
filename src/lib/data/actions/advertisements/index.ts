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
    const paramsNumber = Object.keys(parsedInput ?? {}).length;
    if (
      !parsedInput ||
      paramsNumber === 0 ||
      // If the page is 1 and there is only one parameter, it means that the user wants to get the cached data on first page
      (parsedInput.page === "1" && paramsNumber === 1)
    ) {
      return getAdvertisementsCached();
    }

    return getAdvertisementsFiltered(parsedInput);
  });
