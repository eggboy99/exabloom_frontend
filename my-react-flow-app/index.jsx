import { createRoot } from "react-dom/client";
import App from "./src/App";
import "./src/assets/index.css";

const container = document.querySelector("#app");
const root = createRoot(container);

root.render(<App />);
