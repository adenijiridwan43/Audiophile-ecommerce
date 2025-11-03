// emails/OrderConfirmation.tsx - Order confirmation email template

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';
import { EmailData } from '@/types/index';
import { formatPrice } from '@/lib/utils';

export function OrderConfirmationEmail({
  customerName,
  orderId,
  items,
  totals,
  shippingAddress,
}: EmailData) {
  const previewText = `Your order ${orderId} has been confirmed`;
  
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Heading style={logoText}>audiophile</Heading>
          </Section>
          
          {/* Success Icon */}
          <Section style={iconSection}>
            <div style={successIcon}>✓</div>
          </Section>
          
          {/* Main Content */}
          <Heading style={h1}>Thank You For Your Order!</Heading>
          
          <Text style={text}>
            Hi {customerName},
          </Text>
          
          <Text style={text}>
            Your order has been confirmed and will be shipped shortly. You will receive an email confirmation shortly.
          </Text>
          
          {/* Order ID */}
          <Section style={orderIdSection}>
            <Text style={orderIdLabel}>Order ID</Text>
            <Text style={orderIdValue}>{orderId}</Text>
          </Section>
          
          <Hr style={hr} />
          
          {/* Order Summary */}
          <Heading style={h2}>Order Summary</Heading>
          
          {items.map((item) => (
            <Section key={item.id} style={productRow}>
              <Row>
                <Column style={productImageColumn}>
                  <Img
                    src={item.image}
                    alt={item.name}
                    style={productImage}
                    width="64"
                    height="64"
                  />
                </Column>
                <Column style={productInfoColumn}>
                  <Text style={productName}>{item.shortName}</Text>
                  <Text style={productPrice}>{formatPrice(item.price)}</Text>
                </Column>
                <Column style={productQuantityColumn}>
                  <Text style={quantityText}>x{item.quantity}</Text>
                </Column>
              </Row>
            </Section>
          ))}
          
          <Hr style={hr} />
          
          {/* Totals */}
          <Section style={totalsSection}>
            <Row style={totalRow}>
              <Column style={totalLabelColumn}>
                <Text style={totalLabel}>TOTAL</Text>
              </Column>
              <Column style={totalValueColumn}>
                <Text style={totalValue}>{formatPrice(totals.subtotal)}</Text>
              </Column>
            </Row>
            
            <Row style={totalRow}>
              <Column style={totalLabelColumn}>
                <Text style={totalLabel}>SHIPPING</Text>
              </Column>
              <Column style={totalValueColumn}>
                <Text style={totalValue}>{formatPrice(totals.shipping)}</Text>
              </Column>
            </Row>
            
            <Row style={totalRow}>
              <Column style={totalLabelColumn}>
                <Text style={totalLabel}>VAT (INCLUDED)</Text>
              </Column>
              <Column style={totalValueColumn}>
                <Text style={totalValue}>{formatPrice(totals.vat)}</Text>
              </Column>
            </Row>
            
            <Hr style={hr} />
            
            <Row style={grandTotalRow}>
              <Column style={totalLabelColumn}>
                <Text style={grandTotalLabel}>GRAND TOTAL</Text>
              </Column>
              <Column style={totalValueColumn}>
                <Text style={grandTotalValue}>{formatPrice(totals.grandTotal)}</Text>
              </Column>
            </Row>
          </Section>
          
          <Hr style={hr} />
          
          {/* Shipping Address */}
          <Heading style={h2}>Shipping Address</Heading>
          <Text style={addressText}>{shippingAddress}</Text>
          
          {/* CTA Button */}
          <Section style={buttonSection}>
            <Button
              style={button}
              href={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/confirmation/${orderId}`}
            >
              View Your Order
            </Button>
          </Section>
          
          {/* Footer */}
          <Hr style={hr} />
          
          <Text style={footerText}>
            Need help? Contact us at{' '}
            <a href="mailto:[email protected]" style={link}>
              [email protected]
            </a>
          </Text>
          
          <Text style={footerText}>
            © {new Date().getFullYear()} Audiophile. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// ============================================
// STYLES
// ============================================
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const logoSection = {
  padding: '32px 40px',
  backgroundColor: '#101010',
};

const logoText = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  letterSpacing: '-0.5px',
};

const iconSection = {
  padding: '40px 0 24px',
  textAlign: 'center' as const,
};

const successIcon = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundColor: '#D87D4A',
  color: '#ffffff',
  fontSize: '36px',
  fontWeight: 'bold',
  lineHeight: '64px',
  margin: '0 auto',
};

const h1 = {
  color: '#000000',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '24px 40px 16px',
  padding: '0',
  lineHeight: '1.3',
};

const h2 = {
  color: '#000000',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '24px 40px 16px',
  padding: '0',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const text = {
  color: '#4C4C4C',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 40px',
};

const orderIdSection = {
  backgroundColor: '#F1F1F1',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 40px',
  textAlign: 'center' as const,
};

const orderIdLabel = {
  color: '#4C4C4C',
  fontSize: '12px',
  fontWeight: '500',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const orderIdValue = {
  color: '#000000',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 40px',
};

const productRow = {
  margin: '16px 40px',
};

const productImageColumn = {
  width: '64px',
  paddingRight: '16px',
};

const productImage = {
  borderRadius: '8px',
};

const productInfoColumn = {
  verticalAlign: 'middle' as const,
};

const productName = {
  color: '#000000',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 4px',
};

const productPrice = {
  color: '#4C4C4C',
  fontSize: '14px',
  margin: '0',
};

const productQuantityColumn = {
  textAlign: 'right' as const,
  verticalAlign: 'middle' as const,
};

const quantityText = {
  color: '#4C4C4C',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const totalsSection = {
  margin: '24px 40px',
};

const totalRow = {
  marginBottom: '12px',
};

const totalLabelColumn = {
  verticalAlign: 'middle' as const,
};

const totalLabel = {
  color: '#4C4C4C',
  fontSize: '14px',
  margin: '0',
  fontWeight: '500',
};

const totalValueColumn = {
  textAlign: 'right' as const,
  verticalAlign: 'middle' as const,
};

const totalValue = {
  color: '#000000',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const grandTotalRow = {
  marginTop: '16px',
};

const grandTotalLabel = {
  color: '#000000',
  fontSize: '16px',
  margin: '0',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
};

const grandTotalValue = {
  color: '#D87D4A',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
};

const addressText = {
  color: '#4C4C4C',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 40px',
  whiteSpace: 'pre-line' as const,
};

const buttonSection = {
  margin: '32px 40px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#D87D4A',
  borderRadius: '0',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '15px 32px',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '16px 40px',
  textAlign: 'center' as const,
};

const link = {
  color: '#D87D4A',
  textDecoration: 'underline',
};

export default OrderConfirmationEmail;