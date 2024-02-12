import "dotenv/config";
import request from "supertest";

import { server as app } from "../index";

describe("/users", () => {
  const baseURL = `/api/users`;
  const server = request(app);

  test("should return empty array", (done) => {
    server.get(baseURL).expect(200, {}, done);
  });
});
