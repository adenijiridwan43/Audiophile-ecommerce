// src/app/api/send-email/route.ts - Send order confirmation email via Nodemailer + Gmail SMTP

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { render } from '@react-email/components';
import { OrderConfirmationEmail } from '../../../../emails/OrderConfirmation';
import { EmailData } from '@/types/index';

// Create Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const emailData: EmailData = await request.json();

    // Validate required fields
    if (!emailData.to || !emailData.customerName || !emailData.orderId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: to, customerName, orderId' },
        { status: 400 }
      );
    }

    // Check that Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('GMAIL_USER or GMAIL_APP_PASSWORD is not set');
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 503 }
      );
    }

    // Render the React Email template to HTML
    const html = await render(
      OrderConfirmationEmail({
        to: emailData.to,
        customerName: emailData.customerName,
        orderId: emailData.orderId,
        items: emailData.items || [],
        totals: emailData.totals,
        shippingAddress: emailData.shippingAddress,
      })
    );

    // Send email via Gmail SMTP
    const info = await transporter.sendMail({
      from: `"Audiophile" <${process.env.GMAIL_USER}>`,
      to: emailData.to,
      subject: `Order Confirmation - ${emailData.orderId}`,
      html,
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: 'Order confirmation email sent successfully',
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      },
      { status: 500 }
    );
  }
}