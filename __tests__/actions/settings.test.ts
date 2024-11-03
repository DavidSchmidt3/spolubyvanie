import { ActionError } from "@/lib/data/actions/safe-action-client";
import { SETTINGS_FORM_SCHEMA } from "@/lib/data/actions/settings/schema";
import { db } from "@/lib/utils/prisma";
import { createSafeActionClient } from "next-safe-action";

jest.mock("@/lib/utils/prisma", () => ({
  db: {
    user_settings: {
      upsert: jest.fn(),
    },
  },
}));

jest.mock("@/lib/data/user", () => ({
  getUser: jest.fn().mockResolvedValue({ id: "mockUserId" }),
}));

const actionClient = createSafeActionClient();
const saveSettingsAction = actionClient
  .use(async ({ next }) => {
    return next({ ctx: { userId: "mockUserId" } });
  })
  .schema(SETTINGS_FORM_SCHEMA)
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    try {
      return await db.user_settings.upsert({
        where: { id: userId },
        create: { ...data, id: userId },
        update: data,
      });
    } catch (error) {
      throw new ActionError("alerts.settings.save.error.title");
    }
  });

describe("saveSettings", () => {
  beforeAll(() => {
    global.structuredClone = (val) =>
      val ? (JSON.parse(JSON.stringify(val)) as unknown) : (val as unknown);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // @ts-expect-error polyfill delete
    delete global.structuredClone;
  });

  it("should save settings successfully", async () => {
    const mockData = {
      theme: "light",
      locale: "en",
    } as const;

    (db.user_settings.upsert as jest.Mock).mockResolvedValue(mockData);

    const result = await saveSettingsAction(mockData);

    expect(db.user_settings.upsert).toHaveBeenCalledWith({
      where: { id: "mockUserId" },
      create: { ...mockData, id: "mockUserId" },
      update: mockData,
    });
    expect(result!.data).toEqual(mockData);
  });

  describe.each([
    { theme: 3, locale: 5 },
    { theme: ["en"], locale: ["5"] },
    { theme: "wrong_theme", locale: "wrong_locale" },
    { theme: null, locale: "wrong_locale" },
    { theme: "wrong", locale: null },
    { theme: "", locale: "" },
  ])("should reject invalid data: %o", (invalidData) => {
    it(`should reject invalid data: ${JSON.stringify(
      invalidData
    )}`, async () => {
      // @ts-expect-error this is on purpose to test the validation
      const result = await saveSettingsAction(invalidData);
      expect(result).toHaveProperty("validationErrors");
      const validationErrors = result!.validationErrors!;

      expect(validationErrors).toHaveProperty("theme");
      expect(validationErrors.theme).toHaveProperty("_errors");
      expect(validationErrors.theme!._errors).toBeInstanceOf(Array);
      expect(validationErrors.theme!._errors!.length).toBeGreaterThan(0);

      expect(validationErrors).toHaveProperty("locale");
      expect(validationErrors.locale).toHaveProperty("_errors");
      expect(validationErrors.locale!._errors).toBeInstanceOf(Array);
      expect(validationErrors.locale!._errors!.length).toBeGreaterThan(0);

      // Ensure that db.user_settings.upsert was not called
      expect(db.user_settings.upsert).not.toHaveBeenCalled();
    });
  });

  it("should throw ActionError on database error", async () => {
    const mockData = {
      theme: "light",
      locale: "en",
    } as const;

    (db.user_settings.upsert as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    const result = await saveSettingsAction(mockData);

    expect(result).toHaveProperty("serverError");
    expect(result!.serverError).toBe(
      "Something went wrong while executing the operation."
    );

    expect(db.user_settings.upsert).toHaveBeenCalledWith({
      where: { id: "mockUserId" },
      create: { ...mockData, id: "mockUserId" },
      update: mockData,
    });
  });
});
