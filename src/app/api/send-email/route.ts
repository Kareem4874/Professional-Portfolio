import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Enable debugging
const debugMode = process.env.NODE_ENV !== 'production';

// Create a test account for development
async function createTestAccount() {
  return await nodemailer.createTestAccount();
}

export async function POST(request: Request) {
  console.log('Received request to send email');
  
  try {
    // Parse request body
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      console.error('Missing required fields');
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    let transporter;
    let testAccount;

    if (process.env.NODE_ENV === 'development') {
      // In development, use ethereal.email for testing
      testAccount = await createTestAccount();
      console.log('Created test account:', testAccount.user);
      
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
        debug: debugMode,
      });
    } else {
      // In production, use Gmail SMTP
      if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
        console.error('Gmail credentials not configured');
        return NextResponse.json(
          { success: false, message: 'Email service not configured' },
          { status: 500 }
        );
      }

      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
        debug: debugMode,
      });
    }

    // Email options
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.GMAIL_EMAIL || testAccount?.user || 'noreply@example.com'}>`,
      to: process.env.GMAIL_EMAIL || testAccount?.user || 'your-email@example.com',
      subject: subject || 'New Message from Portfolio Contact Form',
      text: `
        You have received a new message from your portfolio website:
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject || 'No Subject'}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Message from Portfolio Contact Form</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-line; background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">${message}</p>
            </div>
          </div>
          <p style="margin-top: 30px; color: #64748b; font-size: 14px;">
            This email was sent from the contact form on your portfolio website.
          </p>
        </div>
      `,
    };

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    if (process.env.NODE_ENV === 'development' && testAccount) {
      console.log('Test email sent. Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    console.log('Email sent successfully');
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully!',
        previewUrl: process.env.NODE_ENV === 'development' ? nodemailer.getTestMessageUrl(info) : undefined
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorObj = error as { message?: string; stack?: string; code?: string; response?: unknown };
    console.error('Error sending email:', {
      error: errorObj.message,
      stack: errorObj.stack,
      code: errorObj.code,
      response: errorObj.response,
    });
    
    let errorMessage = 'Failed to send message. Please try again.';
    
    // Provide more specific error messages for common issues
    if (errorObj.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Please check your email settings.';
    } else if (errorObj.code === 'EENVELOPE') {
      errorMessage = 'Invalid email address. Please check the recipient email.';
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? errorObj.message : undefined
      },
      { status: 500 }
    );
  }
}
