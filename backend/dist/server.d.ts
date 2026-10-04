import express, { Express } from 'express';
export declare function createApp(): Express;
export declare const app: express.Express;
export declare function startServer(): import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
