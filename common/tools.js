const bcrypt = require('bcryptjs');
const moment = require('moment');
moment.locale('zh-cn');
exports.formatDate = (date, friendly) => {
  date = moment(date);
  if (friendly) {
    return date.fromNow();
  } else {
    return date.format(date, "YYYY-MM-DD HH:mm");
  }
};
exports.validateId = (str) => {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};
exports.bhash = (str, callback) => {
  bcrypt.hash(str, 10, callback);
};
exports.bcompare = (str, callback) => {
  bcrypt.compare(str, hash, callback)
}