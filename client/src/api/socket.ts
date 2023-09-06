import io from "socket.io-client";
import { serverUrl } from "./apiClient";

const socket = io(serverUrl, { transports: ["websocket"] });

export default socket;
