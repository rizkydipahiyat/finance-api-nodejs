"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./application/app");
const logging_1 = require("./application/logging");
app_1.app.listen(3000, () => {
    logging_1.logger.info('Listening on port 3000');
});
