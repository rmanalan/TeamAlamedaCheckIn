function log(verbose, ...vals) {
  if (verbose) {console.log(...vals)}
}

// todays date
function getFullDate() {
  const date = new Date()
  return date.getMonth().toLocaleString("en-US", {minimumIntegerDigits: 1, useGrouping: false})+
         date.getDate().toLocaleString("en-US", {minimumIntegerDigits: 1, useGrouping: false})+
         date.getFullYear().toLocaleString("en-US", {minimumIntegerDigits: 4, useGrouping: false})
}