var Player = Model.extend({
    settlements: [],
    armies: [],
    constructor: function (game) {
        this.game = game;
        this._super();
    },
    addSettlement: function (hex) {
        var settlement = new Settlement(this.game, this);
        settlement.hex = hex;
        this.settlements.push(settlement);
        this.game.map.addBuilding(settlement, hex);
        return settlement;
    },
    addArmy: function (units, hex) {
        var army = new Army(this.game, this, units);
        this.armies.push(army);
        this.game.map.addArmy(army, hex);
        return army;
    },
    removeArmy: function (army) {
        this.armies.splice(this.armies.indexOf(army), 1);
    }
});