const express = require("express")
const app = express()
const transporter = require("./utils/transporter");
const cors = require("cors")

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(cors({
    origin: process.env.PORTFOLIO_URL ,
    methods: ["POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

const PORT = process.env.PORT || 5000

app.post("/send-otp", async(req, res) => {
    const { name, email, message } = req.body;

    if(!name || !email || !message) {
        return res  .status(404).json({
            success: false,
            message: "email not sent"
        })
    }

    const mailOptions = {
        from: "shivangbhaiisgreat@gmail",
        to: req.body.email , 
        subject: "Mosshead | Shivang",
        text: `Hello ${req.body.name}!, I have recieved you message from my Portfolio website, I'd like to help you in create any project, so I'll contact you within 2 or 3 working days. We are happy to work with you. For any Querries you can reply to this mail or contact me on any social media platform from my portfolio. Thank You for contacting us! `,
    } 
    
    try {

        let sendingMail = await transporter.sendMail(mailOptions)

        return res.status(200).json({
            success : true, 
            message: "email sent successfully",
            data: sendingMail
        })

    } catch (error) {
        console.log(error)
    }
}); 


app.listen(PORT , () => {
    console.log(`App listening on port ${PORT}`)
})