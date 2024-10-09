import type { KVNamespace } from "@cloudflare/workers-types";

interface Env {
	KV_COLLECTIN: KVNamespace;
}

export async function onRequest(context: { env: Env }) {
	await context.env.KV_COLLECTIN.put(
		"tracker",
		JSON.stringify([
			{
				accountName: "emilimisumi",
				service: "Instagram",
				lastAccessed: 1728097408570,
				lastAccessedId: "3277807251907971645",
				status: "active",
			},
		]),
	);
	const tracker = await context.env.KV_COLLECTIN.get("tracker");
	return new Response(tracker, {
		headers: {
			"Content-Type": "application/json",
		},
	});
}
