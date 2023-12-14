import { ElementDefinition } from "cytoscape";

type CytoscapeModel = {
	elements: ElementDefinition[];
};

const cyifyResults: (data: unknown) => CytoscapeModel = function(data) {
  if (data === undefined || !Array.isArray(data) || data.length === 0) {
    return [];
  }
  return { elements: cyifyNodes(data) };
}

const cyifyNodes: (data: unknown[]) => ElementDefinition[] = function(data) {
  const elements = data.flatMap((item: unknown) => {
    const node = { group: "nodes", data: { id: item["@id"] } };
    const traversals = Object.entries(item).flatMap((entry: [string, unknown]) => {
      const prop = entry[0];
      const obj = entry[1];

      let refNodes: ElementDefinition[] = [];
      let edges: ElementDefinition[] = [];

      if (obj !== null && obj !== undefined && typeof obj === "object") {
        let nodeset;
        if (Array.isArray(obj)) {
          nodeset = obj.filter(o => {
            return (typeof o === "object" && ("@id" in o));
          });
        } else {
          nodeset = ("@id" in obj) ? [obj] : [];
        }
        refNodes = cyifyNodes(nodeset);
        edges = refNodes.filter(refElement => refElement.group === "nodes").flatMap(refNode => {
          return {
            group: "edges",
            data: {
              id: `${node.data.id}->${refNode.data["id"]}`,
              source: node.data.id,
              target: refNode.data["id"],
              label: prop
            }
            }
        });
      }
      return [...refNodes, ...edges];
    });
    return [node, ...traversals];
  })
  return elements;
}

export {
  cyifyResults
}