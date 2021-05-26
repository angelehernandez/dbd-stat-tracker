"use strict";

const resetDB = require("../../config/scripts/populateDB")

const Killer = require("./schema/Killer");
const Survivor = require("./schema/Survivor");

const express = require("express");
const router = express.Router();

// completely resets your database.
// really bad idea irl, but useful for testing
router.route("/reset")
    .get((_req, res) => {
        resetDB(() => {
            res.status(200).send({
                message: "Data has been reset."
            });
        });
    });

router.route("/")
    .get((_req, res) => {
        console.log("GET /");
        res.status(200).send({
            data: "App is running."
        });
    });

module.exports = router;