"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = _interopRequireDefault(require("./routes/index"));

var _passport = _interopRequireDefault(require("passport"));

var _passportAuth = require("./middlewares/passportAuth");

_dotenv.default.config();

const PORT = process.env.PORT || 4000;
const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_passport.default.initialize());
app.use(_passport.default.session());
(0, _passportAuth.passportGoogleConfiguration)(_passport.default);
(0, _passportAuth.passportfacebookConfiguration)(_passport.default);
app.use('/api/v1/', _index.default);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});