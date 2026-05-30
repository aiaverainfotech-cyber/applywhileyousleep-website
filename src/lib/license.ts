import { randomBytes } from "crypto";

/** Generates a license key like AWYS-K9X2-P3M7-Q8W1 */
export function generateLicenseKey(): string {
  const segment = () =>
    randomBytes(2).toString("hex").toUpperCase().slice(0, 4);
  return `AWYS-${segment()}-${segment()}-${segment()}`;
}

/** Adds 30 days to now, returns ISO string */
export function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export function isExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return true;
  return new Date(expiresAt) < new Date();
}
