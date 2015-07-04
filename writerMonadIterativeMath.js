function Writer(value, log) {
    this.value = value;
    this.logs = log ? [log] : [];
}

Writer.prototype.bind = function(transform) {
    this.value = transform(this);
    return this;
}

// Int -> (Writer -> Int)
function add (v1) {
    return function(w) {
        var value = v1 + w.value;
        w.logs.push(w.value + ' + ' + v1 + " = " + value);
        return value;
    }
}

// Int -> (Writer -> Int)
function subtract (v1) {
    return function(w) {
        var value = w.value - v1;
        w.logs.push(w.value + ' - ' + v1 + " = " + value);
        return value;
    }
}

// Int -> (Writer -> Int)
function multiply (v1) {
    return function(w) {
        var value = w.value * v1;
        w.logs.push(w.value + ' * ' + v1 + " = " + value);
        return value;
    }
}

// Int -> (Writer -> Int)
function divide (v1) {
    return function(w) {
        if (v1 == 0) {
            w.logs.push(w.value + ' / ' + v1 + " = undefined");
            w.logs.push('Division by zero!');
            throw new Error({ error: 'Divison by zero!', writer : w});
        }
        var value = w.value / v1;
        w.logs.push(w.value + ' / ' + v1 + " = " + value);
        return value;
    }
}

// Null -> (Writer -> Int)
function square () {
    return function(w) {
        var value = w.value * w.value;
        w.logs.push(w.value + '² = ' + value);
        return value;
    }
}



Writer.unit = function(value) {
    return new Writer(value);
}
Writer.prototype.toString = function(details) {
    var v = "Writer(" + this.value + ")";
    if (details) v += " - " + this.logs.join(', ');
    return v;
}
Writer.formatLogs = function(logs) {
    var color1 = 'font-size:15px;background:#000;color:#fff';
    var color2 = 'font-size:15px;background:#222;color:#fff';
    var active = color1;

    var consoleStringParts = logs.reduce(function(acc, log) {
        // var logLength = _.max(logLength, log.length);
        acc.push({
            text : "%c  " + log + "  ",
            color: active
        });
        active = (active == color1) ? color2 : color1;
        return acc;
    }, []);

    var maxLength = consoleStringParts.reduce(function(length, log) {
        return length > log.text.length ? length : log.text.length;
    }, 0);

    consoleStringParts = consoleStringParts.map(function(log) {
        log.text = _.padRight(log.text, maxLength);
        return log;
    });

    var consoleArgs = consoleStringParts.reduce(function(acc, log) {
        acc.text += log.text;
        acc.color.push(log.color);
        return acc;
    }, {
        text : "",
        color : []
    });

    var consoleArgs = [];
    consoleArgs[0] = _.pluck(consoleStringParts, 'text').join('\n');
    consoleArgs = consoleArgs.concat(_.pluck(consoleStringParts, 'color'));

    console.log.apply(console, consoleArgs);
}

var a = Writer.unit(1);

var mNeg1 = function(seed) {
    return seed
        .bind(multiply(-1))
}

var mand = function(seed) {
    return seed
        .bind(square())
        .bind(add(2))
}


var last = Writer.unit(1);
for(var a = 0; a < 10; a++) {
    last = mand(last);
}
console.log(last.logs);
Writer.formatLogs(last.logs);
