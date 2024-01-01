const express = require("express");
const router = express.Router();
const { service } = require("../models");
let book = require("../temp/datafake");

router.post("/add-service", async (req, res) => {
  try {
    const { TenDichVu, Mota, Gia, Img } = req.body;
    const newService = await service.create({ TenDichVu, Mota, Gia, Img });
    res.status(201).json(newService);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-services", async (req, res) => {
  try {
    const Services = await service.findAll();
    res.status(200).json(Services);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-service/:id", async (req, res) => {
  try {
    const Service = await service.findByPk(req.params.id);
    if (Service) {
      res.status(200).json(Service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update-service/:id", async (req, res) => {
  try {
    const { TenDichVu, Mota, Gia, Img } = req.body;
    const serviceId = req.params.id;

    const Service = await service.findByPk(serviceId);

    if (Service) {
      await service.update(
        { TenDichVu, Mota, Gia, Img },
        { where: { id: serviceId } }
      );

      const updatedService = await service.findByPk(serviceId);

      res.status(200).json(updatedService);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete-service/:id", async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (service) {
      await service.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addBook", (req, res) => {
  console.log(book.book);
  console.log(req.body);
  book.book.push(req.body);
  res.json(book.book);
});
module.exports = router;
