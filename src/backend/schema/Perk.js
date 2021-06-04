"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PerkSchema = new Schema({
    name: {
        type: Schema.Types.String
    },
    type: {
        type: Schema.Types.String
    }
});

PerkSchema.statics.create = function(obj) {
    const Perk = mongoose.model("Perk", PerkSchema);
    const perk = new Perk();
    perk.name = obj.name;
    perk.type = obj.type;
    return perk;
}

module.exports = mongoose.model("Perk", PerkSchema);
