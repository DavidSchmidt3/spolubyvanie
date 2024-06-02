import { type AuthError, type PostgrestError } from "@supabase/supabase-js";

export class ApiError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "api_error";
    this.code = code;
  }
}

export class DbApiError extends ApiError {
  details: string;
  hint: string;

  constructor({ message, details, hint, code }: PostgrestError) {
    super(message, code);
    this.name = "db_api_error";

    this.details = details;
    this.hint = hint;
  }
}

export type StorageApiErrorParams = {
  message: string;
  error: string;
  statusCode: string;
};
export class StorageApiError extends ApiError {
  error: string;

  constructor({
    message,
    error,
    statusCode,
  }: {
    message: string;
    error: string;
    statusCode: string;
  }) {
    // Supabase doesn't have storage storage error type exported
    super(message, statusCode);
    this.name = "storage_api_error";

    this.error = error;
  }
}

export class AuthApiError extends ApiError {
  constructor({ message, status }: AuthError) {
    super(message, status?.toString() ?? "500");
    this.name = "auth_api_error";
  }
}
