let responses = [];

export async function POST(req) {
  const body = await req.json();
  responses.push({
    ...body,
    time: new Date().toISOString()
  });

  return Response.json({ ok: true });
}

export async function GET() {
  return Response.json(responses);
}
