import CytoscapeComponent from "react-cytoscapejs";
import { cyifyResults } from "../utils/cytoscape_utils";

type GraphProps = {
	queryResults: unknown[];
	error: unknown;
	isLoading: boolean;
	mutate: () => void;
};

export function Graph({ queryResults, error, isLoading, mutate }: GraphProps) {
	const graphModel: CytoscapeModel = cyifyResults(queryResults);

	const stylesheet = [
		{
			selector: "node",
			style: {
				"background-color": "#666",
				label: "data(id)",
			},
		},
		{
			selector: "edge",
			style: {
				width: 3,
				"line-color": "#ccc",
				"target-arrow-color": "#ccc",
				"target-arrow-shape": "triangle",
				"curve-style": "bezier",
			},
		},
	];

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			{isLoading && <div>Loading...</div>}
			{!isLoading && error !== undefined && <div>Error!</div>}
			{!isLoading && !error && (
				<CytoscapeComponent
					elements={graphModel.elements}
					style={{ width: "100%", height: "100%" }}
					stylesheet={stylesheet}
					layout={{
						name: "grid",
						rows: 1,
					}}
				/>
			)}
		</div>
	);
}
