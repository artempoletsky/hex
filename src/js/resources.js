var Resources = Model.extend({
    subtract: function (res) {
        this.add(res, -1);
    },
    add: function (res, sub) {
        if (!sub) {
            sub = 1;
        }
        var self = this;
        self.prop(_.foldl(this.toHash(res), function (result, value, name) {
            result[name] = self.attributes[name] || 0 + value * sub;
            return  result;
        }, {}));
    },
    toHash: function (resources) {
        if (resources.attributes) {
            return resources.attributes;
        }
        return resources;
    },
    transfer: function (from, value) {
        if (!value) {
            value = from;
        }
        this.add(value);
        from.subtract(value);
    },
    checkEnoughResources: function (resources) {
        var result = true;
        var selfRes = this.attributes;
        _.each(this.toHash(resources), function (val, name) {
            if (selfRes[name] + val < 0) {
                result = false;
                return false;
            }
        });
        return result;
    }
});
Resources.types = ['wood', 'food', 'stone', 'iron'];