const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myApp');
module.exports = mongoose.connection;
