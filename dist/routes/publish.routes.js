"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var uuid_1 = require("uuid");
var multer_1 = __importDefault(require("multer"));
var publish_service_1 = __importDefault(require("../controllers/publish.service"));
var error_utils_1 = require("../utils/error.utils");
var router = (0, express_1.Router)();
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'temps/');
    },
    filename: function (req, file, cb) {
        cb(null, (0, uuid_1.v4)() + '.png');
    }
});
var upload = (0, multer_1["default"])({ storage: storage });
router.post('/', upload.single('poster'), function (req, res) {
    var publish = {
        id: 0,
        image: req.body.file,
        title: req.body.title,
        sub_title: req.body.sub_title,
        message: req.body.message
    };
    publish_service_1["default"].publishMessage(publish)
        .then(function (published) { return res.send({ message: 'Your message has been sent!', published: published }); })["catch"](function (err) { return res.status(500).send((0, error_utils_1.handlerError)(err)); });
});
exports["default"] = router;
//# sourceMappingURL=publish.routes.js.map