// Correct way to export a default function in ES modules
const sendData = async (req, res) => {
    console.log(req.body);
    return res.status(200).json({ message: "message received", data: req.body });
  };
  
  export default sendData;
  