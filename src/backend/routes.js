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

// main functionality
router.route("/survivors")
    // .get((req, res) => {
    //     console.log("GET /doctors");

    //     // already implemented:
    //     Doctor.find({})
    //         .then(data => {
    //             res.status(200).send(data);
    //         })
    //         .catch(err => {
    //             res.status(500).send(err);
    //         });
    // })
    .post((req, res) => {
        console.log("POST /survivors");

        // ensure input is a list
        const survivors = req.body;
        if (!(survivors instanceof Array)) {
            res.status(400).send({message: "Survivors must be an array."});
            return;
        }
        else if (survivors.length !== 4) {
            res.status(400).send({message: "Four survivors required."});
            return;
        };
        
        survivors.forEach((survivor, index) => {
            // check each survivor for required elements
            if (!survivor.rank) {
                res.status(500).send({
                    message: `Survivor ${index+1} is missing a rank.`
                });
                return;
            };
            if (!survivor.score) {
                res.status(500).send({
                    message: `Survivor ${index+1} is missing a score.`
                });
                return;
            };
            if (!survivor.escaped) {
                res.status(500).send({
                    message: `Survivor ${index+1} is missing an escape status.`
                });
                return;
            };

            // check for optional elements
            if (!survivor.name) {
                survivor.name = "";
            };
            if (!survivor.perks) {
                survivor.perks = [];
            };
            if (!survivor.offering) {
                survivor.offering = "";
            };
            if (!survivor.item) {
                survivor.item = "";
            };
            if (!survivor.addOns) {
                survivor.addOns = [];
            };

            // create and save survivor entry
            Survivor.create(survivor).save()
                .then(survivor => {
                        res.status(201).send({
                            message: "All four survivors logged."
                        });
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    })
        });
    });

router.route("/killers")
    // .get((req, res) => {
    //     console.log("GET /doctors");

    //     // already implemented:
    //     Doctor.find({})
    //         .then(data => {
    //             res.status(200).send(data);
    //         })
    //         .catch(err => {
    //             res.status(500).send(err);
    //         });
    // })
    .post((req, res) => {
        console.log("POST /killers");

        // ensure input is NOT a list
        const killer = req.body;
        if (killer instanceof Array) {
            res.status(400).send({message: "Killer should not be an array."});
            return;
        };

        // check killer for required elements
        if (!killer.rank) {
            res.status(500).send({
                message: "Killer is missing a rank."
            });
            return;
        };
        if (!killer.power) {
            res.status(500).send({
                message: "Killer is missing a power."
            });
            return;
        }
        if (!killer.score) {
            res.status(500).send({
                message: "Killer is missing a score."
            });
            return;
        };
        if (!killer.kills) {
            res.status(500).send({
                message: "Killer is missing a kill count."
            });
            return;
        };

        // check for optional elements
        if (!killer.name) {
            killer.name = "";
        };
        if (!killer.perks) {
            killer.perks = [];
        };
        if (!killer.offering) {
            killer.offering = "";
        };
        if (!killer.addOns) {
            killer.addOns = [];
        };

        // create and save killer entry
        Killer.create(killer).save()
            .then(killer => {
                    res.status(201).send(killer);
                })
                .catch(err => {
                    res.status(500).send(err);
                })
    });

module.exports = router;