const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const hbs = require("hbs");
const connectDB = require("./db/conn");
const UserMessage = require("./models/usermessage");

const app = express();
const port = process.env.PORT || 3001;

// Setting paths
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist/")));
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);


// Routing
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/rooms", (req, res) => {
    res.render("rooms");
});

app.post("/contact", async (req, res) => {
    try {
        const userData = new UserMessage(req.body);
        await userData.save();
        res.status(201).render("index", { message: "Thank you for contacting us! We'll get back to you soon." });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/usermessages', async (req, res) => {
    try {
        const messages = await UserMessage.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

// Route to handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Implement your authentication logic here
    if (username === 'user' && password === 'pass') {
        res.send('Login successful!');
    } else {
        res.send('Invalid credentials!');
    }
});

// Start the server after connecting to the database
const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running at port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    


    
start(); // Call the start function to initialize the app