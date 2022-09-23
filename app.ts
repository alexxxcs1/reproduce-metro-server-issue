import express from "express";
import Metro from 'metro'
import { ConfigT, loadConfig } from "metro-config";
import path from 'path';

const app = express();
const port = 3001;
app.get('/', (_, res) => {
    // for server healthcheck
    res.end(new Date().getTime().toString());
})
loadConfig().then(async (baseConfig) => {
    const config:ConfigT = Object.assign({}, baseConfig, {
        projectRoot: path.resolve(__dirname, './src'),
        // no transformer
        server: {
            ...baseConfig.server,
            port: port
        }
    });
    //@ts-ignore
    const connectMiddleware = await Metro.createConnectMiddleware(config);
    app.use(connectMiddleware.middleware);
});

app.listen(port, () => {
    console.log('now server started!')
})