/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/lib/utils/localization/i18n.ts"
);

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    ppr: true,
    reactCompiler: false,
  },
};

export default withNextIntl(config);
