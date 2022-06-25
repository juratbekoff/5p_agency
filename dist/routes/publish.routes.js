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
        cb(null, './uploads/news');
    },
    filename: function (req, file, cb) {
        cb(null, (0, uuid_1.v4)() + '.png');
    }
});
var upload = (0, multer_1["default"])({ storage: storage });
router.post('/', upload.single('image'), function (req, res) {
    var file = req.file;
    var publish = {
        id: 0,
        image: file.filename,
        title: req.body.title,
        sub_title: req.body.sub_title,
        message: req.body.message
    };
    publish_service_1["default"].publishMessage(publish)
        .then(function (published) { return res.send({ message: 'Your image and message has been upload!', published: published }); })["catch"](function (err) { return res.status(500).send((0, error_utils_1.handlerError)(err)); });
});
router.get('/', function (req, res) {
    publish_service_1["default"].GetAllPublished()
        .then(function (published) { return res.send({ message: 'All Published News in here!', published: published }); })["catch"](function (err) { return res.status(500).send((0, error_utils_1.handlerError)(err)); });
});
router.put('/:id', function (req, res) {
    publish_service_1["default"].UpdatePublishedById(+req.params.id, req.body)
        .then(function (updated) { return res.send({ message: 'Updated!', updated: updated }); })["catch"](function (err) { return res.status(500).send((0, error_utils_1.handlerError)(err)); });
});
router["delete"]('/:id', function (req, res) {
    publish_service_1["default"].DeletePublishMessage(+req.params.id)
        .then(function (published) { return res.send({ message: 'New Publish Deleted!!', published: published }); })["catch"](function (err) { return res.status(500).send((0, error_utils_1.handlerError)(err)); });
});
exports["default"] = router;
//# sourceMappingURL=publish.routes.js.map