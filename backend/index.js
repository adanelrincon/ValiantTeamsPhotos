const express = require("express");

const app = express();
const cors = require('cors');

var path = require("path");

//app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

var corsOption = {
    origin: "*"
};

app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.")
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to valorant application." });
});

require("./routes/team.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});