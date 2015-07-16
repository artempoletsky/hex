var Unit = Model.extend({
    actions: [
        {
            name: 'buildSettlement',
            description: 'Построить поселение',
            run: function () {
                var army= this.container;
                var settlement = army.player.addSettlement(army.hex);
                settlement.storage.transfer(army.storage);
                army.game.selectSettlement(settlement);
                army.removeUnit(this);
            }
        }
    ],
    container: undefined,
    initialize: function () {
        var self = this;
        _.each(this.actions, function (action) {
            action.self = self;
        });
    }
});