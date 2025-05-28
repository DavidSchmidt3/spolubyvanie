"use client";

import { Button } from "@/app/[locale]/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { Textarea } from "@/app/[locale]/_components/ui/textarea";
import { useActionToast } from "@/hooks/action-toast";
import { useControlledForm } from "@/hooks/form";
import { contactAdvertisementOwner } from "@/lib/data/actions/email";
import {
  CONTACT_FORM_SCHEMA,
  type ContactFormValues,
} from "@/lib/data/actions/email/schema";
import { type User } from "@/lib/data/user";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useMemo, useState } from "react";

type Props = {
  userId: string;
  advertisementTitle: string;
  loggedUser: User;
};

export default function ContactForm({
  userId,
  advertisementTitle,
  loggedUser,
}: Props) {
  const t = useTranslations("translations.advertisement");
  const [show, setShow] = useState(true);
  const { execute, isExecuting, result, hasErrored, hasSucceeded } = useAction(
    contactAdvertisementOwner
  );

  const onActionSuccess = () => {
    setShow(false);
  };

  useActionToast({
    hasErrored,
    hasSucceeded,
    result,
    successTitle: "alerts.advertisement.contact.success.title",
    errorTitle: "alerts.advertisement.contact.error.title",
    onSuccess: onActionSuccess,
  });

  const defaultValues = useMemo<ContactFormValues>(() => {
    return {
      userId,
      advertisementTitle,
      message: "",
    };
  }, [userId, advertisementTitle]);

  const form = useControlledForm<ContactFormValues>({
    schema: CONTACT_FORM_SCHEMA,
    defaultValues,
  });

  async function onSubmit(data: ContactFormValues) {
    execute(data);
  }

  return show ? (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-bold sm:text-2xl">{t("contact.title")}</h2>
        {loggedUser ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder={t("contact.message.placeholder")}
                          className="text-base resize-none min-h-52 hover:bg-accent/90"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isExecuting}
                  variant="ringHover"
                  type="submit"
                  aria-label={t("contact.button")}
                >
                  {isExecuting && (
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {t("contact.button")}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <h3 className="text-xl font-bold sm:text-xl mt-3">
            {t("contact.login_prompt.title")}
          </h3>
        )}
      </div>
    </div>
  ) : null;
}
