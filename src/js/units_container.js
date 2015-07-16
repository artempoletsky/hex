var UnitsContainer = ViewModel.extend({
    constructor: function (game, player, units) {
        var self = this;
        self.game = game;
        self.player = player;
        _.each(units, self.addUnit, self);
        self._super();
    },
    getActions: function () {
        var result = [];
        _.each(this.units, function (unit) {
            result=result.concat(unit.actions);
        });
        return result;
    },
    units: [],
    addUnit: function (unit) {
        unit.container = this;
        this.units.push(unit);
    },
    removeUnit: function (unit) {
        unit.container = undefined;
        this.units.splice(this.units.indexOf(unit), 1);
        if(this.units.length==0){
            this.trigger('empty');
        }
    }
});