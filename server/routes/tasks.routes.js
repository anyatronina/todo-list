const express = require("express");
const router = express.Router({ mergeParams: true });
const axios = require("axios");
const config = require("config");
const { generateFilter } = require("../utils/filters");

router.get("/", async (req, res) => {
  try {
    const options = {
      method: "GET",
      url:
        config.get("API_ENDPOINT") +
        `/tasks?sort[0]=id:desc${generateFilter(req.query)}`,
      headers: {
        Authorization: `Bearer ` + config.get("JWT_TOKEN"),
      },
    };

    const list = await axios.request(options).then((response) => response.data);

    res.status(200).json(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const options = {
      method: "POST",
      url: config.get("API_ENDPOINT") + `/tasks`,
      headers: {
        Authorization: `Bearer ` + config.get("JWT_TOKEN"),
      },
      data: req.body,
    };

    await axios.request(options);

    res.status(200).json({ message: "ok" });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    const options = {
      method: "DELETE",
      url: config.get("API_ENDPOINT") + `/tasks/${taskId}`,
      headers: {
        Authorization: `Bearer ` + config.get("JWT_TOKEN"),
      },
    };

    await axios.request(options);

    res.status(200).json({ message: "ok" });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.put("/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    const options = {
      method: "PUT",
      url: config.get("API_ENDPOINT") + `/tasks/${taskId}`,
      headers: {
        Authorization: `Bearer ` + config.get("JWT_TOKEN"),
      },
      data: req.body,
    };

    await axios.request(options);

    res.status(200).json({ message: "ok" });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
