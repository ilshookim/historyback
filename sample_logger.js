/**
 * Created by jaykwon === jhkwon on 2018-07-06
 *
 * - 로그 시스템 정의
 * - 버전이 바뀌면 Function 구현 확인 필요.
 * - https://github.com/winstonjs/winston
 *
 * emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 (낮을수록 높다)
 */

const fs = require("fs");
const winston = require('winston');
const Config = require('config');

const logDir = Config.get('LOG.PATH');


if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

let options = {
    console: {
        colorize: true,
        handleExceptions: true,
        level: "debug"
    },
    rotateFile: {
        showLevel: true,
        filename: Config.get('LOG.FILENAME'),
        dirname: logDir,
        datePattern: 'YYYY-MM-DD-HH',
        handleExceptions: true,
        maxFiles: '30d'
    },
    file : {
        filename: "./logs/wms.log",
        level: "info",
        maxsize: (1024*1024)*500, // 500mb
        maxFiles: 2,
        tailable: true,

    }
};

const logPrintFormat = winston.format.printf(info => {
    return `${info.timestamp} - ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    level: Config.get('LOG.LEVEL'),
    format: winston.format.combine(
        //winston.format.label({ label: 'wms' }),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss:SSS',
        }),
        winston.format.simple(),
        winston.format.splat(),
        logPrintFormat
    ),
    transports: [
        new winston.transports.Console(options.console),
        new (require('winston-daily-rotate-file'))(options.rotateFile),
        new winston.transports.File(options.file)

    ],
    exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;