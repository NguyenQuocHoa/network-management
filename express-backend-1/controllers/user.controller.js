const db = require("../db");

module.exports.index = (req, res) => {
    res.render("users/index", { users: db.get("users").value() });
};

module.exports.search = (req, res) => {
    const q = req.query.q;
    const matchedUsers = db
        .get("users")
        .value()
        .filter(
            (user) =>
                q == undefined ||
                user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
        );
    res.render("users/index", { users: matchedUsers });
};

module.exports.getCreate = (req, res) => {
    res.render("users/create");
};

module.exports.postCreate = (req, res) => {
    req.body.id = new Date().getTime();
    db.get("users").push(req.body).write();
    res.redirect("/users");
};

module.exports.get = (req, res) => {
    const id = parseInt(req.params.id);
    const user = db.get("users").find({ id }).value();
    res.render("users/view", { user });
};
