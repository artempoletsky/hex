

var BuildingsList = [];


BuildingsList.push(Building.extend({
    defaults: {
        name: 'farm',
        title: 'Ферма',
        ground: ['grass'],
        description: 'Добывает 1 единицу еды за ход',
        cost: new Resources({
            wood: -10
        }),
        production: new Resources({
            food: 2
        })
    }

}));


BuildingsList.push(Building.extend({
    defaults: {
        name: 'mine',
        title: 'Шахта',
        ground: ['iron'],
        description: 'Добывает 1 единицу руды за ход. Потребляет 1 еденицу пищи за ход.',
        cost: new Resources({
            wood: -10
        }),
        production: new Resources({
            food: 2
        })
    }
}))

BuildingsList.push(Building.extend({
    defaults: {
        name: 'settlement',
        title: 'Поселение',
        ground: [],
        description: 'Основывает новый город',
        cost: new Resources({
            wood: -10
        }),
        production: new Resources({
            food: 2
        })
    }
}))
