// src/app/api/send-email/route.ts - Send order confirmation email

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
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

    // Build a simple HTML email body (avoid importing missing files)
    const itemsHtml = (emailData.items || [])
      .map(
        (it: any) =>
          `<li style="margin-bottom:8px;">${it.shortName || it.name} — ${formatPrice(it.price)} × ${it.quantity}</li>`
      )
      .join('');

    const html = `
      <div style="font-family: Arial, sans-serif; color:#111;">
        <h2>Thank you for your order, ${emailData.customerName}</h2>
        <p>Order ID: <strong>${emailData.orderId}</strong></p>
        <h3>Items</h3>
        <ul>${itemsHtml}</ul>
        <p><strong>Grand Total:</strong> ${formatPrice(emailData.totals?.grandTotal || 0)}</p>
        <p>Shipping to:<br/>${emailData.shippingAddress?.replace(/\n/g, '<br/>') || ''}</p>
        <p>— Audiophile</p>
      </div>
    `;

    // Send email using Resend
    const fromAddress = process.env.EMAIL_FROM || 'no-reply@audiophile.com';

    const response = await resend.emails.send({
      from: `Audiophile <${fromAddress}>`,
      to: emailData.to,
      subject: `Order Confirmation - ${emailData.orderId}`,
      html,
    });

    return NextResponse.json({
      success: true,
      messageId: (response as any)?.id || null,
      message: 'Email sent successfully',
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