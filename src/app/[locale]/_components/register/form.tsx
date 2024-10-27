"use client";
import * as React from "react";

import { Divider } from "@/app/[locale]/_components/common/divider";
import { Button } from "@/app/[locale]/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { Input } from "@/app/[locale]/_components/ui/input";
import { PasswordInput } from "@/app/[locale]/_components/ui/password";
import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import { useControlledForm } from "@/hooks/form";
import { googleLogin as googleRegister } from "@/lib/data/actions/login";
import { USER_AUTH_FORM_SCHEMA } from "@/lib/data/actions/login/schema";
import { signUpWithEmail } from "@/lib/data/actions/register";
import { cn } from "@/lib/utils";
import {
  pushRouteWithTransition,
  useRouter,
} from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useMemo } from "react";
import { type z } from "zod";

type UserAuthFormValues = z.infer<typeof USER_AUTH_FORM_SCHEMA>;
type UserRegisterProps = React.HTMLAttributes<HTMLDivElement>;

export default function UserRegisterForm({
  className,
  ...props
}: UserRegisterProps) {
  "use no memo";
  const t = useTranslations("translations");
  const router = useRouter();
  const { toast } = useToast();
  const { execute, isExecuting, result, hasErrored, hasSucceeded } =
    useAction(signUpWithEmail);

  const defaultValues = useMemo<UserAuthFormValues>(() => {
    return {
      email: "",
      password: "",
    };
  }, []);

  const form = useControlledForm<UserAuthFormValues>({
    schema: USER_AUTH_FORM_SCHEMA,
    defaultValues,
  });

  useEffect(() => {
    if (hasErrored) {
      toast({
        title: "alerts.register.error.title",
        description: result.validationErrors ?? result.serverError,
        variant: "error",
      });
    }

    if (hasSucceeded) {
      toast({
        title: "alerts.register.success.title",
        description: "alerts.register.success.description",
        variant: "success",
      });
      void pushRouteWithTransition("/login", router);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, hasErrored, hasSucceeded]);

  async function onSubmit(data: UserAuthFormValues) {
    execute(data);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("auth.email.label")}
                      autoComplete="email"
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      placeholder={t("auth.password.label")}
                      autoComplete="new-password"
                      className="text-base"
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
              className="text-base"
              aria-label={t("register.button")}
            >
              {isExecuting && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t("register.button")}
            </Button>
          </div>
        </form>
      </Form>
      <Divider text={t("auth.alternative_method.label")} />
      <form action={googleRegister}>
        <Button
          variant="outline"
          type="submit"
          className="w-full text-base"
          aria-label={t("register.google.button")}
        >
          <Icons.google className="w-4 h-4 mr-2" />
          {t("register.google.button")}
        </Button>
      </form>
      <Divider text={t("register.already_have_account.label")} />
      <Button
        onClick={() => pushRouteWithTransition("/login", router)}
        aria-label={t("register.login.button")}
        className="w-full text-base"
        variant="outline"
      >
        {t("register.login.button")}
      </Button>
    </div>
  );
}
