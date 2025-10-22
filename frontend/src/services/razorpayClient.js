/* global Razorpay */

import axios from 'axios';
import { BASE_URL } from '../config/api';

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error(`Failed to load script ${src}`));
    document.body.appendChild(script);
  });

export const initRazorpayCheckout = async ({ orderId, amount, student }) => {
  await loadScript('https://checkout.razorpay.com/v1/checkout.js');

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1234567890',
    amount: amount * 100,
    currency: 'INR',
    name: 'Edunidhi Finance',
    description: 'Fee Payment',
    order_id: orderId,
    prefill: {
      name: student.name,
      email: student.email,
      contact: student.contact
    },
    notes: {
      module: 'finance'
    },
    theme: {
      color: '#1f6feb'
    }
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};

export async function createTestOrder() {
  const res = await axios.post(`${BASE_URL}/payment/order`, { amount: 100 });
  console.log('Order created:', res.data);
}

window.createTestOrder = createTestOrder;

export default initRazorpayCheckout;
