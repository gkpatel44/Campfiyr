import moment from "moment";

export const akinsToLocalISOString = (dateObj) => {
  // becuase Javascript does not provide a .getLocalISOString(), we build our  own

  var hyphen = "-";
  var colon = ":";
  var year = dateObj.getFullYear();
  var tempMonth = dateObj.getMonth() + 1; // +1  is neccesssay as January is 0 and Decmeber is 11 for some reason
  var month = tempMonth < 10 ? "0" + tempMonth.toString() : tempMonth;
  var date =
    dateObj.getDate() < 10
      ? "0" + dateObj.getDate().toLocaleString()
      : dateObj.getDate();
  var T = "T";
  var hour =
    dateObj.getHours() < 10
      ? "0" + dateObj.getHours().toLocaleString()
      : dateObj.getHours();
  var minutes =
    dateObj.getMinutes() < 10
      ? "0" + dateObj.getMinutes().toLocaleString()
      : dateObj.getMinutes();
  //"2020-01-01T08:30"
  var result = `${
    year + hyphen + month + hyphen + date + T + hour + colon + minutes
  }`; // its okay i hate it  too :)
  return result;
};

export const epochToDate = (epoch) => {
  var d = new Date(epoch * 1000); // The 0 there is the key, which sets the date to the epoch
  return d.toString().slice(0, 21);
};

export const convertTimeOfDayToDateObj = (timeNum) => {
  var midnight = new Date(new Date().setHours(0, 0, 0, 0));
  var dateObj = new Date((midnight.valueOf() / 1000 + timeNum) * 1000);
  return dateObj;
};

export const isoStringToTimeOFDay = (isoString) => {
  var midnight = new Date(new Date().setHours(0, 0, 0, 0));
  return (
    Math.round(new Date(isoString).valueOf() / 1000) -
    Math.round(midnight.valueOf() / 1000)
  );
};

/* Round a value with given precision
 * round(12345.6789, 2) // 12345.68
 * round(12345.6789, -2) // 12300
 * round(12345.6789) // 12346
 * Can be conbined with 'toFixed'  to format consistently as string
 * round(456.7, 2).toFixed(2) // "456.70"
 */
export function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export function addMonths(date, months) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() !== d) {
    date.setDate(0);
  }
  return date;
}
/** Takes a date and returns its value in string format  "YYYY-MM-DD HH:MM:SS"
 *
 * @param {Date} d
 * @returns {string} date formatted as "YYYY-MM-DD HH:MM:SS"
 */
export function toDatabaseTimeFormat(d) {
  return d.toISOString().replace(/T/g, " ").slice(0, 19);
}
export function isFile(something) {
  return something instanceof File;
}

export function isBlob(something) {
  return something instanceof Blob;
}

export function isFileOrBlob(something) {
  return isFile(something) || isBlob(something);
}

export const sortObj = (obj) => {
  // return Object.entries(obj).sort(([, a], [, b]) => a - b);
  //Sort in decreasing order and return object back
  return Object.entries(obj)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
};

export const convertTo12Hour = (oldFormatTime) => {
  if (typeof oldFormatTime === "undefined") {
    return "";
  }
  var oldFormatTimeArray = oldFormatTime.split(":");

  var HH = parseInt(oldFormatTimeArray[0]);
  var min = oldFormatTimeArray[1];

  var AMPM = HH >= 12 ? "p.m." : "a.m.";
  var hours;
  if (HH === 0) {
    hours = HH + 12;
  } else if (HH > 12) {
    hours = HH - 12;
  } else {
    hours = HH;
  }
  var newFormatTime = hours + ":" + min + " " + AMPM;
  return newFormatTime;
};

export const convertTo24Hour = (time12h) => {
  if (typeof time12h === "undefined") {
    return "";
  }
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "p.m.") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

export const distanceInKM = (num, precision) => {
  return round(num / 1000, precision);
};

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export function minsTo_HourMin(min) {
  const minsDuration = moment.duration(min, "minutes");
  const hours = minsDuration.hours();
  const mins = minsDuration.minutes();
  console.log(minsDuration.hours(), minsDuration.minutes());
  console.log(`${hours} Hours ${mins} minutes`);

  return {
    hour: hours,
    minute: mins,
    asString: `${hours} hours ${mins} minutes`,
    asInverseString: `${hours * -1} hours ${mins * -1} minutes`,
  };
}

export function isEmptyString(str) {
  return !str || /^\s*$/.test(str) || str.length === 0;
}
