import type { ReactNode } from "react";
import InputElement from "./inputElement";
import type { z } from "zod";

type Item = {
	name: string;
	valueType: string | string[];
	required: boolean;
	nullable: boolean;
	zod: z.ZodType;
	zodError: string;
	creatable: boolean;
	editable: boolean;
	defaultValue?: string;
};

type Schema = Item[];

export const Table = ({
	schema,
	data,
	editId,
}: {
	schema: Schema;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data: Record<string, any>[];
	editId?: number;
}) => {
	return (
		<>
			<div className="overflow-x-auto">
				<table className="table-auto table-lg">
					<thead>
						<tr>
							{schema.map((item: Item) => (
								<th key={item.name} className="text-left items-start">
									{item.name}
								</th>
							))}
							<th className="text-left items-start whitespace-nowrap">
								{" "}
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						<tr key="new">
							<form action="/admin/new" method="post">
								{schema.map((item: Item) => (
									<td
										className="text-sm text-left"
										key={`new-${item.name}`}
										nowrap
									>
										<InputElement itemSchema={item} />
									</td>
								))}
								<td className="text-left items-start whitespace-nowrap">
									<button
										type="submit"
										className="w-min-[300px] btn-sm rounded-sm  bg-success hover:bg-success/80 mr-1"
									>
										Add new
									</button>
								</td>
							</form>
						</tr>

						{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
						{data.map((item: any, index: number) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<tr key={index}>
								<form action="/admin/update" method="post" id="editForm">
									{Object.entries(item).map(
										([key, value], itemIndex: number) => (
											<td
												className="text-sm text-left whitespace-nowrap"
												key={key}
											>
												{editId === index ? (
													<InputElement
														itemSchema={schema[itemIndex]}
														editValue={value as string}
													/>
												) : (
													value
												)}
											</td>
										),
									)}
									<input type="hidden" name="id" value={editId} />
								</form>
								{editId === index ? (
									<td className="text-left  ">
										<div className="flex flex-row whitespace-nowrap items-baseline">
											<form action="/admin" method="get">
												<button
													type="submit"
													className="w-min-[300px] btn-sm rounded-sm  bg-error hover:bg-error/80 mr-1"
												>
													Cancel Edit
												</button>
											</form>
											<button
												type="submit"
												className="w-min-[300px] btn-sm rounded-sm bg-info hover:bg-info/80  ml-1"
												form="editForm"
											>
												Save Change
											</button>
										</div>
									</td>
								) : (
									<td className="text-left items-start whitespace-nowrap">
										<div className="flex flex-row">
											<form action="/admin/edit" method="post">
												<input type="hidden" name="id" value={index} />
												<button
													type="submit"
													className="w-min-[300px] btn-sm rounded-sm  bg-info hover:bg-info/80 mr-1"
												>
													Edit
												</button>
											</form>
											<form action="/admin/delete" method="post">
												<input type="hidden" name="id" value={index} />
												<button
													type="submit"
													className="w-min-[300px] btn-sm rounded-sm bg-error hover:bg-error/80  ml-1"
												>
													Delete
												</button>
											</form>
										</div>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
