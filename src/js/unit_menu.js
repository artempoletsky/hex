var UnitMenu = ViewModel.extend({
    el: '.unit_menu',
    autoParseBinds: true,
    constructor: function (game) {
        this.game = game;
        this._super();
    },
    shortcuts: {
        $desc: '.unit_menu_descr'
    },
    events: {
        'mouseenter .unit_menu_action': 'showDescription',
        'mouseleave .unit_menu_action': 'hideDescription',
        'click .unit_menu_action': 'runAction'
    },
    mode: 'army',
    setUnit: function (unit) {
        this.hideDescription();
        this.$el.show();
        this.unit = unit;
        var $cont = this.$('.unit_menu_actions'),
            $resCont=this.$('.unit_menu_storage');
        $cont.empty();
        $resCont.empty();

        var tmpl = ViewModel.tmpl.getRawTemplate('unit_menu_action');
        var resTmpl = ViewModel.tmpl.getRawTemplate('unit_menu_storage_item');

        if (unit.getActions) {
            this.mode = 'army';
            _.each(this.unit.getActions(), function (action) {
                $cont.append($(tmpl).addClass(action.name));
            });
        }


        //console.log(unit);
        if(unit.storage){
            _.each(unit.storage.attributes, function(value, name){
                var $item=$(resTmpl);
                $item.find('.unit_menu_storage_value').html(value);;
                $item.addClass(name);
                $resCont.append($item)
            });
        }


    },
    hide: function () {
        this.$el.hide();
    },
    runAction: function (e) {
        var index = $(e.currentTarget).index();
        if (this.mode == 'army') {
            var action=this.unit.getActions()[index];
            action.run.call(action.self);
        }
    },
    showDescription: function (e) {
        var index = $(e.currentTarget).index();
        var text = '';
        if (this.mode == 'army') {
            text = this.unit.getActions()[index].description;
        }
        this.$desc.html(text).show();
    },
    hideDescription: function () {
        this.$desc.html('').hide();
    }
});
