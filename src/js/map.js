var Map = ViewModel.extend({
    el: '.map',
    arr: [],
    game: undefined,
    constructor: function (game) {
        this.game = game;
        this._super();

        this.modes.army = new MapModeArmy(this);
        this.modes.settlement = new MapModeSettlement(this);

    },
    attributes: {
        size_x: 5,
        size_y: 5
    },

    modes: {},
    currentMode: undefined,

    setMode: function (mode, options) {
        var lastMode = this.modes[this.currentMode];
        var currentMode = this.modes[mode];

        if (lastMode != currentMode && lastMode) {
            lastMode.deactivate();
            lastMode.undelegateEvents();
        }

        this.currentMode = mode;

        if (currentMode) {
            currentMode.delegateEvents();
            currentMode.activate(options);
        }


    },

    generateHexagons: function () {
        for (var j = 0; j < this.prop('size_y'); j++) {
            var row = [];
            this.arr.push(row);
            for (var i = 0; i < this.prop('size_x'); i++) {
                var hex = new Hex({
                    game: this.game,
                    map: this,
                    x: i,
                    y: j
                });

                row.push(hex);
            }
        }
    },
    drawHexagons: function () {
        var $map = this.$('.hexagons');
        $map.empty();
        for (var j = 0; j < this.prop('size_y'); j++) {
            for (var i = 0; i < this.prop('size_x'); i++) {
                var hex = this.arr[j][i];
                hex.$el.css({
                    left: hex.prop('left'),
                    top: hex.prop('top')
                })
                $map.append(hex.$el);
            }
        }
    },


    addBuilding: function (building, hex) {
        this.$('.buildings').append(building.$el);
        this.game.copyPosition(building.$el, hex);
    },

    addArmy: function (army, hex) {
        this.$('.units').append(army.$el);
        army.setPosition(hex);
    },
    highlightHexagons: function (hexagons) {
        this.$('.highlighted').removeClass('highlighted');
        _.each(hexagons, function (hex) {
            hex.$el.addClass('highlighted');
        });
    },
    line: function (from, to) {
        var result = [from];
        var tx = to.prop('pos_x'),
            ty = to.prop('pos_y');

        var current = from;
        while (current != to) {
            current = _.min(this.siblings(current), function (hex) {
                return Math.abs(hex.prop('pos_x') - tx) + Math.abs(hex.prop('pos_y') - ty) / 2;
            });
            result.push(current);
        }
        return result;
    },
    siblings: function (hex) {
        var x = hex.prop('pos_x'),
            y = hex.prop('pos_y');
        return (x % 2) ?
            _.compact([
                this.at(x, y - 1),
                this.at(x, y + 1),
                this.at(x - 1, y),
                this.at(x + 1, y),
                this.at(x - 1, y + 1),
                this.at(x + 1, y + 1)
            ]) : _.compact([
            this.at(x, y - 1),
            this.at(x, y + 1),
            this.at(x - 1, y),
            this.at(x + 1, y),
            this.at(x - 1, y - 1),
            this.at(x + 1, y - 1)
        ]);
    },
    at: function (x, y) {
        if (!this.arr[y]) {
            return;
        }
        return this.arr[y][x];
    }
});


var MapMode = ViewModel.extend({
    el: '.map',
    constructor: function (map) {
        this.map = map;
        this._super();
        this.undelegateEvents();
    },
    events: {
        'mouseenter .hex': 'over',
        'mouseleave': 'leave',
        'click .hex': 'click'
    },
    deactivate: function (options) {

    },
    activate: function (options) {

    },
    getHex: function (e) {
        var $el = $(e.currentTarget);
        return this.map.at($el.attr('x'), $el.attr('y'));
    },
    over: function () {

    },
    leave: function () {

    },
    click: function () {

    }
});


var MapModeArmy = MapMode.extend({
    activate: function (army) {
        if (this.currentArmy == army) {
            this.undelegateEvents();
            this.map.game.deselect();
            return;
        }
        this.currentArmy = army;
    },
    deactivate: function () {
        this.currentArmy = undefined;
        this.leave();
    },
    leave: function () {
        this.$('.highlighted').removeClass('highlighted');
    },
    over: function (e) {
        this.map.highlightHexagons(this.map.line(this.currentArmy.hex, this.getHex(e)));
    },
    click: function (e) {
        this.currentArmy.move(this.getHex(e));
    }
});


var MapModeSettlement = MapMode.extend({
    activate: function (settlement) {
        this.settlement = settlement;
        this.map.highlightHexagons(this.getAroundHexes());
    },
    deactivate: function () {
        this.$('.highlighted').removeClass('highlighted');
    },
    getAroundHexes: function () {
        var map = this.map;
        var settlement = this.settlement;
        var hexes = [];

        hexes = hexes.concat(map.siblings(settlement.hex));
        settlement.buildings.each(function (building) {
            hexes = hexes.concat(map.siblings(building.hex));
        });

        return hexes;
    },
    leave: function () {

    },
    over: function (e) {

    },
    click: function (e) {
    }
});


