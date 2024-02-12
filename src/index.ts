import "dotenv/config";
import http from "node:http";
import { usersHandler } from "./endpoints/users";

const { PORT } = process.env;
const port = Number(PORT);
const hostname = "127.0.0.1";

const endpointHandlers: { [key: string]: http.RequestListener } = {
  users: usersHandler,
};

export const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${hostname}:${port}`);
  const [, api, method] = url.pathname.split("/");
  const isAPIRequest = api === "api";
  const isExistedAPI = Boolean(endpointHandlers[method]);

  if (!isAPIRequest || !isExistedAPI) {
    res.statusCode = 404;
    res.end("The end point doesn't exist");
    return;
  }

  try {
    await endpointHandlers[method](req, res);
  } catch {
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
