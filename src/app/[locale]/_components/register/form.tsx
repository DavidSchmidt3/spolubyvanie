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
import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import { useControlledForm } from "@/hooks/form";
import { cn } from "@/lib/utils";
import { googleLogin as googleRegister } from "@/lib/utils/data/actions/login";
import { USER_AUTH_FORM_SCHEMA } from "@/lib/utils/data/actions/login/schema";
import { signUpWithEmail } from "@/lib/utils/data/actions/register";
import { useRouter } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
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

  async function onSubmit(data: UserAuthFormValues) {
    const response = await signUpWithEmail(data);

    if (response?.isError) {
      toast({
        title: "alerts.register.error.title",
        description: response.error,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "alerts.register.success.title",
      description: "alerts.register.success.description",
      variant: "success",
    });
    router.push("/login");
  }

  const isPending = form.formState.isSubmitting;

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
                    <Input
                      type="password"
                      placeholder={t("auth.password.label")}
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} variant="ringHover">
              {isPending && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t("register.button")}
            </Button>
          </div>
        </form>
      </Form>
      <Divider text={t("auth.alternative_method.label")} />
      <form action={googleRegister}>
        <Button variant="outline" type="submit" className="w-full">
          <Icons.google className="w-4 h-4 mr-2" />
          {t("register.google.button")}
        </Button>
      </form>
      <Divider text={t("register.already_have_account.label")} />
      <Button
        onClick={() => router.push("/login")}
        className="w-full"
        variant="outline"
      >
        {t("register.login.button")}
      </Button>
    </div>
  );
}
