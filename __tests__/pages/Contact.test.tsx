import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";
import Contact from "@/app/[locale]/contact/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

it("renders contact page", () => {
  render(
    <NextIntlClientProvider locale="en" messages={["translations"]}>
      <Contact />
    </NextIntlClientProvider>
  );
  const linkElement = screen.getByText("spolubyvanieinfo@gmail.com");
  expect(linkElement).toBeInTheDocument();
});
