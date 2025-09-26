const mongoose = require("mongoose");
main().then(console.log("connection successful"))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsaap');
}
//init.js is only for seeding
//Seeding in databases means pre-filling your database with initial data (often called seed data) so that you don’t start with an empty database.
const chat = require("./models/chat.js");
let allchats = [{
    sender:"neha",
    reciever:"priya",
    msg:"send me notes",
    created_at:new Date()
},{
    sender:"naina",
    reciever:"priyanka",
    msg:"send me photos",
    created_at:new Date()
},
{
    sender:"nazil",
    reciever:"poplu",
    msg:"send me money",
    created_at:new Date()
},
{
    sender:"nagma",
    reciever:"prannath",
    msg:"send me some food",
    created_at:new Date()
},
{
    sender:"naitik",
    reciever:"pragyesh",
    msg:"send me a new shirt",
    created_at:new Date()
}
];
chat.insertMany(allchats);
