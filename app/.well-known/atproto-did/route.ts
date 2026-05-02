export const dynamic = 'force-static'

export function GET() {
  return new Response('did:plc:4xcms332sxmmnfu7lvstnlfy', {
    headers: { 'Content-Type': 'text/plain' },
  })
}
