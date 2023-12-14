import Cytoscape from "cytoscape";
import cola from "cytoscape-cola";
import dagre from "cytoscape-dagre";
import euler from "cytoscape-euler";
import spread from "cytoscape-spread";
import coseBilkent from "cytoscape-cose-bilkent";

import CytoscapeComponent from "react-cytoscapejs";
import { cyifyResults } from "../utils/cytoscape_utils";

type GraphProps = {
	queryResults: unknown[];
	error: unknown;
	isLoading: boolean;
	mutate: () => void;
};

export function Graph({ queryResults, error, isLoading, mutate }: GraphProps) {
	Cytoscape.use(cola);
	Cytoscape.use(dagre);
	Cytoscape.use(euler);
	Cytoscape.use(spread);
	Cytoscape.use(coseBilkent);

	const graphModel: CytoscapeModel = cyifyResults(queryResults);

	const stylesheet = [
		{
			selector: "node",
			style: {
				"background-color": "#00A0D1",
				label: "data(id)",
			},
		},
		{
			selector: "edge",
			style: {
				width: 3,
				// label: "data(label)",
				"line-color": "#b4b4b4",
				"target-arrow-color": "#b4b4b4",
				"target-arrow-shape": "triangle",
				"curve-style": "bezier",
			},
		},
	];

	const colaConfig = {
		name: "cola",
		refresh: 10,
		maxSimulationTime: 5000, // max length in ms to run the layout
		// flow: { axis: "y", minSeparation: 50 },
		// nodeDimensionsIncludeLabels: true,
		avoidOverlap: true,
		randomize: true,
	};

	const dagreConfig = {
		name: "dagre",
		// nodSep: 50,
		spacingFactor: 2,
		// align: "UR",
		ranker: "tight-tree",
		rankDir: "TB",
		// minLength: function (edge) {
		// 	return 50;
		// },
	};

	const eulerConfig = {
		name: "euler",
		randomize: true,
		springLength: (edge) => 150,
		// gravity: -0.4,
		// maxIterations: 10000,
		// maxSimulationTime: 10000,
		// refresh: 10,
	};

	const spreadConfig = {
		name: "spread",
	};

	const coseConfig = {
		name: "cose",
	};

	const coseBilkentConfig = {
		name: "cose-bilkent",
		nodeDimensionsIncludeLabels: true,
	};

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			{isLoading && <div>Loading...</div>}
			{!isLoading && error !== undefined && <div>Error!</div>}
			{!isLoading && !error && (
				<CytoscapeComponent
					elements={graphModel.elements}
					style={{ width: "100%", height: "100%" }}
					stylesheet={stylesheet}
					layout={coseBilkentConfig}
				/>
			)}
		</div>
	);
}
