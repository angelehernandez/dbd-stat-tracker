"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PerkSchema = new Schema({
    name: {
        type: Schema.Types.String
    }
});

PerkSchema.statics.create = function(obj) {
    const Perk = mongoose.model("Perk", PerkSchema);
    const Perk = new Perk();
    perk.name = obj.name;
    return perk;
}

module.exports = mongoose.model("Perk", PerkSchema);
