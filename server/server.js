import http from "http";
import app from "./app.js";

const server = http.createServer(app);

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
