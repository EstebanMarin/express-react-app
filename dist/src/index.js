"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var MainContent_1 = __importDefault(require("./MainContent"));
var rootElement = document.getElementById("root");
react_dom_1.default.render(<MainContent_1.default />, rootElement);
