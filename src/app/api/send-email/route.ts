// src/app/api/send-email/route.ts - Send order confirmation email

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { OrderConfirmationEmail } from '../../../../emails/OrderConfirmation';
import { EmailData } from '@/types/index';
import { formatPrice } from '@/lib/utils';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const emailData: EmailData = await request.json();
    
    // Validate required fields
    if (!emailData.to || !emailData.customerName || !emailData.orderId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Audiophile <[email protected]>', // Replace with your domain
      to: emailData.to,
      subject: `Order Confirmation - ${emailData.orderId}`,
      react: OrderConfirmationEmail(emailData),
    });
    
    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      messageId: data?.id,
      message: 'Email sent successfully',
    });
    
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send email' 
      },
      { status: 500 }
    );
  }
}