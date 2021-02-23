const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "v!SoywCR2m1@9YVuWCnzkq*$^";

exports.createAccessToken = function (admin) {
  const payload = {
    id: admin._id,
    name: admin.name,
    photo: admin.photo,
    email: admin.email,
    password: admin.lastname,
    date: admin.date,
    role: admin.role,
    active: admin.role,
    exp: moment().add(3, "hours").unix(),
  };

  return jwt.encode(payload, SECRET_KEY);
};

exports.createRefreshToken = function (admin) {
  const payload = {
    id: admin._id,
    exp: moment().add(30, "days").unix(),
  };

  return jwt.encode(payload, SECRET_KEY);
};

exports.decodedToken = function (token) {
  return jwt.decode(token, SECRET_KEY, true);
};
