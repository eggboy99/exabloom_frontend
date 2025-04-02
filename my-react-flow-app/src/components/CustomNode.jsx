import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { TbMessage2Share } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";
import { TbArrowFork } from "react-icons/tb";
import styles from "../assets/css_modules/CustomNode.module.css";

// Return the icon that matches the node label
const GetIcon = (value) => {
  if (value === "Start Node") {
    return <TbMessage2Share color="#52b788" />;
  } else if (value == "Action Node") {
    return <FaUserEdit color="#8ecae6" />;
  } else if (value === "if Else") {
    return <TbArrowFork color="#fae588" />;
  } else {
    return null;
  }
};

const CustomNode = ({ data }) => {
  return (
    // ensures that END, Branch and Else Nodes are style differently from the rest
    <div
      className={
        data.label === "END" ||
        data.label.search("Branch") !== -1 ||
        data.label.search("Else") !== -1
          ? styles.conditionNode
          : styles.actionNode
      }
    >
      <Handle type="target" position={Position.Top} />
      <div className={styles.nodeDetails}>
        <div
          className={GetIcon(data.label) !== null ? styles.iconContainer : ""}
        >
          {GetIcon(data.label)}
        </div>
        <label
          htmlFor=""
          className={data.label === "Start Node" && styles.green}
        >
          {data.label}
        </label>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default CustomNode;
