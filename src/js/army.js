var Army = UnitsContainer.extend({
    constructor: function (game, player, units) {
        this.el = ViewModel.tmpl.getRawTemplate('unit');
        this.steps = this.speed;
        this._super(game, player, units);
        this.on('empty', this.onEmpty, this);
    },

    onEmpty: function(){
        this.player.removeArmy(this);
        this.$el.remove();
    },

    hex: undefined,

    events: {
        'click': 'onClick'
    },
    onClick: function () {
        this.game.selectArmy(this);
    },
    setPosition: function (hex) {
        this.hex = hex;
        this.game.copyPosition(this.$el, hex);
    },
    steps: 5,
    speed: 5,
    path: [],
    turn: function () {
        this.steps = this.speed;
    },
    storage: new Resources({
        food: 0,
        wood: 0
    }),
    move: function (hex) {
        var self = this;
        self.path = hex.map.line(self.hex, hex);
        self.path.shift();

        var move = function () {
            if (self.steps != 0) {
                //self.steps--;
                var nextHex = self.path.shift();
                if (!nextHex) {
                    return;
                }
                self.hex = nextHex;
                self.$el.animate({
                    left: nextHex.prop('left'),
                    top: nextHex.prop('top')
                }, move);
            }
        }
        move();
    }
});