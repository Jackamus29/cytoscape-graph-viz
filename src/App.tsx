import useSWR from "swr";
import { Graph } from "./components/Graph";

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

	return (
		<Graph
			queryResults={data}
			isLoading={isLoading}
			error={error}
			mutate={mutate}
		/>
	);
}

export default App;
