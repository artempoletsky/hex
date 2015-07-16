$(function () {


    ViewModel.create({
        el: 'body',
        events: {
            'click .toggle_frames': 'toggleFrames',
            'click .end_turn': 'turn'
        },
        shortcuts: {
            $map: '.map'
        },
        toggleFrames: function () {
            this.$map.toggleClass('hide_frames');
        },
        selectArmy: function (army) {
            this.unitMenu.setUnit(army);
            this.map.setMode('army', army);
        },
        deselect: function () {
            this.map.setMode();
            this.unitMenu.hide();
        },

        selectSettlement: function(settlement){
            this.unitMenu.setUnit(this);
            this.map.setMode('settlement', settlement);
        },

        alert: function (message) {
            alert(message);
        },
        confirm: function (message, callback) {
            callback(confirm(message));
        },
        initialize: function () {

            ViewModel.findBinds('.templates');

            this.unitMenu = new UnitMenu(this);
            var map = new Map(this);

            this.map = map;
            map.prop('size_x', 20);
            map.prop('size_y', 10);

            map.generateHexagons();
            map.drawHexagons();


            var player = this.player = new Player(this);

           // player.addSettlement(map.at(7,7));
            //player.settlements[0].build(map.at(7,8), 0);
            player.addArmy([new Unit()], map.at(7, 7));

        },
        copyPosition: function ($el, hex) {
            $el.css({
                left: hex.prop('left') + 'px',
                top: hex.prop('top') + 'px'
            });
        },
        turn: function () {

        }
    });


});
