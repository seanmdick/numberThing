var ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
  teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
  tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
  magnitudes = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion'];

Number.prototype.toWords = function() {
  var numbers = [], 
  out = [],
  mag = 0,
  set,
  i,
  temp;
  

  if (this.toLocaleString().indexOf('e') > 0) {
    temp = this.toLocaleString().split('e+'); // hack, does not deal with real numbers
    for (i = 0; i < temp[0].length; i++) {
      numbers.unshift(temp[0][i]);
    }
    for (i = 0; i < parseInt(temp[1],10) - temp[0].length + 1; i++) {
      numbers.push(0);
    }
  } else {
    numbers = this.toLocaleString().split('');
  }

  while (numbers.length > 0) {
    set = [];
    for (i = 0; i < 3 && numbers.length > 0; i++) {
      set.unshift(numbers.pop() * 1);
    }
    
    if (mag > 0 && set.reduce(function(total, current) {return (total || 0) + (current || 0);}) !== 0) {
      out.unshift(magnitudes[mag]);
    }

    if (set.length === 3) {
      if (set[1] === 1 && set[2] > 0) {
        out.unshift(teens[set[2]])
      } else {
        if (set[2] > 0) {
          out.unshift(ones[set[2]]);
        }
        if (set[1] > 0) {
          out.unshift(tens[set[1]]);
        }
      }
      if (set[0] > 0) {
        out.unshift('hundred');
        out.unshift(ones[set[0]]);
      }
    } else if (set.length > 1) {
      if (set[0] === 1) {
        out.unshift(teens[set[1]])
      } else {
        if (set[1] > 0) {
          out.unshift(ones[set[1]]);
        }
        if (set[0] > 0) {
          out.unshift(tens[set[0]]);
        }
      }
    } else {
      if (set[0] > 0 || mag === 0) {
        out.unshift(ones[set[0]])
      }
    }
    mag++;
  }
  
  if (this.toLocaleString()[0] == '-') {
    out.unshift('negative');
  }

  return out.join(' ');
}

