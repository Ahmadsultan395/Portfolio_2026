export const PROJECT_TYPES = [
  "Website or web app",
  "Next.js / React frontend",
  "E-commerce",
  "Dashboard or admin panel",
  "Job or collaboration",
  "Something else",
] as const;

export interface ContactInput {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = { name: 100, email: 254, message: 5000, minMessage: 10 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Shared by the browser form and the API route so both enforce the same rules. */
export function validateContact(raw: Partial<Record<keyof ContactInput, unknown>>): {
  values: ContactInput;
  errors: FieldErrors;
} {
  const values: ContactInput = {
    name: str(raw.name),
    email: str(raw.email),
    projectType: str(raw.projectType),
    message: str(raw.message),
  };
  const errors: FieldErrors = {};

  if (!values.name) errors.name = "Please enter your name.";
  else if (values.name.length > LIMITS.name) errors.name = `Name must be under ${LIMITS.name} characters.`;

  if (!values.email) errors.email = "Please enter your email address.";
  else if (values.email.length > LIMITS.email || !EMAIL_RE.test(values.email))
    errors.email = "Please enter a valid email address.";

  if (!values.projectType) errors.projectType = "Please choose what this is about.";
  else if (!(PROJECT_TYPES as readonly string[]).includes(values.projectType))
    errors.projectType = "Please choose one of the listed options.";

  if (!values.message) errors.message = "Please write a message.";
  else if (values.message.length < LIMITS.minMessage)
    errors.message = `Message should be at least ${LIMITS.minMessage} characters.`;
  else if (values.message.length > LIMITS.message)
    errors.message = `Message must be under ${LIMITS.message} characters.`;

  return { values, errors };
}
