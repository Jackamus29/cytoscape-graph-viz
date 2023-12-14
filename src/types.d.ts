declare interface JLDBaseQuery {
	from: string | string[];
	where?: WhereKey;
	t?: TKey;
	opts?: Record<string, unkown>;
	context?: Context;
	"@context"?: Context;
	groupBy?: string;
	having?: string;
	orderBy?: string;
	values?: unknown[];
	depth?: number;
}

declare interface JLDSelectQuery extends JLDBaseQuery {
	select: SelectKey;
}