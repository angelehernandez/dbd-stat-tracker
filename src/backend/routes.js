"use strict";

const resetDB = require("../../config/scripts/populateDB")

const Killer = require("./schema/Killer");
const Survivor = require("./schema/Survivor");
const Perk = require("./schema/Perk");

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
    .get((req, res) => {
        console.log("GET /survivors");
        Survivor.find({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
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
        
        // check each survivor for required elements
        survivors.forEach((survivor, index) => {
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

            // check perks with database
            let perksFromDB = [];
            const perksLength = survivor.perks.length;
            survivor.perks.forEach((perk, jindex) => {
                // query for perk in DB
                Perk.findOne({ name: perk, type: "Survivor" })
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Survivor ${index+1}'s perk ${jindex+1} not found.`
                            });
                            return;
                        }
                        perksFromDB.push(data);
                    })
                    .then(() => {
                        // all perks found
                        if (perksLength === perksFromDB.length) {
                            // update perks field in survivor
                            survivor.perks = perksFromDB;

                            // create and save survivor entry
                            Survivor.create(survivor).save()
                                .then(() => {
                                    res.status(201).send({
                                        message: "All four survivors logged."
                                    });
                                    return;
                                })
                                .catch(err => {
                                    res.status(500).send(err);
                                    return;
                                });
                        };
                    })
                    .catch(err => {
                        res.status(500).send(err);
                        return;
                    });
            });
        });
    });

router.route("/killers")
    .get((req, res) => {
        console.log("GET /killers");
        Killer.find({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        console.log("POST /killers");

        // ensure input is NOT a list
        let killer = req.body;
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
        if (killer.score == null) {
            res.status(500).send({
                message: "Killer is missing a score."
            });
            return;
        };
        if (killer.kills == null) {
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

        // check perks with DB
        let perksFromDB = [];
        const perksLength = killer.perks.length;
        killer.perks.forEach((perk, jindex) => {
            // query for perk in DB
            Perk.findOne({ name: perk, type: "Killer" })
                .then(data => {
                    if (!data) {
                        res.status(404).send({
                            message: `Killer's perk ${jindex+1} not found.`
                        });
                        return;
                    }
                    perksFromDB.push(data);
                })
                .then(() => {
                    // all perks found
                    if (perksLength === perksFromDB.length) {
                        // update perks field in survivor
                        killer.perks = perksFromDB;

                        // create and save killer entry
                        Killer.create(killer).save()
                            .then(killer => {
                                res.status(201).send(killer);
                                return;
                            })
                            .catch(err => {
                                res.status(500).send(err);
                                return;
                            })
                    };
                })
        })

        // create and save killer entry
        Killer.create(killer).save()
            .then(killer => {
                res.status(201).send(killer);
                return;
            })
            .catch(err => {
                res.status(500).send(err);
                return;
            })
    });

router.route("/perks")
    .get((req, res) => {
        console.log("GET /perks");
        Perk.find({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        console.log("POST /perks");

        // functionality for lists and non-lists
        const perks = req.body;
        if (perks instanceof Array) {
            perks.forEach((perk, index) => {
                // check each perk for required elements
                if (!perk.name) {
                    res.status(500).send({
                        message: `Perk ${index+1} is missing a name.`
                    });
                    return;
                };
                if (!perk.type) {
                    res.status(500).send({
                        message: `Perk ${index+1} is missing a type.`
                    });
                    return;
                };
                // create and save each perk entry
                Perk.create(perk).save()
                    .then(perk => {
                        res.status(201).send(perk);
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
                return;
            })
        }
        else {
            // check perk for required elements
            if (!perks.name) {
                res.status(500).send({
                    message: `Perk is missing a name.`
                });
                return;
            };
            if (!perks.type) {
                res.status(500).send({
                    message: `Perk is missing a type.`
                });
                return;
            };
            // create and save each perk entry
            Perk.create(perks).save()
                .then(perks => {
                    res.status(201).send(perks);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
            return;
        };
    });


module.exports = router;