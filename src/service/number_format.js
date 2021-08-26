function nFormatter(num, digits) {
  var si = [
      { value: 1e15, symbol: "Q" },
      { value: 1e12, symbol: "T" },
      { value: 1e9, symbol: "B" },
      { value: 1e6, symbol: "M" },
      { value: 1e3, symbol: "K" },
    ],
    i;
  for (i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value).toFixed(digits).replace(/\.?0+$/, "") + si[i].symbol
      );
    }
  }
  return num;
}

export default nFormatter;
