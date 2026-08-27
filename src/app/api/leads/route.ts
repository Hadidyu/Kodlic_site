import { NextResponse } from "next/server";

/**
 * POST /api/leads
 * Stores estimate-builder inquiries and contact messages.
 * Demo store is in-memory — swap the TODO blocks for Supabase/Postgres
 * and an email notification (Resend/Postmark) in production.
 */

type LeadBody = {
  kind?: "estimate" | "contact";
  payload?: Record<string, unknown>;
};

const leads: Array<Record<string, unknown>> = [];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadBody;

    if (!body || typeof body !== "object" || !body.kind || !body.payload) {
      return NextResponse.json(
        { ok: false, error: "Invalid lead payload." },
        { status: 400 }
      );
    }

    const record = {
      ...body.payload,
      kind: body.kind,
      at: new Date().toISOString(),
      id: `lead_${leads.length + 1}_${Date.now().toString(36)}`,
    };

    // TODO: await supabase.from("leads").insert(record);
    // TODO: await resend.emails.send({ to: "hello@kodlic.dev", ... });
    leads.push(record);

    return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not store lead." },
      { status: 500 }
    );
  }
}
