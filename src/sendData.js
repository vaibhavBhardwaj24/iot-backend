import { eq } from "drizzle-orm";
import db from "../api/db.js";
import { appTemp, efficiencyPoint, iot } from "../migrations/schema.js";
import { sendMail } from "../nodemailer/mailer.js";

const sendData = async (req, res) => {
  try {
    // Destructure and parse the incoming data
    const {
      id,
      temperature,
      humidity,
      coilTemprature,
      outsideTemp,
      outsideHumidity,
      outsideCoilTemp,
    } = req.body;
    const temp = parseFloat(temperature);
    const humi = parseFloat(humidity);
    const coilTemp = parseFloat(coilTemprature);
    const temp2 = parseFloat(outsideTemp);
    const humi2 = parseFloat(outsideHumidity);
    const coilTemp2 = parseFloat(outsideCoilTemp);
    console.log(
      // id
      // temperature,
      // humidity,
      // coilTemprature,
      // outsideTemp,
      // outsideHumidity,
      // outsideCoilTemp
    );

    if (isNaN(temp) || isNaN(humi)) {
      // If temperature or humidity is not a number, return a 400 status code
      return res.status(400).json({
        error: "Invalid temperature or humidity value",
        temp: temp,
        humi: humi,
        id: id,
        coilTemp: coilTemp,
      });
    }
    // console.log(coilTemp);

    if (!id || typeof id !== "string") {
      // Validate if id is present and is a string
      return res.status(400).json({
        error: "Invalid ID value",
        id: id,
      });
    }
    const data = await db
      .select({
        ownerEmail: iot.ownerEmail,
        minVal: efficiencyPoint.minVal,
        maxVal: efficiencyPoint.maxVal,
      })
      .from(iot)
      .leftJoin(efficiencyPoint, eq(efficiencyPoint.iotId, id))
      .where(eq(iot.id, id));
    // console.log(data);

    const effyPoint =
      (coilTemp - temp + (humi2 - humi)) / (coilTemp2 - temp2 + (temp - temp2));

    if (effyPoint > data[0].maxVal || effyPoint < data[0].minVal) {
      const resa = await sendMail({ email: data[0].ownerEmail });
      console.log(resa, "qwertyuio");
    }
    // console.log(data[0].maxVal, "maxipan");

    const result = await db.insert(appTemp).values({
      iotId: id,
      surroundingTemp: temp,
      surroundingHumidity: humi,
      coilTemp: coilTemp,
      outsideTemp: temp2,
      outsideHumidity: humi2,
      outsideCoilTemp: coilTemp2,
    });
    console.log(result);

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
