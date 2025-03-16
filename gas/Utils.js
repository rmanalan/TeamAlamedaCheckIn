function log(verbose, ...vals) {
  if (verbose) {console.log(...vals)}
}

// todays date
function getFullDate() {
  const date = new Date()
  return date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
}