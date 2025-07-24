"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const genai_1 = require("@google/genai");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // 
app.use(express_1.default.json());
//just 1 API Endpoint route for making a request to the LLM!
const ai = new genai_1.GoogleGenAI({});
app.post("/llmCall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userQuery } = req.body;
    //making LLM Call.
    const response = yield ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userQuery,
    });
    res.json({
        text: response.text
    });
}));
app.listen(3000);
