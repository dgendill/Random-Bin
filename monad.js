function Monad(modifier) {
    var prototype = Object.create(null);
    function unit() {
        var args = arguments;
        var monad = Object.create(prototype);
        monad.bind = function(func) {
            return func.apply(undefined, args);
        };
        if (typeof modifier === 'function') {
            modifier.apply(undefined, [monad].concat(Array.prototype
                        .slice.apply(args || [])));
        }
        return monad;
    }

    unit.lift = function(name, func) {
        prototype[name] = function() {
            return unit(this.bind.apply(this,
                [func].concat(Array.prototype
                    .slice.apply(arguments || []))));
        };

        return unit;
    }

    return unit;
}

var log = function(maybe1) {
    return maybe1.bind(function(v) {
        console.log(v);
    });
}

var identity = new Monad()
     .lift('double', double)
     .lift('log', log);

var maybe = Monad(function(monad, value) {
    if (value === null || value === undefined) {
        monad.is_null == true;
        monad.bind = function() {
            return monad;
        };
    }
});

var double = function(maybe1) {
    return maybe1.bind(function(v) {
        return maybe(v * 2);
    });
}

var adder = Monad(function(monad, maybe1, maybe2) {
    var added = maybe1.bind(function(v1) {
        return maybe2.bind(function(v2) {
            return maybe(v1 + v2);
        });
    });

    monad.bind = function(func) {
        return added;
    };
});

var five = maybe(5);
var six = maybe(6);

adder(five, six).bind(double).bind(log);




