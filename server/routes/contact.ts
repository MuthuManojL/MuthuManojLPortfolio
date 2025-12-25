import { RequestHandler } from "express";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const handleContactForm: RequestHandler = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body as ContactFormData;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: "All fields are required" 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid email address" 
      });
    }

    // For now, we'll use a simple mailto approach or log the message
    // In production, you would integrate with SendGrid, AWS SES, or similar
    const emailContent = {
      to: "muthumanoj100@gmail.com",
      from: email,
      subject: `Portfolio Contact: ${subject}`,
      body: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `.trim()
    };

    console.log("Contact form submission:", emailContent);

    // Return success with mailto link for client-side handling
    res.json({ 
      success: true, 
      message: "Message received! Opening your email client...",
      mailtoLink: `mailto:muthumanoj100@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`
    });

  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to process your message. Please try again." 
    });
  }
};
