import db from "../api/db.js";
import { appTemp } from "./schema.js";

const sendData = async (req, res) => {
  try {
    // Destructure and parse the incoming data
    const { id, temperature, humidity,coilTemprature } = req.body;
    const temp = parseFloat(temperature);
    const humi = parseFloat(humidity);
    const coilTemp=parseFloat(coilTemprature)
    if (isNaN(temp) || isNaN(humi)) {
      // If temperature or humidity is not a number, return a 400 status code
      return res.status(400).json({
        error: "Invalid temperature or humidity value",
        temp: temp,
        humi: humi,
        id: id,
        coilTemp:coilTemp
      });
    }

    if (!id || typeof id !== 'string') {
      // Validate if id is present and is a string
      return res.status(400).json({
        error: "Invalid ID value",
        id: id,
      });
    }

    // Insert data into the database
    const result = await db.insert(appTemp).values({
      iotID: id,
      surroundingTemp: temp,
      surroundingHumidity: humi,
    });

    // Respond with success message
    return res.status(200).json({
      message: "Data received and stored",
      data: req.body,
      result: result,
    });
  } catch (error) {
    // Handle and log any error that occurs
    console.error("Error saving data:", error);

    // Send an error response with a 500 status code
    return res
      .status(500)
      .json({ error: "An error occurred while saving data" });
  }
};

export default sendData;
