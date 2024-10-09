import type { HtmlEscapedString } from "hono/utils/html";
import type React from "react";

export const Card = ({
	title,
	description,
	footer,
	children,
}: {
	title: string;
	description: string;
	footer: string;
	children: React.ReactNode | Promise<HtmlEscapedString>;
}) => (
	<div className="card bg-neutral w-full w-min-[50vw] w-max-[90vw] p-10 shadow-lg rounded-sm">
		<div className="mb-10">
			<h2 className="card-title text-primary">{title}</h2>
			<div className="divider" />
			<p className="text-sm">{description}</p>
		</div>
		<div>{children}</div>
		<div className="card-actions justify-end">
			<p className="text-sm">{footer}</p>
		</div>
	</div>
);
