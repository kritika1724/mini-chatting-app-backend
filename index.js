const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/whatsaap');
  console.log("✅ MongoDB connected successfully");
}
main()
  .then(() => {
    app.listen(8080, () => {
      console.log("🚀 Server is listening on port 8080");
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err);
  });
//database 
const chat = require("./models/chat.js");
const path = require("path");
app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.get("/",(req,res)=>{
    res.send("root is working");
});
//Index Route
app.get("/chats",async(req,res)=>{
//take from database
let chats = await chat.find();
console.log(chats);
res.render("index.ejs",{chats});
});
//new chat
app.get("/chats/new",(req,res)=>{
res.render("newchat.ejs");
});
//CREATE CHAT
app.post("/chats",async(req,res)=>{
  console.log("🚀 POST /chats HIT");
  try {
let {from,msg,to} = req.body;
let newchat = new chat({
    sender:from,
    reciever:to,
    msg:msg,
    created_at:new Date()
});
console.log("📌 Before Save:", newchat);
await newchat.save()
console.log("📌 After New Chat Object:", newchat);

 // save to MongoDB
 console.log("✅ Chat was saved");
  res.redirect("/chats"); // go back to chats page

 } catch (err) {
    console.error("❌ Error saving chat:", err);
    res.status(500).send("Error saving chat");
 }
});
//edit route
app.get("/chats/:id/edit",async(req,res)=>{
  let {id} = req.params;
  let chatnew =  await chat.findById(id);
  res.render("edit.ejs",{chat:chatnew});
});
//update route
app.put("/chats/:id",async(req,res)=>{
let {id} = req.params;
let {msg:newmsg} = req.body;
//same as
// const newmsg = req.body.msg;
let updatedchat = await chat.findByIdAndUpdate(id,{msg: newmsg},{runValidators:true,new:true});
console.log(updatedchat);
res.redirect("/chats");
});
//destroy route 
app.delete("/chats/:id",async(req,res)=>{
let {id} = req.params;
let deletedchat = await chat.findByIdAndDelete(id);
console.log(deletedchat);
res.redirect("/chats");
});
// app.listen(8080,()=>{
//     console.log("server is listening");
// })
