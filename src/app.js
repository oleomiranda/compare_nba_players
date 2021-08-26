"use strict";
exports.__esModule = true;
var express = require("express");
var control_1 = require("../controller/control");
var app = express();
app.get("/", control_1["default"].index);
app.get("/compare", control_1["default"].comparator);
app.listen(8081, function () { return console.log('RODANDO...'); });
