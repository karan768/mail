const express = require('express');
const mongoose = require('mongoose');
var url = "mongodb://localhost:27017/Mail";
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
var fs = require('fs');
const Mail = require('./modal.js');

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Mail");{
console.log("connected");
}
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendfile('index.html');
})

app.post('/send', (req, res) => {
    const mail = new Mail({
     name:req.body.name,
     company:req.body.company,
     email:req.body.email,
     password:req.body.Password,
     phonenumber:req.body.phone,
     file:req.body.file,
     message:req.body.message
    })
    mail.save()
    .then(item => {
        console.log(item)
    console.log("item saved to database");
     })
    .catch(err => {
     res.status(400).send("unable to save to database");
     })
    const output = `
    <h1>contact details</h1>
    <ul>
    <li>Name:${req.body.name}</li>
    <li>Company:${req.body.company}</li>
    <li>Email:${req.body.email}</li>
    <li>Phone:${req.body.phone}</li>
    <li>file:${req.body.file}</li>
    </ul>
    <h3>message</h3>
    <p>${req.body.message}</p>
    `;

    let testAccount = nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: `${req.body.email}`, 
            pass: `${req.body.Password}`
        },
        tls:{
            rejectUnauthorized:false
        },

    });

    let info =  transporter.sendMail({
        from: `${req.body.email}`, // sender address
        to: 'karan@linkites.com', // list of receivers
        subject: 'contct information', // Subject line
        text: 'Hello world?', // plain text body
        attachments:[
        //   {   
        //     filename: `${req.body.file}`,
        //     path: '/files/Projects 2019/mail/public/demo.txt' // stream this file
        // },
        {   
            filename: `${req.body.file}`,
            content: fs.createReadStream('/files/Projects 2019/mail/public/Oxford.jpg')
        }
        ],
        html: output // html body
    });
    res.sendfile('index.html')
})

app.listen(3005, () => {
    console.log("server started at port 3005")
})