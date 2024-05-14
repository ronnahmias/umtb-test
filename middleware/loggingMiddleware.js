const { v4: uuidv4 } = require("uuid");

function loggingMiddleware(req, res, next) {
  const startTime = Date.now();
  const requestId = uuidv4();
  const logData = {
    level: "",
    requestId,
    method: req.method,
    path: req.url,
    startTime,
    input: {
      params: req.params,
      body: req.body,
    },
    metadata: {
      host: req.hostname,
      baseUrl: req.baseUrl,
      ipAddress: req.ip,
      headers: {
        origin: req.headers.origin,
        userAgent: req.headers["user-agent"],
      },
    },
    user: "",
    errors: "",
  };

  // Logging function to print the log data
  const log = (level, output, user) => {
    const endTime = Date.now();
    const totalTimeInMs = endTime - startTime;
    console.log(
      JSON.stringify({
        ...logData,
        level,
        endTime,
        totalTimeInMs,
        output,
        user,
      })
    );
  };

  res.on("finish", () => {
    const { statusCode } = res;
    const output = statusCode >= 400 ? res.statusMessage : "output was sent";
    const user = req.user ? req.user.email : "";
    log(statusCode >= 400 ? "Error" : "Info", output, user);
  });

  next();
}

module.exports = loggingMiddleware;
