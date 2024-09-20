const testServer = async (req, res) => {
  try {
    const {
      id,
      temperature,
      humidity,
      coilTemprature,
      outsideTemp,
      outsideHumidity,
      outsideCoilTemp,
    } = req.body;
    return res.staus(204).json({
      id,
      temperature,
      humidity,
      coilTemprature,
      outsideTemp,
      outsideHumidity,
      outsideCoilTemp,
    });
  } catch (error) {
    return res.status(500);
  }
};
