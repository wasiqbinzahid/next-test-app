export async function GET(request: Request) {
  console.log(request);
  return Response.json({ name: "WASIQ" });
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  return Response.json({ body: body });
}
