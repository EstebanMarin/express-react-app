"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const msw_1 = require("msw");
const node_1 = require("msw/node");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const username = "mock_username";
const server = node_1.setupServer(
// describe the requests to mock.
msw_1.rest.get(`https://mauvelous-leopard-5257.twil.io/friend-detail?username=${username}`, (req, res, ctx) => {
    return res(ctx.json({
        friends: [
            "maranda_kjos",
            "jacquetta_hoelscher",
            "garth_coto",
            "leonor_mattis"
        ],
        uri: `/friend-detail?username=${username}`
    }));
}), msw_1.rest.get(`https://mauvelous-leopard-5257.twil.io/plays-detail?username=${username}`, (req, res, ctx) => {
    return res(ctx.json({
        plays: [
            "E75C38C1-E2BB-BAF6-620B-9255D035B693",
            "E75C38C1-E2BB-BAF6-620B-9255D035B693",
            "68B4D809-4B4F-F735-EB92-E5B17C99220B"
        ],
        uri: `/plays/${username}`
    }));
}));
beforeAll(() => {
    server.listen();
});
afterAll(() => {
    server.close();
});
describe("/api/users", () => {
    it("should return a response for this testing endpoint", async () => {
        const response = await supertest_1.default(app_1.default).get(`/api/users`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveAttribute("test");
    });
});
describe("/api/users/:username", () => {
    // your test here!
    expect(true).toBe(true);
});
//# sourceMappingURL=app.test.js.map