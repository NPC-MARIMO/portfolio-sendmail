const express = require("express");
const app = express();
const transporter = require("./utils/transporter");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Allow CORS for all origins
app.use(cors());

// Or explicitly define it like this:
// app.use(cors({
//     origin: "*", // Allows all origins
//     methods: ["POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true
// }));

const PORT = process.env.PORT || 5000;

app.post("/send-otp", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!",
        });
    }

    const mailOptions = {
        from: "shivangbhaiisgreat@gmail.com",
        to: email,
        subject: "Mosshead | Shivang",
        text: `Hello ${name}!
        
I have received your message from my Portfolio website. I'd like to help you create any project, so I'll contact you within 2 or 3 working days. We are happy to work with you.

For any queries, you can reply to this mail or contact me on any social media platform from my portfolio.

Thank you for contacting us!`,
    };

    try {
        const sendingMail = await transporter.sendMail(mailOptions);
        return res.status(200).json({
            success: true,
            message: "Email sent successfully!",
            data: sendingMail,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while sending the email.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
