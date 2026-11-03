export type FormKind = "contact" | "partner";
type Data = Record<string, string | string[] | undefined>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneDigits = (v: string) => v.replace(/\D/g, "");

// Shared client/server validation. Returns field -> friendly message.
export function validate(kind: FormKind, d: Data) {
  const e: Record<string, string> = {};
  if (str(d.name).length < 2) e.name = "We'd love to know your name.";
  if (str(d.message).length < 5) e.message = "Tell us a little more (5+ characters).";
  if (str(d.message).length > 2000) e.message = "That's a lot! Please keep it under 2000 characters.";
  const phone = phoneDigits(str(d.phone));
  if (kind === "contact") {
    if (!emailRe.test(str(d.email))) e.email = "That email looks a little scrambled.";
    if (phone && (phone.length < 7 || phone.length > 13)) e.phone = "Check the number — it should be 7–13 digits.";
  } else {
    if (!str(d.role)) e.role = "Pick what describes you best.";
    if (!str(d.city)) e.city = "Which city are you in?";
    if (phone.length < 7 || phone.length > 13) e.phone = "We need a phone number to call you back.";
  }
  return e;
}
