"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const msw_1 = require("msw");
const node_1 = require("msw/node");
const react_2 = require("@testing-library/react");
const MainContent_1 = __importDefault(require("../MainContent"));
const server = node_1.setupServer(
// describe the requests to mock
msw_1.rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.json({ test: "hello world!" }));
}));
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe("MainContent", () => {
    test("loads and displays greeting", async () => {
        react_2.render(<MainContent_1.default />);
        expect(react_2.screen.getByText("Loading... please wait!")).toBeDefined();
    });
});
//# sourceMappingURL=MainContent.test.js.map