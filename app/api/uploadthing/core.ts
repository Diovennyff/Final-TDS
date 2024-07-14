import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter para su aplicación, puede contener múltiples FileRoutes
export const ourFileRouter = {
  // Defina tantas FileRoutes como desee, cada una con una ruta única
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Establecer permisos y tipos de archivos para este FileRoute
    .middleware(async ({ req }) => {
      // Este código se ejecuta en su servidor antes de cargarlo.
      const user = await auth(req);

      // Si lanzas, el usuario no podrá subir.
      if (!user) throw new Error("Unauthorized");

      // Todo lo que se devuelve aquí es accesible en onUploadComplete como "metadatos".
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Este código SE EJECUTA EN SU SERVIDOR después de cargarlo
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Todo lo que se devuelve aquí se envía a la devolución de llamada `onClientUploadComplete` del lado del cliente.
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
