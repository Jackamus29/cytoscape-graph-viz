import CytoscapeComponent from "react-cytoscapejs";
import useSWR from "swr";

function App() {
	const ledgerId = import.meta.env.VITE_LEDGER_ID;
	const baseUrl = import.meta.env.VITE_NEXUS_URL;
	const apiKey = import.meta.env.VITE_API_KEY;
	const url = new URL(baseUrl + "/query");

	const queryLuciasCreds = {
		from: ledgerId,
		"@context": {
			acd: "https://academic-credential-dataset.net/ns/",
			clr: "https://purl.imsglobal.org/spec/vc/ob/vocab.html#",
			vc: "https://www.w3.org/2018/credentials/v1",
		},
		where: {
			"@id": "?credentials",
			"@type": "acd:Credential",
			"clr:credentialSubject": {
				"acd:recipient": {
					"@id": "acd:learners/lucialong3",
				},
			},
		},
		select: {
			"?credentials": ["*"],
		},
	};

	const { data, isLoading, error, mutate } = useSWR(url.href, (url) =>
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify(queryLuciasCreds),
		}).then((res) => res.json())
	);

	const elements = [
		{
			data: { id: "a" },
		},
		{
			data: { id: "b" },
		},
		{
			data: { id: "c" },
		},
		{
			data: { id: "d" },
		},
		{
			data: { id: "ab", source: "a", target: "b" },
		},
		{
			data: { id: "cd", source: "c", target: "d" },
		},
	];

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
			<CytoscapeComponent
				elements={elements}
				style={{ width: "100%", height: "100%" }}
				stylesheet={stylesheet}
				layout={{
					name: "grid",
					rows: 1,
				}}
			/>
		</div>
	);
}

export default App;
