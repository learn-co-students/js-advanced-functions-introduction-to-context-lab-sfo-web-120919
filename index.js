// Your code here
function createEmployeeRecord(employeeInfo) {
  return {
      firstName: employeeInfo[0],
      familyName: employeeInfo[1],
      title: employeeInfo[2],
      payPerHour: employeeInfo[3],
      timeInEvents: [],
      timeOutEvents: []
  }
}

function createEmployeeRecords(employeeInfos) {
    return employeeInfos.map(employeeInfo => createEmployeeRecord(employeeInfo))
}
// createTimeInEvent(bpRecord, "2014-02-28 1400")
function createTimeInEvent(record, dateString) {
  const dateTimeArr = dateString.split(" ")
  const date = dateTimeArr[0]
  const hour = parseInt(dateTimeArr[1])

  record.timeInEvents.push({date: date, hour: hour,
type: "TimeIn"})
  return record
}

function createTimeOutEvent(record, dateString) {
    const dateTimeArr = dateString.split(" ")
    const date = dateTimeArr[0]
    const hour = parseInt(dateTimeArr[1])
  
    record.timeOutEvents.push({date: date, hour: hour,
  type: "TimeOut"})
    return record
  }

  function hoursWorkedOnDate(record, date) {

    const timeInEvent = record.timeInEvents.find(e => date === e.date && e.type === "TimeIn")
    const timeOutEvent = record.timeOutEvents.find(e => date === e.date && e.type === "TimeOut")
    //console.log("time in", timeOutEvent.hour)
    //console.log("timeout", timeInEvent.hour)
    return (timeOutEvent.hour - timeInEvent.hour) / 100
    

  }

  function wagesEarnedOnDate(record, date) {
      return hoursWorkedOnDate(record, date) * record.payPerHour
  }

  function allWagesFor(record) {
      let sum = 0
      for (let i = 0; i < record.timeInEvents.length; i++) {
          sum += (record.timeOutEvents[i].hour - record.timeInEvents[i].hour)
      }
      return sum / 100 * record.payPerHour
      
  }

  function calculatePayroll(employeeRecords) {
      
     return employeeRecords.reduce((acc, r) => acc + allWagesFor(r), 0 )
  }

  function findEmployeeByFirstName(employees, name) {
      return employees.find(e => e.firstName === name) 
  }