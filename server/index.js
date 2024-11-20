const express = require("express");
const app = express();

//mail of unresolved complains send to admin every morning
require('./middlewares/mailSendToAdmin');

//routes import
const profileRoutes = require("./routes/Profile");
const userRoutes = require("./routes/User");
const complainRoutes= require("./routes/Complaint");
const menuRoutes=require("./routes/MenuItem");
const transactionRoutes=require("./routes/Transaction");

//configuration import
const database = require("./config/database");
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();


app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

//file uploader
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();
  
//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/complaint", complainRoutes);
app.use("/api/v1/menu", menuRoutes)
app.use("/api/v1/transaction", transactionRoutes);


app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

