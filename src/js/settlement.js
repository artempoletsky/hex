var Settlement = Building.extend({
    buildings: undefined,
    storage: undefined,

    unitsContainer: undefined,
    initialize: function () {
        this.buildings = new Collection();
        this.storage = new Resources();
        this.unitsContainer = new UnitsContainer(this.game, this.player, []);
    },
    removeBuilding: function (building) {
        this.buildings.cutByCid(building.cid);
    },
    build: function (hex, building_id) {
        var b = new BuildingsList[building_id](this.game, this.player);
        b.settlement = this;
        b.hex = hex;

        if (this.storage.checkEnoughResources(b.prop('cost'))) {
            this.storage.subtract(b.prop('cost'));
        } else {
            this.game.alert('Недостаточно ресурсов для постройки здания');
            return;
        }


        this.buildings.add(b);
        this.game.map.addBuilding(b, hex);
    },

    turn: function () {
        var models = this.buildings.models.slice(0);
        _.each(models, function (building) {
            building.turn();
        });
    }
});