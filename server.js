/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = Number.parseInt(process.env.PORT || "3000", 10);

console.log("Starting server", {
  node: process.version,
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  cwd: process.cwd(),
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      const startedAt = Date.now();
      const parsedUrl = parse(req.url, true);

      res.on("finish", () => {
        console.log(
          JSON.stringify({
            time: new Date().toISOString(),
            method: req.method,
            path: parsedUrl.pathname,
            status: res.statusCode,
            durationMs: Date.now() - startedAt,
          }),
        );
      });

      try {
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error occurred handling", parsedUrl.pathname, err);
        res.statusCode = 500;
        res.end("internal server error");
      }
    }).listen(port, hostname, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error("Next.js preparation failed:", error);
    process.exit(1);
  });
