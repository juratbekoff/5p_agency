"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var message_routes_1 = __importDefault(require("./routes/message.routes"));
var publish_routes_1 = __importDefault(require("./routes/publish.routes"));
var carusel_routes_1 = __importDefault(require("./routes/carusel.routes"));
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use('/message', message_routes_1["default"]);
app.use('/news', publish_routes_1["default"]);
app.use('/carusel', carusel_routes_1["default"]);
var PORT = process.env.PORT || 8085;
app.listen(PORT, function () {
    console.log('Server is running ...');
});
//# sourceMappingURL=server.js.map