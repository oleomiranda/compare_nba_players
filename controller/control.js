"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var cheerio = require("cheerio");
var makeObject_1 = require("../helper/makeObject");
var playerInfo_1 = require("../helper/playerInfo");
var controller = /** @class */ (function () {
    function controller() {
    }
    controller.prototype.comparator = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var stats //evita type error na hora de passar para o regex.test 
            , name1, name2, year, regex, player1Data, player2Data, player1, player2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name1 = req.query.name1.toString().toUpperCase();
                        name2 = req.query.name2.toString().toUpperCase();
                        year = req.query.year.toString();
                        stats = req.query.stats.toString().split(",");
                        if (isNaN(parseInt(year))) { //verifica se o parametro year pode ser convertido para numero
                            return [2 /*return*/, res.status(401).json({ "Error": "Year need to be a number" })];
                        }
                        regex = /[\"\>\<\\\|\.\/\]\[\{\}\!\@\#\$\%\"\`]/i //regex para evitar caracteres especiais
                        ;
                        if (regex.test(name1) == true || regex.test(name2) == true || regex.test(year) == true || regex.test(stats) == true) {
                            return [2 /*return*/, res.status(401).json({ "Error": "Some input is invalid" })];
                        }
                        return [4 /*yield*/, playerInfo_1["default"](name1, year)];
                    case 1:
                        player1Data = _a.sent();
                        return [4 /*yield*/, playerInfo_1["default"](name2, year)
                            //verifica se algum dos nomes não foi encontrado e retorna qual não foi encontrado
                        ];
                    case 2:
                        player2Data = _a.sent();
                        //verifica se algum dos nomes não foi encontrado e retorna qual não foi encontrado
                        if (player1Data.data == undefined) {
                            return [2 /*return*/, res.status(404).json({ "Error": "The player " + name1 + " could not be found or doesn't have stats for this year" })];
                        }
                        if (player2Data.data == undefined) {
                            return [2 /*return*/, res.status(404).json({ "Error": "The player " + name2 + " could not be found or doesn't have stats for this year" })];
                        }
                        player1 = cheerio.load(player1Data.data);
                        player2 = cheerio.load(player2Data.data);
                        //passa os dados para criar o json que sera retornado para o usuario
                        makeObject_1["default"](name1, name2, player1, player2, stats, year)
                            .then(function (Object) { return res.status(200).json(Object); })["catch"](function (err) { return res.status(500).json(err); });
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    controller.prototype.index = function (req, res) {
        res.sendFile("./index.html", { root: "./src" });
    };
    return controller;
}());
exports["default"] = new controller();
