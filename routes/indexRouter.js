const {Router} = require("express");
const indexRouter = Router();

const messages = [
    {
        id: 1,
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        id: 2,
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

indexRouter.get("/", (req, res) => {
    res.render("index", {title: "Mini Messageboard", messages: messages});
});

indexRouter.get("/new", (req, res) => {
    res.render("form");
});

indexRouter.post("/new", (req, res) => {
    const {messageText, messageUser} = req.body;
    const newId = messages.length + 1;
    messages.push({id: newId, text: messageText, user: messageUser, added: new Date()});
    res.redirect("/");
});

indexRouter.get("/message/:id", (req, res) => {
    const messageId = Number(req.params.id);
    const message = messages.find((m) => m.id === messageId);
    if (!message){
        return res.status(404).send("Message not found");
    }
    res.render("details", {message: message});
});

module.exports = indexRouter;