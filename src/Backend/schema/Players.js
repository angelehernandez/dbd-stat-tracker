"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayersSchema = new Schema({
    survivors: [{
        type: Schema.Types.ObjectId, 
        ref: "Survivor"
    }],
    killer: {
        type: Schema.Types.ObjectId,
        ref: "Killer"
    }
});

PlayersSchema.statics.create = function(obj) {
    const Players = mongoose.model("Players", PlayersSchema);
    const player = new Players();
    player.survivors = obj.survivors;
    player.killer = obj.killer;
    return player;
}

module.exports = mongoose.model("Players", PlayersSchema);
