function convertToRoman(num) {
  // We'll create an arabic to roman numeral mapping using array index to array
  // element relation (e.g. arabic 1 == index 1 => roman 'I' == element at index 0)
  // Note: 0 will be treated as empty string
  const romanNumerals = [
    ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
    ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
    ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
    ['', 'M', 'MM', 'MMM']
  ];
  // Separate the digits of num into an array for easier conversion
  let digitArray = `${num}`.split("");
  // Reverse the array's order so that the least significant digit comes first
  digitArray.reverse();
  // Use .map() to convert the arabic digits into roman numerals
  // Note: index 0 == the least significant number position
  digitArray = digitArray.map((arabNum, numPosition) => romanNumerals[numPosition][parseInt(arabNum)]);
  // Lastly, reverse the array again, join them into a string, and return them.
  digitArray.reverse();
  return digitArray.join("");
}

convertToRoman(36);
