"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const MainContent_1 = __importDefault(require("./MainContent"));
const rootElement = document.getElementById("root");
react_dom_1.default.render(<MainContent_1.default />, rootElement);
//# sourceMappingURL=index.js.map