function checkCashRegister(price, cash, cid) {
  const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  }
  // Avoid floating point operation by using a multiplier (defaults to 100 since
  // "PENNY" is 0.01)
  let multiplier = 100;
  // Determining the appropriate multiplier
  let fracDigits = "";
  if (/\.(\d+)/.test(price)) {
    fracDigits = price.toString().match(/\.(\d+)/)[1];
  }
  if (fracDigits.length > 2) {
    // It seems price has more than two fractional digits, let's set the
    // multiplier accordingly.
    multiplier = 10 ** fracDigits.length;
  }
  let change = (cash * multiplier) - (price * multiplier);
  let result = { status: "", change: [] };
  // Loop through all the given cash-in-drawer even when change already reaches 0
  // so we can later compare result.change with cid to easily determine whether
  // result.status should be "CLOSED" or "OPEN"
  for (let i = cid.length - 1; i >= 0; i--) {
    // Skip to the next currency unit if the change is smaller then the current
    // currency unit
    if (change < (currencyUnit[cid[i][0]] * multiplier)) {
      // We use unshift here to have the same ordering as cid array
      result.change.unshift([cid[i][0], 0]);
      continue;
    }
    // Count how many coins/bills needed for this change with the current currency
    // unit (of course only integers are allowed here)
    let neededCoinsOrBills =
      Math.floor(change / (currencyUnit[cid[i][0]] * multiplier));
    // Make sure we have enough coins/bills in the cash-in-drawer for the current
    // currency unit. If not, then take all of it and continue with the next
    // currency unit.
    const availableCoinsOrBills =
      (cid[i][1] * multiplier) / (currencyUnit[cid[i][0]] * multiplier);
    if (neededCoinsOrBills > availableCoinsOrBills)
      neededCoinsOrBills = availableCoinsOrBills;
    const totalAmount =
      neededCoinsOrBills * (currencyUnit[cid[i][0]] * multiplier);
    // We use unshift here to have the same ordering as cid array
    result.change.unshift([cid[i][0], totalAmount / multiplier]);
    change -= totalAmount;
  }
  if (change > 0) {
    // We are not able to return the exact change
    result.status = "INSUFFICIENT_FUNDS";
    result.change = [];
  }
  // We use .toString() here since we can't compare arrays directly like primitive
  // values
  else if (result.change.toString() === cid.toString()) {
    // No more cash left in the drawer
    result.status = "CLOSED";
  }
  else {
    // There are still some cash left in the drawer
    result.status = "OPEN";
    // Trim the zero-valued entries and change to descending order
    result.change = result.change.filter(entry => entry[1] > 0);
    result.change.reverse();
  }
  return result;
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
