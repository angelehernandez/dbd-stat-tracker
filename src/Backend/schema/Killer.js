"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KillerSchema = new Schema({
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
    power: {
        type: Schema.Types.String
    },
    addOns: [Schema.Types.String],
    score: {
        type: Schema.Types.Number
    },
    kills: {
        type: Schema.Types.Number
    }
});

KillerSchema.statics.create = function(obj) {
    const Killer = mongoose.model("Killer", KillerSchema);
    const killer = new Killer();
    killer.rank = obj.rank;
    killer.name = obj.name;
    killer.perks = obj.perks;
    killer.offering = obj.offering;
    killer.power = obj.power;
    killer.addOns = obj.addOns;
    killer.score = obj.score;
    killer.kills = obj.kills;
    return killer;
}

module.exports = mongoose.model("Killer", KillerSchema);
