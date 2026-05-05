const express = require("express");
const { create, getAllUsers, getUserById, update, deleteUser } = require("../controller/userController");

const route = express.Router();

route.post("/user", create);
route.get("/users", getAllUsers);
route.get("/users/:id", getUserById);
route.put("/update/users/:id", update);
route.delete("/delete/users/:id", deleteUser);

module.exports = route;
