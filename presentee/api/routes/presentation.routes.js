module.exports = app => {
    const presentation = require("../controllers/presentation.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", presentation.create);
  
    // Retrieve all Tutorials
    router.get("/", presentation.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", presentation.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", presentation.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", presentation.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", presentation.delete);
  
    // Create a new Tutorial
    router.delete("/", presentation.deleteAll);
  
    app.use('/api/presentation', router);
  };