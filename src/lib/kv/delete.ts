import { Request, type KVNamespace } from "@cloudflare/workers-types";

interface Env {
	KV_COLLECTIN: KVNamespace;
}

export async function onRequest(context) {
	const formData = await context.request.formData();
	const deleteProp = formData.get("deleteProp");

	const tracker = await context.env.KV_COLLECTIN.get("tracker");
	const updatedTracker = tracker.filter(
		(item) => item.accountName !== deleteProp && item.service !== deleteProp,
	);

	await context.env.KV_COLLECTIN.put("tracker", updatedTracker);
	return new Response(updatedTracker, {
		headers: {
			"Content-Type": "application/json",
		},
	});
}
