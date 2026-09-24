import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App safely without re-initializing
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
];

const provider = new GoogleAuthProvider();
WORKSPACE_SCOPES.forEach((scope) => provider.addScope(scope));

// In-memory token cache (never stored in localStorage)
let cachedAccessToken = null;
let isSigningIn = false;

export const initAuth = (onAuthSuccess, onAuthFailure) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async () => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google Sheets access token');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Google Sign-In failed:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = () => cachedAccessToken;

export const googleSignOut = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Creates a new Google Spreadsheet on user's Google Drive with formatted tabs and initial restaurant data.
 */
export const createRestaurantSpreadsheet = async (title = 'Al Aziz Restaurant - Master Data') => {
  const token = cachedAccessToken;
  if (!token) throw new Error('Not authenticated with Google Sheets.');

  // 1. Create spreadsheet with multiple sheets
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: `${title} (${new Date().toLocaleDateString('en-GB')})`,
      },
      sheets: [
        { properties: { title: 'Live Orders', gridProperties: { frozenRowCount: 1 } } },
        { properties: { title: 'Inventory & Stock', gridProperties: { frozenRowCount: 1 } } },
        { properties: { title: 'Menu Pricing & Halves', gridProperties: { frozenRowCount: 1 } } },
      ],
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json();
    throw new Error(err.error?.message || 'Failed to create Google Spreadsheet');
  }

  const spreadsheet = await createRes.json();
  const spreadsheetId = spreadsheet.spreadsheetId;

  // 2. Populate sheets with initial Al Aziz data
  const ordersValues = [
    ['Order ID', 'Type', 'Customer / Table', 'Phone', 'Items', 'Total (PKR)', 'Payment', 'Status', 'Timestamp'],
    ['#1044', 'Dine In', 'Table 1 (Family Hall)', '+92 300 1234567', '1x Desi Murgh Karahi, 4x Roghni Naan', 4200, 'Pending', 'Preparing', '10:45 AM'],
    ['#1042', 'Dine In', 'Table 4', '+92 301 2345678', '1x Chicken Biryani, 2x Special Naan', 2480, 'Cash', 'Delivered', '10:20 AM'],
    ['#1041', 'Delivery', 'Sarah Khan (F-7/2)', '+92 321 9876543', '1x Desi Murgh Karahi, 4x Naan, Raita', 1950, 'COD', 'Out for Delivery', '10:35 AM'],
    ['#1040', 'Delivery', 'Dr. Hamza Aslam (F-10)', '+92 300 8765432', '2x Chicken Biryani, 1x Seekh Kebab', 3400, 'Paid Online', 'Out for Delivery', '10:40 AM'],
    ['#1038', 'Takeaway', 'Bilal Ahmed (Counter)', '+92 345 6789012', '1x Mutton Handi, 4x Butter Naan', 3150, 'Cash', 'Completed', '09:55 AM'],
  ];

  const inventoryValues = [
    ['Item Name', 'Category', 'Stock Level', 'Min Threshold', 'Unit', 'Unit Cost (PKR)', 'Supplier', 'Status'],
    ['Basmati Super Kernel Rice', 'Grains & Rice', 85, 20, 'kg', 340, 'Punjab Rice Traders', 'In Stock'],
    ['Fresh Farm Chicken', 'Meat & Poultry', 45, 15, 'kg', 580, 'Rawalpindi Halal Poultry', 'In Stock'],
    ['Fresh Mutton (Goat)', 'Meat & Poultry', 22, 10, 'kg', 1950, 'Al-Rehman Halal Meats', 'In Stock'],
    ['Fine Maida Flour (Tandoor)', 'Bakery & Flour', 120, 30, 'kg', 145, 'Fauji Cereals Depot', 'In Stock'],
    ['Premium Cooking Oil', 'Oils & Fats', 2, 8, 'liters', 520, 'Habib Oil Mills', 'Critical Low Stock'],
    ['Cooking Desi Ghee', 'Oils & Fats', 14, 5, 'kg', 2400, 'Pure Village Dairy Farm', 'In Stock'],
    ['Special Biryani Masala', 'Spices & Seasoning', 18, 5, 'kg', 850, 'National Spice Bazaar', 'In Stock'],
    ['Tomatoes & Onions', 'Vegetables', 60, 20, 'kg', 120, 'Subzi Mandi I-11', 'In Stock'],
  ];

  const menuValues = [
    ['Dish Name', 'Category', 'Half Price (PKR)', 'Full Price (PKR)', 'Available', 'Prep Time (Mins)'],
    ['Special Chicken Biryani', 'Biryani & Pulao', 420, 780, 'Yes', 15],
    ['Desi Murgh Karahi', 'Karahi & Handi', 950, 1850, 'Yes', 30],
    ['Mutton Handi Boneless', 'Karahi & Handi', 1450, 2800, 'Yes', 35],
    ['Beef Seekh Kebab Platter', 'BBQ & Grills', 450, 850, 'Yes', 20],
    ['Chicken Malai Boti', 'BBQ & Grills', 550, 1050, 'Yes', 20],
    ['Special Roghni Naan', 'Tandoor & Breads', null, 150, 'Yes', 5],
    ['Garlic Butter Naan', 'Tandoor & Breads', null, 120, 'Yes', 5],
  ];

  // Batch update spreadsheet values
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      valueInputOption: 'USER_ENTERED',
      data: [
        { range: 'Live Orders!A1', values: ordersValues },
        { range: 'Inventory & Stock!A1', values: inventoryValues },
        { range: 'Menu Pricing & Halves!A1', values: menuValues },
      ],
    }),
  });

  return {
    spreadsheetId,
    title: spreadsheet.properties.title,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
  };
};

/**
 * Append new orders to an existing Google Spreadsheet.
 */
export const appendOrderToSheet = async (spreadsheetId, orderData) => {
  const token = cachedAccessToken;
  if (!token) throw new Error('Not authenticated with Google Sheets.');

  const values = [
    [
      orderData.id,
      orderData.type,
      orderData.customer || orderData.table || 'Walk-in',
      orderData.phone || '—',
      orderData.items,
      orderData.total,
      orderData.paymentMethod || 'Cash',
      orderData.status || 'Received',
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    ],
  ];

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Live Orders!A1:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to append to Google Sheet');
  }

  return await res.json();
};
