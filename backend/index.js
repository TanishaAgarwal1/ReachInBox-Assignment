"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = require("./src/routes/authRoutes");
const emailRoutes_1 = require("./src/routes/emailRoutes");
const queue_1 = require("./src/bullmq/queue");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use('/auth', authRoutes_1.authRoutes);
app.use('/emails', emailRoutes_1.emailRoutes);
// Initialize queues
(0, queue_1.initQueues)();
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
