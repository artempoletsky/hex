var Building = ViewModel.extend({

    hex: undefined,
    game: undefined,
    settlement: undefined,

    _defaults: {
        name: 'house',
        title: 'building name',
        is_built: false,
        health: 100,
        breakStrength: 10,
        breakChance: 0.5,
        description: '',
        ground: [],
        cost: {
        },
        production: {
        }
    },

    events: {
        'click': 'onClick'
    },

    onClick: function(){
        this.game.selectSettlement(this.settlement||this);
    },

    constructor: function (game, player) {
        this.game = game;
        this.player = player;
        this.defaults = _.extend({}, this._defaults, this.defaults);
        this.el = ViewModel.tmpl.getRawTemplate('building');
        this._super();
    },

    remove: function () {
        this.hex.removeBuilding();
        this.settlement.removeBuilding(this);
    },

    produce: function () {
        this.settlement.storage.add(_.extend(this.prop('production'), {
            food: -1
        }));
    },
    turn: function () {

        if (this.prop('breakChance') > Math.random()) {

            this.prop('health', this.prop('health') - this.prop('breakStrength'));
        }
        if (this.prop('health') < 100) {

            var percentDamage = (100 - this.prop('health')) / 100;
            var repairPrice = _.foldl(this.prop('cost'), function (res, val, name) {
                res[name] = val * percentDamage;
                return res;
            }, {});

            var storage = this.settlement.storage;

            if (storage.checkEnoughResources(repairPrice)) {
                storage.subtract(repairPrice);
                this.prop('health', 100);
            }

            if (this.prop('health') > 0) {
                this.produce();
            }
        }
    }
});
