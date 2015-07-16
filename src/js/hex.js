$(function () {
    var hex_template = $('.hex')[0].outerHTML;
    var terrain = ['grass', 'desert', 'forest', 'stone', 'iron'];


    window.Hex = ViewModel.extend({
        autoParseBinds: true,
        el: hex_template,
        events: {
            'click .hex_building': 'onBuildingClick'
        },
        defaults: {
            pos_x: 0,
            pos_y: 0,
            ground: 'grass',
            hasBuilding: false,
            buildingHealth: '0%',
            building: 'none',
            hex_width: 112,
            hex_height: 61
        },
        computeds: {
            left: {
                deps: ['pos_x', 'hex_width'],
                get: function (x, hex_width) {


                    return  hex_width * x * (0.75);
                }
            },
            top: {
                deps: ['pos_x', 'pos_y', 'hex_height'],
                get: function (x, y, hex_height) {
                    return  hex_height * y + (x % 2 ? hex_height / 2 : 0);
                }
            }
        },
        constructor: function (options) {
            this.game = options.game;

            this._super();
            this.map = options.map;
            this.prop('ground', terrain[Math.floor(Math.random() * terrain.length)]);
            this.$ground.addClass('ground_' + this.prop('ground'));

            this.$el.attr({
               x: options.x,
               y: options.y
            });

            this.prop({
                pos_x: options.x,
                pos_y: options.y
            })
        },
        onBuildingClick: function () {
            if (!this.prop('hasBuilding'))
                this.game.build(this, 0);
        },
        shortcuts: {
            $ground: '.hex_ground'
        },

        removeBuilding: function(){
            this.$('.hex_building').attr('class', 'hex_building').removeAttr('title');
            this.prop('hasBuilding', false);
        },
        addBuilding: function(building){
            this.$('.hex_building').addClass('hex_building_' + building.prop('name')).attr('title', building.prop('title'));
            this.prop({
                hasBuilding: true,
                buildingHealth: '100%'
            });
        }
    });

});