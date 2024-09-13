import "jsr:@std/dotenv/load"
import { createClient } from "npm:@libsql/client@0.10.0"
  const client = createClient({
  url: "libsql://213-falentio.turso.io",
  authToken: Deno.env.get("LIBSQL_TOKEN"),
})


await client.execute(`
CREATE TABLE IF NOT EXISTS counter(
  id text primary key,
  n int not null
);
`)

await client.execute(`
INSERT INTO counter values('test', -1)`).catch(() => {})
Deno.serve(async () => {
  const result = await client.execute(`update counter set n = n + 1 where id = 'test' returning *`)
  return Response.json(result)
})