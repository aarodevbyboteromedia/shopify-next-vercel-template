import { storeSession } from "@/lib/db/session-storage";
import shopify from "@/lib/shopify/initialize-context";
import {
  CookieNotFound,
  InvalidOAuthError,
  InvalidSession,
  Session,
} from "@shopify/shopify-api";
import { NextResponse } from "next/server";
import { beginAuth } from "../auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const shop = url.searchParams.get("shop");
  const host = url.searchParams.get("host");

  // Validar parámetros esenciales
  if (!shop || !host) {
    return new NextResponse("Missing required parameters (shop or host)", {
      status: 400,
    });
  }

  try {
    // Realizar el callback de autenticación
    const callbackResponse = await shopify.auth.callback<Session>({
      rawRequest: req,
    });

    const { session } = callbackResponse;

    // Verificar si la sesión es válida
    if (!session || !session.accessToken) {
      throw new Error("Could not validate auth callback. Session or access token missing.");
    }

    // Guardar la sesión en la base de datos
    await storeSession(session);

    // Registrar webhooks para la tienda autenticada
    const webhookResponse = await shopify.webhooks.register({ session });

    if (webhookResponse.userErrors.length > 0) {
      console.warn("Webhook registration errors:", webhookResponse.userErrors);
    }

    // Sanitizar el host para evitar problemas de seguridad
    const sanitizedHost = shopify.utils.sanitizeHost(host);
    if (!sanitizedHost) {
      return new NextResponse("Invalid host parameter", { status: 400 });
    }

    // Redirigir al panel de la app
    let redirectUrl = `/?shop=${session.shop}&host=${encodeURIComponent(
      sanitizedHost
    )}`;
    if (shopify.config.isEmbeddedApp) {
      redirectUrl = await shopify.auth.getEmbeddedAppUrl({
        rawRequest: req,
        rawResponse: new NextResponse(),
      });
    }

    return NextResponse.redirect(redirectUrl);
  } catch (e: any) {
    console.error("Error during OAuth callback:", e);

    switch (true) {
      case e instanceof InvalidOAuthError:
        return new NextResponse(e.message, { status: 403 });
      case e instanceof CookieNotFound:
      case e instanceof InvalidSession:
        // Si el cookie expira antes de aprobar, reiniciar la autenticación
        return beginAuth(shop, req, false);
      default:
        return new NextResponse("An unexpected error occurred", { status: 500 });
    }
  }
}
