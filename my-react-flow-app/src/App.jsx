import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "./components/CustomNode";
import CustomEdge from "./components/CustomEdge";
import { FiPlus } from "react-icons/fi";

const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  "custom-edge": CustomEdge,
};

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  useEffect(() => {
    // Retreive the nodes and edges from the local storage
    const savedNodes = localStorage.getItem("nodes");
    const savedEdges = localStorage.getItem("edges");

    // If exists, we convert them from JSON string to array
    if (savedNodes && savedEdges) {
      setNodes(JSON.parse(savedNodes));
      setEdges(JSON.parse(savedEdges));
    } else {
      const initialNodes = [
        {
          id: "1",
          data: { label: "Start Node", action: "Start" },
          position: { x: 0, y: 0 },
          type: "customNode",
        },
        {
          id: "2",
          data: { label: "END" },
          position: { x: 0, y: 500 },
          type: "customNode",
        },
      ];

      const initialEdges = [
        {
          id: "1-2",
          source: "1",
          target: "2",
          label: <FiPlus color="#212529" size="2em" />,
          type: "custom-edge",
        },
      ];

      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, []);

  useEffect(() => {
    if (nodes.length > 0) {
      const serializedNodes = JSON.stringify(nodes);
      localStorage.setItem("nodes", serializedNodes);
    }
  }, [nodes]);

  useEffect(() => {
    if (edges.length > 0) {
      const serializableEdges = edges.map((edge) => ({
        ...edge,
        label: edge.label ? "plus" : undefined, // Convert the React Icon componetn to a string format
      }));
      localStorage.setItem("edges", JSON.stringify(serializableEdges));
    }
  }, [edges]);

  const edgesWithReactElements = edges.map((edge) => ({
    ...edge,
    label:
      edge.label === "plus" ? (
        <FiPlus color="#212529" size="2em" /> // If edge.label is "plus" we store the React Icon component in the array data
      ) : (
        edge.label
      ),
    data: { setNodes, setEdges },
  }));

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    // React Flow uses its parent container dimensions value
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edgesWithReactElements}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
