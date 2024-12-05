"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const generative_ai_1 = require("@google/generative-ai");
dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('Error: API key is not set.');
    process.exit(1);
}
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        candidateCount: 1,
        stopSequences: ["x"],
        maxOutputTokens: 2000,
        temperature: 1.0,
    },
});
//const prompt = "give step by step instructions on how to create a mern project";
const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: [{ text: "Hello, I have 2 dogs in my house." }],
        },
        {
            role: "user",
            parts: [{ text: "One of them is golden retriever and other one a german shepherd" }],
        },
        // {
        //   role: "model",
        //   parts: [{ text: "Great to meet you. What would you like to know?" }],
        // },
    ],
});
(async () => {
    var _a, e_1, _b, _c, _d, e_2, _e, _f;
    try {
        let result = await chat.sendMessageStream("How many dogs are in my house? and how are their personalities?");
        try {
            // let result = await chat.sendMessageStream("I have 2 dogs in my house.");
            for (var _g = true, _h = __asyncValues(result.stream), _j; _j = await _h.next(), _a = _j.done, !_a; _g = true) {
                _c = _j.value;
                _g = false;
                const chunk = _c;
                const chunkText = chunk.text();
                process.stdout.write(chunkText);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_g && !_a && (_b = _h.return)) await _b.call(_h);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            // result = await chat.sendMessageStream("How many dogs are in my house?");
            for (var _k = true, _l = __asyncValues(result.stream), _m; _m = await _l.next(), _d = _m.done, !_d; _k = true) {
                _f = _m.value;
                _k = false;
                const chunk = _f;
                const chunkText = chunk.text();
                process.stdout.write(chunkText);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_k && !_d && (_e = _l.return)) await _e.call(_l);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    catch (error) {
        console.error('Error generating content:', error);
    }
})();
