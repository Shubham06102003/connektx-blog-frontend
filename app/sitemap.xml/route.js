export async function GET() {
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/sitemap.xml");
  const sitemap = await response.text();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
