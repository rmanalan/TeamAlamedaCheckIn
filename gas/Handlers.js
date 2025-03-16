const RideLogs = "Sheet1"
const LogX = 2

function needNewLog() {
  return "OK " + !readCol(RideLogs,"G").includes(getFullDate())
}

// try to make a new log whenever a rider is added, check for the same date in the last entry
// try to make a new log only when requested, always sent on the fist scan on the client side
//client side will poll to get the latest ride date entry, and will know if a new log should get added after scanning once
function newLog(name, number) {
  // B is the first column containing data
  const riders = readCol(RideLogs, "B").length
  const guests = readCol(RideLogs, "E").length
  const populatedHeight = riders>guests?riders:guests

  const logBase = [
    ["Leader Name", "Leader Number", "", "", "", "Ride Date"],
    [name, number, "", "", "" ,getFullDate()],
    ["Rider Name", "Rider Number", "Rider Emergency Number","Guest Name", "Guest Number", "Guest Emergency Number"]
  ]
  const logPosition = {x:2,y:populatedHeight+1+3} // last number is spaces between entries
  const logSize = {w:logBase[0].length, h:logBase.length}

  return writeCells(RideLogs, topLeftToRange(logPosition.x, logPosition.y, logSize.w, logSize.h), logBase)
}

function addGuestRider(name, number, emergencyNumber) {
  const guestCol = "E"

  return writeCells(
    RideLogs, 
    topLeftToRange(colLetterToNumber(guestCol), readCol(RideLogs, guestCol).length+1, 3, 1), 
    [[name,number,emergencyNumber]]
  )
}

function addRider(name, number, emergencyNumber) {
  const riderCol = "B"
  return writeCells(
    RideLogs, 
    topLeftToRange(colLetterToNumber(riderCol), readCol(RideLogs, riderCol).length+1, 3, 1), 
    [[name,number,emergencyNumber]]
  )
}