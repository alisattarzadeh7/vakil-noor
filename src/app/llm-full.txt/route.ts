import { createLlmFull } from "@/lib/llm";

export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(await createLlmFull(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
