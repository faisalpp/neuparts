import moment from "moment";

export const OrderTemplate = (order,host) => {

    let htm = '';
    const items = order.order_items;
    for (let i=0;i<items.length;i++) {
    let condition='';
    switch(items[i].condition){
     case 'certified-refurbished':
      condition = '<div style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 9999px; background-color: #7432FF; padding: 0.25rem 0.5rem; font-size: 8px; font-weight: 600; color: #ffffff;">Certified Refurbished</div>';
      break; 
     case 'like-new-open-box':
      condition = '<div style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 9999px; background-color: #4288A5; padding: 0.25rem 0.5rem; font-size: 8px; font-weight: 600; color: #ffffff;" >Like New / Open Box</div>';
      break; 
     case 'used-part-a-condition-grade':
      condition = '<div style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 9999px; background-color: #FF9A3E; padding: 0.25rem 0.5rem; font-size: 8px; font-weight: 600; color: #ffffff;" >Used • Grade A</div>';
      break;  
     case 'used-part-b-condition-grade':
      condition = '<div style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 9999px; background-color: #FF9A3E; padding: 0.25rem 0.5rem; font-size: 8px; font-weight: 600; color: #ffffff;" className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-2 py-1 text-[8px] font-semibold text-white xs:px-3 xs:text-xs">Used • Grade B</div>';
      break; 
     case 'used-part-c-condition-grade':
      condition = '<div style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 9999px; background-color: #FF9A3E; padding: 0.25rem 0.5rem; font-size: 8px; font-weight: 600; color: #ffffff;" className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-2 py-1 text-[8px] font-semibold text-white xs:px-3 xs:text-xs">Used • Grade C</div>';
      break; 
     case 'used-part-d-condition-grade':
      condition = '<div style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 9999px; background-color: #FF9A3E; padding: 0.25rem 0.5rem; font-size: 8px; font-weight: 600; color: #ffffff;" className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[] px-2 py-1 text-[8px] font-semibold text-white xs:px-3 xs:text-xs">Used • Grade D</div>';
      break; 
    }

    htm += `<div style=" display: flex; gap: 14px;width:100%">
    <div style=" min-width: 64px; position: relative;">
        <img src="${items[i].thumbnail}" style=" width: 64px; height: 64px; object-fit: contain " alt="" />
    </div>
    <div style="gap-x: 14px;display:flex; justify-content: space-between; align-items: center;width:80%  ">
        <div style="margin: 0px 0px 0px 10px;" >
        <h3 style=" font-size: 14px; font-weight: 500; color: #333; letter-spacing: -0.2px;width:100%">${items[i].title}</h3>
        ${condition}
        </div>
        <div style="margin: 10px 0px 0px 10px;" >
         <span style="padding:5px 10px; color: white; font-weight: 500; display: flex; justify-content: center; align-items: center;font-size: 12px; border-radius: 100%; background-color: #22A6AB ">
         ${items[i].quantity}
        </span>
        </div>
        <div style=" color: #22A6AB; font-size: 14px; font-weight: 500;margin: 10px 0px 0px 50px ">
           <b> $${items[i].is_sale ? items[i].sale_price : items[i].regular_price}</b>
        </div>
    </div>
 </div>`
}

const createdAt = moment(order.createdAt).format("DD-MM-YYYY");

    const template = 
     ` 
     <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
  </head>
  <body>

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
              <p style=" margin-top: 40px ">Your Neu Appliance order #${order.order.order_no} has successfully been placed, You will find all the details about your order below, and we’ll send you a shipping confirmation email as soon as your order ships. In the meantime, you can shared Neu Appliance and earn store credit.</p>
            </div>
            <h2 style=" font-size: 1.19vw; color: #242424 ">Questions? Suggestions? Insights show thoughts? Shoot us an email</h2>
            <div style=" border: 1px solid #D9D9D9; border-radius: 8px; padding: 0 16px ">
              <div style="font-size: 0.83vw;display:flex;align-items:center;gap-x: 50px;padding-bottom:10px;padding-top:10px">
                <h3 style="color: #737373; min-width: 123px;">Order Number</h3>
                <span style="color: #111010;font-size: 1vw;margin:14px 0px 0px 0px">${order.order.order_no}</span>
              </div>
              <div style=" font-size: 0.83vw;display:flex;gap-x: 50px;padding-bottom:10px;padding-top:10px">
                <h3 style="color: #737373; min-width: 123px;">Order Date</h3>
                <span style=" color: #111010;font-size: 1vw;margin:14px 0px 0px 0px">${createdAt}</span>
              </div>
              <div style=" font-size: 0.83vw;display:flex;gap-x: 50px;padding-bottom:10px;padding-top:10px">
                <h3 style="color: #737373; min-width: 123px;">Shipping&nbsp;Address</h3>
                <span style=" color: #111010;font-size: 1vw;margin:14px 0px 0px 14px">${order.shipping_address}</span>
              </div>
              <div style=" font-size: 0.83vw;display:flex;gap-x: 50px;padding-bottom:10px;padding-top:10px">
                <h3 style="color: #737373; min-width: 123px;">Billing&nbsp;Address</h3>
                <span style=" color: #111010;font-size: 1vw;margin:14px 0px 0px 0px">${order.billing_address}</span>
              </div>
            </div>
            <div style=" border: 1px solid #D9D9D9; border-radius: 8px;margin-top:10px;padding-left:16px;">
              <h3 style=" font-size: 16px; color: #242424; font-weight: 500; letter-spacing: -0.2px ">Here’s what you ordered.</h3>
              <div>${htm}</div>
              <hr style="color:#D9D9D9;margin-right:10px;margin-left:10px" />
              <div style=" display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap ">
                <h3 style=" font-size: 1.19vw; font-weight: 600;width:100%;padding-left:12px">Subtotal (${order.cart_count} Items):</h3>
                <span style=" font-size: 32px; font-weight: 600;padding-right:12px">$${order.order.grand_total}</span>
              </div>
            </div>
          </div>
          <div style=" background-color: #071822; padding: 20px; color: white; font-size: 12px;gap: 40px;display:flex;margin:auto">
            <div style="display:flex;margin-left:20px;margin-right:20px;width:100%">
                <span style="width:100%">&#169; 2023 Neu Appliances</span>
                <div style="display:flex;gap: 6px;width:100%">
                    <a style="color:white" href="${host}/terms"> Terms&nbsp;of&nbsp;Use&nbsp;</a>&nbsp;•&nbsp;<a style="color:white" href="${host}/privacy-policy"> Privacy&nbsp;Policy </a>&nbsp;•&nbsp;<a style="color:white" href="${host}/help-and-support"> Help&nbsp;Center </a>
                </div>
            </div>
          </div>
        </div>
      </div>   

  </body>
  </html>
     `;
   
    return template;
  }