// * Contracts
// * Guarded functions
// *
// Both form Categories

var Maybe = function() {}

var None = function() {}
None.prototype = Object.create(Maybe.prototype);
None.toString = function() { return "None"; }
var none = new None();

var Some = function(x) {
    this.x = x;
};
Some.prototype = Object.create(Maybe.prototype);
Some.prototype.toString = function() {
    return "Some(" + this.x + ")";
}
var some = function(x) { return new Some(x); }

var maybe = function(c) {
    return function(n) {
        if (n instanceof None) {
            return n;
        } else if (n instanceof Some) {
            return some(c(n.x));
        } else {
        
        };
    }
};
