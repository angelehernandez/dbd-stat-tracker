"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurvivorSchema = new Schema({
    rank: {
        type: Schema.Types.Number
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    perks: [Schema.Types.String],
    offering: {
        type: Schema.Types.String
    },
    item: {
        type: Schema.Types.String
    },
    addOns: [Schema.Types.String],
    score: {
        type: Schema.Types.Number
    },
    escaped: {
        type: Schema.Types.Boolean
    }
});

SurvivorSchema.statics.create = function(obj) {
    const Survivor = mongoose.model("Survivor", SurvivorSchema);
    const survivor = new Survivor();
    survivor.rank = obj.rank;
    survivor.name = obj.name;
    survivor.perks = obj.perks;
    survivor.offering = obj.offering;
    survivor.item = obj.item;
    survivor.addOns = obj.addOns;
    survivor.score = obj.score;
    survivor.escaped = obj.escaped;
    return survivor;
}

module.exports = mongoose.model("Survivor", SurvivorSchema);
