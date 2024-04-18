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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Player_1 = require("../models/Player");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const query = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let result = yield Player_1.PlayerModel.find({});
            res.status(200).send(result);
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error while getting documents");
        }
    });
    query();
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Invalid id");
    }
    else {
        const query = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let result = yield Player_1.PlayerModel.findById(id).exec();
                if (!result) {
                    res.status(404).send("Player not foud");
                }
                else {
                    res.status(200).send(result);
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Error while getting document");
            }
        });
        query();
    }
});
router.post("/", (req, res) => {
    let document = new Player_1.PlayerModel(req.body);
    const query = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let result = yield document.save();
            res.status(200).send(result);
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error while saving document");
        }
    });
    query();
});
router.put("/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        res.send("Invalid id");
    }
    else {
        const query = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield Player_1.PlayerModel.findByIdAndUpdate(id, {
                    name: req.body.name,
                    birthDate: req.body.birthDate,
                    biography: req.body.biography,
                }, {
                    returnDocument: "after",
                });
                if (!result) {
                    res.status(404).send("Player not foud");
                }
                else {
                    res.status(200).send(result);
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Error while updating document");
            }
        });
        query();
    }
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        res.send("Invalid id");
    }
    else {
        const query = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield Player_1.PlayerModel.findByIdAndDelete(id);
                if (!result) {
                    res.status(404).send("Player not foud");
                }
                else {
                    res.status(200).send(result);
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Error while updating document");
            }
        });
        query();
    }
});
exports.default = router;
