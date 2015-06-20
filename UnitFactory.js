var Recipe = function(units) {

    this._units = units;

    this.name = function(name) {
        this._name = name;
        return this;
    };

    this.size = function(factor) {

        var newUnits = [];
        var newRecipe = Object.create(this);

        units.forEach(function(unit, index) {
            var newUnit = unit.clone();
            newUnit.size(factor);
            newUnits[index] = newUnit;
        });

        newRecipe._units = newUnits;
        return newRecipe;
    };

    this.half = function() {
        return this.size(.5);
    };
};

Recipe.prototype.toString = function() {
    var text = "";

    if (this._name) {
        text += "-- " + this._name + " --\n";
    }

    this._units.forEach(function(unit) {
        text += unit.toString() + "\n";
    });
    return text;
};

var Unit = function(unit, amount) {
    
    var one = {
        'cup' : {
            'cup' : 1,
            'milliliter' : 236.58
        },
        'milliliter' : {
            'milliliter' : 1,
            'cup' : 0.00422675
        }
    };

    this._name = "";
    this._unit = unit;
    this._amount = amount;

    this.name = function(name) {
        this._name = name;
        return this;
    };

    this.amount = function(amount) {
        this._amount = amount;
        return this;
    };
    this.a = this.amount;

    this.unit = function(unit) {
        this._unit = unit;
        return this;
    };

    this.size = function(factor) {
        this._amount = this._amount * factor;
        return this;
    };

    this.milliliter = function(amount) {
        if (this._amount) {
            this._amount = this._amount * one[this._unit].milliliter;
            this._unit = "milliliter";
        } else {
            this._amount = amount;
        }

        return this;
    };

    this.cup = function(amount) {
        if (this._amount) {
            this._amount = this._amount * one[this._unit].cup;
            this._unit = "cup";
        } else {
            this._amount = amount;
        }
        return this;
    };

    this.clone = function() {
        return Object.create(this);
    };
};       

Unit.prototype.toString = function() {
    return this._amount + " " + this._unit + " " + this._name;
};

var UnitFactory = function(unit) {
    return new Unit(unit);
};

var UF = UnitFactory;

var recipe = new Recipe([
    UF('cup').a(6.5).milliliter().name('Flour'),
    UF('cup').a(2/3).milliliter().name('Warm Water'),
    UF('cup').a(2).milliliter().name('Cold Water'),
    UF('Tsp').a(2).name('Sugar'),
    UF('Tsp').a(1).name('Salt'),
    UF('Tsp').a(1/2).name('Oregano'),
    UF('Tbsp').a(3).name('Oil')
]).name('Pizza Dough');

var half = recipe.size(.2);

console.log(recipe.toString());
console.log(half.toString());

