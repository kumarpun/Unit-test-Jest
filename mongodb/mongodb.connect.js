const mongoose = require("mongoose");

async function connect() {
    try {
    await mongoose.connect
    ("mongodb+srv://kumar:rgjwvcaaa4AM7v9X@cluster0.uflrq.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
    );
    } catch (err) {
        console.error("Error connecting to mongodb");
        console.error(err);
    }
}

module.exports = { connect };