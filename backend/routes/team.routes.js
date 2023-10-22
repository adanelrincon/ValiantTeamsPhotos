module.exports = app => {
    const teams = require("../controllers/teams.controller");
    var upload = require('../multer/upload');
  
    var router = require("express").Router();
  
    // Create a new Team
    router.post("/", upload.single('file'), teams.create);
  
    // Retrieve all Teams
    router.get("/", teams.findAll);
  
    // Retrieve a single Team with id
    router.get("/:id", teams.findOne);
  
    // Update a Team with id
    router.put("/:id",upload.single('file'), teams.update);
  
    // Delete a Team with id
    router.delete("/:id", teams.delete);

    // Delete all Teams
    router.delete("/", teams.deleteAll);
  
    app.use("/api/teams", router);
  }