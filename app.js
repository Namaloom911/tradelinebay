// ./ngrok http 3000
//nodemon app.js 192.168.18.23:3000
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const CardRegister = require('./CreditCardRoutes/register');
const register = require('./UserRoutes/register');
const login = require('./UserRoutes/login');
const update = require('./UserRoutes/updateProfile');
const forgetPassword = require('./UserRoutes/forgetPassword');
const verify = require('./UserRoutes/verify');
const ccverify = require('./admin/verify');
const ccsold = require('./admin/ccs');
const ccall = require('./admin/cca');
const allusers = require('./admin/users');
var bodyParser = require('body-parser');
const ccapprove = require('./CreditCardRoutes/approve');
const buy = require('./CreditCardRoutes/buy');
app.use(buy);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ccapprove)
app.use(ccsold);
app.use(ccall);
app.use(allusers);
app.use(ccverify);
app.use(verify);
app.use(update);
app.use(login);
app.use(register);
app.use(CardRegister);
app.use(forgetPassword);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose
    .connect("mongodb://localhost:27017", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to CompassDB"))
    .catch((err) => console.error("error found...", err));

// app.set('PORT', 4000 || process.env.PORT);

// app.listen(app.get('PORT'), '192.168.18.23', () => {
//     console.log("Server is running at " + app.get('PORT'));
// });
app.get('/', (req, res) => {
    res.send("hello")
})

const port = process.env.port || 3000;
app.listen((port), () => console.log(`listening to port ${port}`));

// app.get('/api/upload/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });
// app.post('/api/upload/', function(req, res) {
//     var form = new formidable.IncomingForm();
//     form.parse(req);
//     form.on('fileBegin', function(name, file) {
//         file.path = __dirname + '/uploads/' + file.name;
//     });

//     form.on('file', function(name, file) {
//         console.log('Uploaded ' + file.name);
//     });

//     res.sendFile(__dirname + '/index.html');
// });

// registration();
// getAdmin();

// function isAdmin(req, res, next) {

//     if (req.body.isAdmin == true) {
//         return next();
//     }
//     res.redirect('/login');
// }

// function getAdmin() {

//     app.get('/admin-dude', async(req, res) => {
//         //  isAdmin(req,res,next);
//         var User = await Model.findOne({ _id: req.params.id });
//         // console.log(make);
//         if (User) {

//             const result = await User.save();
//             console.log(result);
//             res.json({ "Message": true });

//         } else {
//             res.json({ "not found": false });
//         }
//     });
// }