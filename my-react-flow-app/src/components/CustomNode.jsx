import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { TbMessage2Share } from "react-icons/tb";
import { LuUserPen } from "react-icons/lu";
import { TbArrowFork } from "react-icons/tb";
import styles from "../assets/css_modules/CustomNode.module.css";

// Return the icon that matches the node label
const GetIcon = (value) => {
  if (value === "Start Node") {
    return <TbMessage2Share color="#52b788" size="2em" />;
  } else if (value == "Action Node") {
    return <LuUserPen color="#1f487e" size="2em" />;
  } else if (value === "if Else") {
    return <TbArrowFork color="#fae588" size="2em" />;
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
          className={
            data.label === "Start Node"
              ? styles.iconContainerSN
              : data.label === "Action Node"
              ? styles.iconContainerAN
              : data.label === "If Else"
              ? styles.iconContainerIEN
              : ""
          }
        >
          {GetIcon(data.label)}
        </div>
        <div className={styles.nodeLabelAndAction}>
          <label
            htmlFor=""
            className={data.label === "Start Node" && styles.green}
          >
            {data.label}
          </label>
          {data.action && <p className={styles.action}>{data.action}</p>}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default CustomNode;
