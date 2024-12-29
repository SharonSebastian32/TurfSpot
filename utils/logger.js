import winston from "winston";

const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`;
  })
);

const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),

    new winston.transports.File({
      filename: "logs/app.log",
      level: "info",
    }),
  ],
});

logger.exceptions.handle(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf((info) => `EXCEPTION: ${info.message}`)
    ),
  }),
  new winston.transports.File({ filename: "logs/exceptions.log" })
);

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Promise Rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

export default logger;
