PEG.JS

// Parse Integer
start =
    integer

digit =
    [0-9]

integer =
    [1-9] digit*

// -----------------------------
// Parse all lowercase or all uppercase    
start =
    word

word =
    w:[a-z]+
        {return w.join(''); }
    /
    y:[A-Z]+
        {return y.join(''); }
 
 
 
 
// ---------------------- 
//Parse all words
start =
    wordlist

word =
	list:[a-z]+[ ]*
    { return list.join(''); }
    
wordlist =
	list:word+
    {return list;}