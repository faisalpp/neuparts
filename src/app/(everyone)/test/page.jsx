'use client';
import { useState } from 'react';

export default function Page() {
  const [orderNo, setorderNo] = useState('LGWM0L2CRV2T2');
  const [date, setdate] = useState('12/12/2023');
  const [shippingAddress, setshippingAddress] = useState('123 Main Street, Anytown, USA');
  const [billingAddress, setbillingAddress] = useState('123 Main Street, Anytown, USA');
  const [htm, sethtm] = useState('');
  const [cartCount, setcartCount] = useState(4);
  const [grandTotal, setgrandTotal] = useState(400);

  return (
    <div>
      <div style="font-family: Verdana;max-width: 960px; margin: 0 auto;margin-right:3px ">
        <div style="display:flex;width:100%;margin:auto; background-color: black;padding-top:12px;padding-bottom:12px">
          <img src="${host}/neu-blue.webp" alt="NeuParts" style=" margin: auto; height: 30px; object-fit: contain " />
        </div>
        <div style="gap: 40px;margin-top:40px ">
          <div style="display:flex;width:100%;margin:auto;">
            <img src="${host}/email/email_banner.webp" alt="" style="text-align:center; margin: 0 auto ;border-radius:20px" />
          </div>
          <div style="margin-top: 30px; color: #242424; font-size: 1.19vw ">
            <h3 style="font-size: 1.19vw">Dear User</h3>
            <p style=" margin-top: 40px ">Your Neu Appliance order #${orderNo} has successfully been placed, You will find all the details about your order below, and we’ll send you a shipping confirmation email as soon as your order ships. In the meantime, you can shared Neu Appliance and earn store credit.</p>
          </div>
          <h2 style=" font-size: 1.19vw; color: #242424 ">Questions? Suggestions? Insights show thoughts? Shoot us an email</h2>
          <div style=" border: 1px solid #D9D9D9; border-radius: 8px; padding: 0 16px ">
            <div style=" font-size: 0.83vw;display:flex;gap-x: 50px;padding-bottom:10px;padding-top:10px">
              <h3 style="color: #737373; min-width: 123px;">Order Number</h3>
              <span style=" color: #111010;font-size: 1vw;margin-top:7px;margin-bottom:7px; ">${orderNo}</span>
            </div>
            <div style=" font-size: 0.83vw;display:flex;gap-x: 50px;padding-bottom:10px;padding-top:10px">
              <h3 style="color: #737373; min-width: 123px;">Order Date</h3>
              <span style=" color: #111010;font-size: 1vw;margin-top:7px;margin-bottom:7px; ">${date}</span>
            </div>
            <div style=" font-size: 0.83vw;display:flex;gap-x: 50px;padding-bottom:10px;padding-top:10px">
              <h3 style="color: #737373; min-width: 123px;">Shipping&nbsp;Address</h3>
              <span style=" color: #111010;font-size: 1vw;margin-top:7px;margin-bottom:7px; ">${shippingAddress}</span>
            </div>
            <div style=" font-size: 0.83vw;display:flex;gap-x: 50px;padding-bottom:10px;padding-top:10px">
              <h3 style="color: #737373; min-width: 123px;">Billing&nbsp;Address</h3>
              <span style=" color: #111010;font-size: 1vw;margin-top:7px;margin-bottom:7px; ">${billingAddress}</span>
            </div>
          </div>
          <div style=" border: 1px solid #D9D9D9; border-radius: 8px;margin-top:10px;padding-left:16px;width: 100%">
            <h3 style=" font-size: 16px; color: #242424; font-weight: 500; letter-spacing: -0.2px ">Here’s what you ordered.</h3>
            <div style="">${htm}</div>
            <hr style="color:#D9D9D9;margin-right:10px;margin-left:10px" />
            <div style=" display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap ">
              <h3 style=" font-size: 1.19vw; font-weight: 600;width:100%;padding-left:12px">Subtotal (${cartCount} Items):</h3>
              <span style=" font-size: 32px; font-weight: 600;padding-right:12px ">$${grandTotal}</span>
            </div>
          </div>
        </div>
        <div style=" background-color: #071822; padding: 20px; color: white; font-size: 12px;gap: 40px;display:flex;width:100%;margin:auto">
          <div style="display:flex;margin-left:20px;margin-right:20px">
              <span style="width:100%">&#169; 2023 Neu Appliances</span>
              <div style="gap: 6px;">
                  <a style="color:white" href="/terms"> Terms of Use </a> • <a style="color:white" href="/privacy-policy"> Privacy Policy </a> • <a style="color:white" href="/help-and-support"> Help Center </a>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
