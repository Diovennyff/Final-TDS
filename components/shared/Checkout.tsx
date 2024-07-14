import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  useEffect(() => {
    // Verificar si se trata de una redirección desde el proceso de pago
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("¡Pedido realizado! Recibirás un correo de confirmación.");
    }

    if (query.get("canceled")) {
      console.log(
        "Pedido cancelado: continúe comparando precios y pagando cuando esté listo."
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {event.isFree ? "Obtener boleto" : "Comprar boleto"}
      </Button>
    </form>
  );
};

export default Checkout;
