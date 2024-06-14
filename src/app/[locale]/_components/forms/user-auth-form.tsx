"use client";
import * as React from "react";

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
import { cn } from "@/lib/utils";
import { login } from "@/lib/utils/data/actions/login";
import { USER_AUTH_FORM_SCHEMA } from "@/lib/utils/data/actions/login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { type z } from "zod";

type UserAuthFormValues = z.infer<typeof USER_AUTH_FORM_SCHEMA>;
type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const t = useTranslations("translations");

  const form = useForm<UserAuthFormValues>({
    resolver: zodResolver(USER_AUTH_FORM_SCHEMA),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: UserAuthFormValues) {
    signInWithEmail(data);
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
                    <Input placeholder={t("login.email.label")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending}>
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {t("login.email.button")}
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t("login.alternative_method.label")}
          </span>
        </div>
      </div>
      <form action={login}>
        <Button variant="outline" type="submit" className="w-full">
          <Icons.google className="mr-2 h-4 w-4" />
          {t("login.google.button")}
        </Button>
      </form>
    </div>
  );
}
