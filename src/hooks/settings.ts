import { api } from "src/trpc/react";

export const useUpdateSettingsMutation = () => {
  return api.userSettings.update.useMutation();
};
