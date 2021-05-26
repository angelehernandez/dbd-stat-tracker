"use strict";

const Killer = require("../../src/backend/schema/Killer");
const Survivor = require("../../src/backend/schema/Survivor");
const data = require("../data.json");
require("dotenv").config();

const env = "" + process.env.NODE_ENV;

const configObj = require("../config");
const config = configObj[env || "development"];
const mongoose = require("mongoose");


const populate = (callback) => {
    // console.log("Trying to connect to database...");
    mongoose.connect(config.database, config.mongoConfig, err => {
        if (err) {
            console.log("Could not connect to database.");
        }
        // console.log("Clearing database...");
        const schemas = [ Killer, Survivor ];
        Promise
            .all(
                // first delete any data that currently exists:
                schemas.map(schema => schema.deleteMany())
            )
            .then(() => {
                return Killer.insertMany(data.killers);
            })
            .then(() => {
                return Survivor.insertMany(data.survivors);
            })
            .catch(err => {
                console.log(err);
                process.exit(1);
            })
            .finally(() => {
                // console.log("Database populated successfully.");
                if (callback) {
                    callback();
                } else {
                    console.log('Exiting');
                    process.exit(0);
                }
            });
    });
};

module.exports = populate;
