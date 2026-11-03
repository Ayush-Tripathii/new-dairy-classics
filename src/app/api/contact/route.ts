import { NextResponse } from "next/server";
import { validate, type FormKind } from "@/lib/validate";

// Server-side validation for the Partner and Say Hello forms.
// TODO(client): forward to email / CRM (e.g. Resend, SMTP or Bitrix24) once credentials are provided.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 }); }
  const kind = body.kind as FormKind;
  if (kind !== "contact" && kind !== "partner") return NextResponse.json({ ok: false, error: "Unknown form" }, { status: 400 });
  if (typeof body.website === "string" && body.website) return NextResponse.json({ ok: true }); // honeypot
  const errors = validate(kind, body as Record<string, string | string[]>);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });
  console.info(`[${kind}] new submission`, { ...body, website: undefined });
  return NextResponse.json({ ok: true });
}
