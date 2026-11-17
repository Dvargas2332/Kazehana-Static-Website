import { getDb } from "./connection";
import { leads } from "@db/schema";

type NewLead = typeof leads.$inferInsert;

export async function createLead(data: NewLead) {
  const [{ id }] = await getDb().insert(leads).values(data).$returningId();
  return { id };
}
