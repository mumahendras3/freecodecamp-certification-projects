function palindrome(str) {
  const normalized = str.toLowerCase().replaceAll(/\W+|_+/g, "");
  let reversed = "";
  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }
  return normalized === reversed;
}

palindrome("eye");
