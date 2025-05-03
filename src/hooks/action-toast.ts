import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import { type MessageKeys } from "global";
import { useEffect } from "react";

type UseActionParams = {
  successTitle?: MessageKeys<IntlMessages>;
  errorTitle?: MessageKeys<IntlMessages>;
  hasErrored?: boolean;
  hasSucceeded?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result?: any;
  onSuccess?: () => void;
  onError?: () => void;
};

export const useActionToast = ({
  successTitle,
  errorTitle,
  hasErrored,
  hasSucceeded,
  result,
  onSuccess,
  onError,
}: UseActionParams) => {
  const { toast } = useToast();

  useEffect(() => {
    if (hasErrored) {
      if (errorTitle) {
        toast({
          title: errorTitle,
          description: result.validationErrors ?? result.serverError,
          variant: "error",
        });
      }
      onError?.();
    }

    if (hasSucceeded) {
      if (successTitle) {
        toast({
          title: successTitle,
          variant: "success",
        });
      }
      onSuccess?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, hasErrored, hasSucceeded]);
};
