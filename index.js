// Your code here
function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord)
}
function createEmployeeRecord ([firstName, familyName, title, payPerHour]){
  return {
    "firstName": firstName,
    "familyName": familyName,
    "title": title,
    "payPerHour": payPerHour,
    "timeInEvents": [],
    "timeOutEvents": []
  }
}

//A date stamp ("YYYY-MM-DD HHMM")

function createTimeInEvent(record, dateStamp) {
  let timeInEvent = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
  }
  record.timeInEvents.push(timeInEvent)
  return record
}

function createTimeOutEvent(record, dateStamp) {
  let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
  }
  record.timeOutEvents.push(timeOutEvent)
  return record
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
  const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  const hours = (timeOut.hour - timeIn.hour) / 100
  return Math.ceil(hours)
}

function wagesEarnedOnDate(employeeRecord, date) {
  let hoursWorked = hoursWorkedOnDate(employeeRecord, date)
  let payRate = employeeRecord.payPerHour
  let payOwed = hoursWorked * payRate
  return payOwed
}

function allWagesFor(employeeRecord) {
//get an array of all the dates worked
  const datesWorked = employeeRecord.timeInEvents.map(event => event.date)

  //now get wages on all dates worked using helper function: wages EarnedOnDate
  const wagesOnDatesWorked = datesWorked.map(date => wagesEarnedOnDate(employeeRecord, date))

  //now we have wages on dates worked.  We now have to reduce down to one number
  const totalWages = wagesOnDatesWorked.reduce(((total, wageOnDate) => total + wageOnDate),0);

  return totalWages
}

function findEmployeeByFirstName(srcArray, firstName) {
  const firstNameWeWant = srcArray.find(record => record.firstName === firstName);

  return firstNameWeWant;
}

function calculatePayroll(employeeRecords) {
  const totalPay = employeeRecords.reduce(((total, record) => total + allWagesFor(record)),0);
  return totalPay;
}


