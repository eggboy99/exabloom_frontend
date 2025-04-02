import { BaseEdge, getStraightPath, EdgeLabelRenderer } from "@xyflow/react";
import styles from "../assets/css_modules/CustomEdge.module.css";
import { FiPlus } from "react-icons/fi";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
  data,
  source,
  target,
}) => {
  // Destructure the return array vlaue
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const onEdgeClick = (event) => {
    event.stopPropagation();
    const newNodeId = `node-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      data: { label: "Action Node" },
      position: { x: 0, y: (sourceY + targetY) / 2 },
      type: "customNode",
    };

    data.setNodes((nodes) => {
      return [...nodes, newNode];
    });

    const sourceToNewEdge = {
      id: `${source}-${newNodeId}`,
      source: source,
      target: newNodeId,
      label: <FiPlus color="#212529" size="2em" />,
      data: data,
      type: "custom-edge",
    };

    const newToTargetEdge = {
      id: `${newNodeId}-${target}`,
      source: newNodeId,
      target: target,
      label: <FiPlus color="#212529" size="2em" />,
      data: data,
      type: "custom-edge",
    };

    data.setEdges((edges) => {
      const filteredEdges = edges.filter((e) => e.id !== id);
      return [...filteredEdges, sourceToNewEdge, newToTargetEdge];
    });
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      {label && (
        <EdgeLabelRenderer>
          <div
            className={styles.edge}
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
          >
            <button className={styles.addNodeButton} onClick={onEdgeClick}>
              {label}
            </button>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default CustomEdge;
