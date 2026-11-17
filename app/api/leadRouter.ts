import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { createLead } from "./queries/leads";

const leadInput = z
  .object({
    kind: z.enum(["demo", "waitlist", "whatsapp"]),
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(320).optional(),
    phone: z.string().trim().max(40).optional(),
    propertyName: z.string().trim().max(160).optional(),
    rooms: z.number().int().min(1).max(2000).optional(),
    message: z.string().trim().max(1200).optional(),
    consent: z.literal(true),
  })
  .superRefine((value, ctx) => {
    if (value.kind !== "whatsapp" && !value.email) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "El correo es obligatorio." });
    }
    if (value.kind === "whatsapp") {
      if (!value.phone) {
        ctx.addIssue({ code: "custom", path: ["phone"], message: "El teléfono es obligatorio." });
      } else if (!/^[+0-9()\s-]{8,40}$/.test(value.phone)) {
        ctx.addIssue({ code: "custom", path: ["phone"], message: "Introduce un teléfono válido." });
      }
    }
  });

export const leadRouter = createRouter({
  create: publicQuery.input(leadInput).mutation(async ({ input }) => {
    const result = await createLead({
      kind: input.kind,
      name: input.name,
      email: input.email,
      phone: input.phone,
      propertyName: input.propertyName,
      rooms: input.rooms,
      message: input.message,
      consent: input.consent,
    });
    return { ok: true as const, id: result.id };
  }),
});
