import { createNextRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Exportar rutas para Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
