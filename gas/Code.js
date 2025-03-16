function doGet(e) {
  return ContentService.createTextOutput("doneG")
}


const router = newPostRouter(
  // consider making a get router
  route("/needNewLog", data => {
    return needNewLog()
  }),

  // maybe add checkParameter function to data, so it auto returns or smth
  // const c = check() if (c) return c????
  route("/newLog", data => {
    if (!data.name) {return "ERROR missing name"}
    if (!data.number) {return "ERROR missing number"}
    return newLog(data.name, data.number)
  }),

  route("/newRider", data => {
    if (!data.name) {return "ERROR missing name"}
    if (!data.number) {return "ERROR missing number"}
    if (!data.emergencyNumber) {return "ERROR missing emergencyNumber"}
    return addRider(data.name, data.number, data.emergencyNumber)
  }),

  route("/newGuestRider", data => {
    if (!data.name) {return "ERROR missing name"}
    if (!data.number) {return "ERROR missing number"}
    if (!data.emergencyNumber) {return "ERROR missing emergencyNumber"}
    return addGuestRider(data.name, data.number, data.emergencyNumber)
  })
)

function doPost(e) {
  return router.listen(e);
}

function test1() {
  // console.log(router.listen({postData:{contents:JSON.stringify({route:"/",data:{}})}}))
  console.log(needNewLog())
  return
  newLog()
  addRider("a","b","510")
  addGuestRider("c","d","415")
}