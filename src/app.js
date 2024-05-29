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
const rootpath = path.join(__dirname, "../"); // Assuming root for views
const partialpath = path.join(__dirname, "../templates/partials");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist/")));
app.use(express.static(staticpath));

// View engine setup
app.set("view engine", "hbs");
app.set("views", rootpath);
hbs.registerPartials(partialpath);

// Routing
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/rooms", (req, res) => {
    res.render("rooms");
});

app.get("/login", (req, res) => {
    res.render("login");
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

start();
