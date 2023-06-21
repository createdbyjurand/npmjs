import {display, displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`time-and-date.node.mjs version 1.0.0`);

export const start = new Date().getTime();

/////////////////////////// TIME ///////////////////////////

export const msToHMS = ms => {
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  ms -= hours * 60 * 60 * 1000;
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  ms -= minutes * 60 * 1000;
  const seconds = Math.floor((ms / 1000) % 60);
  return isNaN(hours) && isNaN(minutes) && isNaN(seconds)
    ? {hours: 0, minutes: 0, seconds: 0}
    : {hours, minutes, seconds};
};

/////////////////////////// DATE ///////////////////////////

export const consoleLogDatePrototypeMethods = (date = new Date()) => {
  display('new Date()', date);
  display('new Date().toDateString()', date.toDateString());
  display('new Date().toTimeString()', date.toTimeString());
  display('new Date().toISOString()', date.toISOString());
  display('new Date().toUTCString()', date.toUTCString());
  display('new Date().toLocaleString()', date.toLocaleString());
  display('new Date().toLocaleDateString()', date.toLocaleDateString());
  display('new Date().toLocaleTimeString()', date.toLocaleTimeString());
  display('new Date().getTimezoneOffset()', date.getTimezoneOffset());
  display('new Date().getFullYear()', date.getFullYear());
  display('new Date().getMonth()', date.getMonth());
  display('new Date().getDay()', date.getDay());
  display('new Date().getDate()', date.getDate());
  display('new Date().getTime()', date.getTime());
  display('new Date().getHours()', date.getHours());
  display('new Date().getMinutes()', date.getMinutes());
  display('new Date().getSeconds()', date.getSeconds());
  display('new Date().getMilliseconds()', date.getMilliseconds());
  display('new Date().getUTCFullYear()', date.getUTCFullYear());
  display('new Date().getUTCMonth()', date.getUTCMonth());
  display('new Date().getUTCDay()', date.getUTCDay());
  display('new Date().getUTCDate()', date.getUTCDate());
  display('new Date().getUTCHours()', date.getUTCHours());
  display('new Date().getUTCMinutes()', date.getUTCMinutes());
  display('new Date().getUTCSeconds()', date.getUTCSeconds());
  display('new Date().getUTCMilliseconds()', date.getUTCMilliseconds());
};

export const getDate = () => new Date();

export const parseDate = (date = new Date()) => {
  const dateToDateString = date.toDateString().split(' ');
  return `${dateToDateString[0]}, ${dateToDateString[2]} ${dateToDateString[1]} ${
    dateToDateString[3]
  } ${date.toTimeString()}`;
};
