import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";

import MainContent from "../MainContent";

const server = setupServer(
  // describe the requests to mock
  rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.json({ test: "hello world!" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("MainContent", () => {
  test("loads and displays greeting", async () => {
    render(<MainContent />);

    expect(screen.getByText("Loading... please wait!")).toBeDefined();
  });
});
