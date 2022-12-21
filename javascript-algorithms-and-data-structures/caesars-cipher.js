function rot13(str) {
  let decodedString = "";
  for (const encodedChar of str) {
    if (/[A-Z]/.test(encodedChar)) {
      // The character codes for A to Z are 65 to 90. If we shift forward from Z,
      // we will have a character code that is outside the 65-90 range, producing
      // a character that is not in the range of A-Z. To avoid this, we can take
      // advantage of modular arithmetic's cyclical characteristic by mapping the
      // characters A-Z to 0-25 using the modulo operator. Although JavaScript
      // only has a remainder operator (%), we can still use it as a modulo
      // operator as long as both operands are positive valued.
      // Since 65 % 26 == 13, not 0, we will add 13 to all return values of
      // charCodeAt().
      const encodedCharCode = encodedChar.charCodeAt(0) + 13;
      // Unshift the encoded character 13 places to obtain the decoded character
      const decodedCharCode = encodedCharCode - 13;
      // Apply the remainder operator to get a value in the 0-25 range and map it
      // back to the A-Z character range (0 -> A, 1 -> B, 2 -> C, ..., 25 -> Z)
      const decodedChar = String.fromCharCode(decodedCharCode % 26 + 65);
      // Finally, append the decoded character to the result string.
      decodedString += decodedChar;
    }
    else decodedString += encodedChar;
  }
  return decodedString;
}

rot13("SERR PBQR PNZC");
