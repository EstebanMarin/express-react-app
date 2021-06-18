"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import axios from "axios";
const app = express_1.default();
app.get([
    // ignore; endpoint for easily viewing the default server
    // response on CodeSandbox
    "/",
    // endpoint initially used by the React app
    "/api/test-endpoint"
], (req, res) => {
    res.status(200).json({ test: "hello world!" });
});
app.get("/api/users/:username", async (req, res) => {
    // your code here!
    console.log("Hello there");
    res.status(200).json({ test: "hello there" });
});
exports.default = app;
//# sourceMappingURL=app.js.map