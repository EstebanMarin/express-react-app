import { rest } from "msw";
import { setupServer } from "msw/node";
import supertest from "supertest";

import app from "../app";

const username = "mock_username";

const server = setupServer(
  // describe the requests to mock.
  rest.get(
    `https://mauvelous-leopard-5257.twil.io/friend-detail?username=${username}`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          friends: [
            "maranda_kjos",
            "jacquetta_hoelscher",
            "garth_coto",
            "leonor_mattis",
          ],
          uri: `/friend-detail?username=${username}`,
        })
      );
    }
  ),
  rest.get(
    `https://mauvelous-leopard-5257.twil.io/plays-detail?username=${username}`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          plays: [
            "E75C38C1-E2BB-BAF6-620B-9255D035B693",
            "E75C38C1-E2BB-BAF6-620B-9255D035B693",
            "68B4D809-4B4F-F735-EB92-E5B17C99220B",
          ],
          uri: `/plays/${username}`,
        })
      );
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe("/api/users", () => {
  it("should return a response for this testing endpoint", async () => {
    const response = await supertest(app).get(`/api/users`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveAttribute("test");
  });
});

describe("/api/users/:username", () => {
  // your test here!
  expect(true).toBe(true);
});
