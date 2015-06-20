var monthsAgo = function(numberOrDate) {

    var DATES = {
        1 : 'jan',
        2 : 'feb',
        3 : 'mar',
        4 : 'apr',
        5 : 'may',
        6 : 'jun',
        7 : 'jul',
        8 : 'aug',
        9 : 'sep',
        10 : 'oct',
        11 : 'nov',
        12 : 'dec'
    }

    var toDate = function(month) {
        return DATES[month];    
    }

    if (typeof numberOrDate === "number") {
       number = numberOrDate; 
    } else if (numberOrDate instanceof "Date") {
        number = numberOrDate.getMonth();
    } else if (typeof numberOrDate !== "number") {
        throw new Error('monthsAgo accepts Date or number.');
    };
    
    var calc = function(difference) {
        if (Math.abs(difference) < 12) {
            return 12 - Math.abs(difference);
        } else {
            return calc (difference % 12);
        }
    }

    var d = new Date();
    var nowMonth = d.getMonth() + 1;
    return {
        val : function() {
           return calc( nowMonth - number );
        },
        value : function() {
            return this.val();
        },
        number : function() {
            return this.val();
        },
        text : function(format) {
            return DATES[this.number()]; 
        }
    }
};

modules.export = monthsAgo;
