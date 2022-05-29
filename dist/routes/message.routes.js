"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var error_utils_1 = require("../utils/error.utils");
var message_service_1 = __importDefault(require("../controllers/message.service"));
var router = (0, express_1.Router)();
router.post('/', function (req, res) {
    var message = {
        id: 0,
        name: req.body.name,
        companyName: req.body.companyName,
        phoneNumber: req.body.phoneNumber
    };
    message_service_1["default"].messageSection(message)
        .then(function (messages) { return res.send({ message: 'Your message has been sent!', messages: messages }); })["catch"](function (err) { return res.status(500).send((0, error_utils_1.handlerError)(err)); });
});
router["delete"]('/:id', function (req, res) {
    message_service_1["default"].remmoveMessage(+req.params.id)
        .then(function (deletedMessage) { return res.send({ message: 'The message has been deleted!', deletedMessage: deletedMessage }); })["catch"](function (err) { return res.status(500).send((0, error_utils_1.handlerError)(err)); });
});
router["delete"]('/', function (req, res) {
    message_service_1["default"].remmoveAllMessage()
        .then(function (deletedAll) { return res.send({ message: 'All deleted!', deletedAll: deletedAll }); })["catch"](function (err) { return res.status(500).send((0, error_utils_1.handlerError)(err)); });
});
router.get('/findByName/:name', function (req, res) {
    message_service_1["default"].findByNameMessage(req.params.name)
        .then(function (findName) { return res.send({ message: 'The name found!', findName: findName }); })["catch"](function (err) { return res.status(500).send((0, error_utils_1.handlerError)(err)); });
});
exports["default"] = router;
//# sourceMappingURL=message.routes.js.map