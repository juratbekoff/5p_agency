"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var uuid_1 = require("uuid");
var multer_1 = __importDefault(require("multer"));
var carusel_service_1 = __importDefault(require("../controllers/carusel.service"));
var error_utils_1 = require("../utils/error.utils");
var router = (0, express_1.Router)();
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/carusel/');
    },
    filename: function (req, file, cb) {
        cb(null, (0, uuid_1.v4)() + '.png');
    }
});
var upload = (0, multer_1["default"])({ storage: storage });
router.post('/', upload.single('image'), function (req, res) {
    var file = req.file;
    var carusel = {
        id: 0,
        image: file.filename,
        name: req.body.name,
        teamPosition: req.body.teamPosition
    };
    carusel_service_1["default"].CreateCarusel(carusel)
        .then(function (published) { return res.send({ message: 'Your image and carusel message has been upload!', published: published }); })["catch"](function (err) { return res.status(500).send((0, error_utils_1.handlerError)(err)); });
});
router.get('/', function (req, res) {
    carusel_service_1["default"].GetAllCreatedCarusels()
        .then(function (published) { return res.send({ message: 'All carusel details!', published: published }); })["catch"](function (err) { return res.status(500).send((0, error_utils_1.handlerError)(err)); });
});
router.put('/:id', function (req, res) {
    carusel_service_1["default"].UpdateCreatedCarusels(+req.params.id, req.body)
        .then(function (published) { return res.send({ message: 'This carusel updated!', published: published }); })["catch"](function (err) { return res.status(500).send((0, error_utils_1.handlerError)(err)); });
});
router["delete"]('/:id', function (req, res) {
    carusel_service_1["default"].DeleteCreatedCarusel(+req.params.id)
        .then(function (published) { return res.send({ message: "This carusel deleted!", published: published }); })["catch"](function (err) { return res.status(500).send((0, error_utils_1.handlerError)(err)); });
});
exports["default"] = router;
//# sourceMappingURL=carusel.routes.js.map