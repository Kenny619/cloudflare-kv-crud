import { Request, type KVNamespace } from "@cloudflare/workers-types";

interface Env {
	KV_COLLECTIN: KVNamespace;
}

export async function onRequest(context) {
	const tracker = await context.request.json();

	await context.env.KV_COLLECTIN.put("tracker", JSON.stringify(tracker));
	return new Response(tracker, {
		headers: {
			"Content-Type": "application/json",
		},
	});
}
