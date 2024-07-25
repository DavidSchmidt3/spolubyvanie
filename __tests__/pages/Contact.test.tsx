import Contact from "@/app/[locale]/contact/page";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { allMessages } from "@/lib/utils/localization/i18n";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

it("renders contact page", () => {
  render(
    <NextIntlClientProvider
      locale="en"
      messages={pickLocaleMessages(allMessages, ["translations"])}
    >
      <Contact />
    </NextIntlClientProvider>
  );
  const linkElement = screen.getByText("david.schmidt382001@gmail.com");
  expect(linkElement).toBeInTheDocument();
});
