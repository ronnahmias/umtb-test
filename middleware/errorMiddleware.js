function errorMiddleware(err, req, res, next) {
  const requestId = req.requestId || "unknown";
  console.error(
    JSON.stringify({
      level: "Error",
      requestId,
      method: req.method,
      path: req.url,
      startTime: req.startTime || Date.now(),
      endTime: Date.now(),
      totalTimeInMs: 0,
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
      user: req.user || "",
      errors: err.stack || err.message,
    })
  );
  res.status(500).json({ error: "Internal Server Error" });
}

module.exports = errorMiddleware;
