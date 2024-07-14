import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres."),
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres.")
    .max(400, "La descripción debe tener menos de 400 caracteres."),
  location: z
    .string()
    .min(3, "La ubicación debe tener al menos 3 caracteres.")
    .max(400, "La ubicación debe tener menos de 400 caracteres."),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
