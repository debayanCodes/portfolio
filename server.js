const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000; // Change this port number if needed

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Change this to your email service (e.g., Gmail)
    auth: {
      user: 'debayan.paul07@gmail.com', // Change this to your email address
      pass: 'jeihzzcizrbhkbvc' // Change this to your email password or app-specific password
    }
  });

  // Email message options
  const mailOptions = {
    from: email,
    to: 'debayan.paul07@gmail.com', // Change this to the recipient's email address
    subject: `New Message from ${name} via Portfolio Contact Form`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.send(`
        <script>
          alert('Thank you for your message. We will get back to you soon.');
          window.location.href = '/';
        </script>
      `);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
