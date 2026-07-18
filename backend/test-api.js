const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

async function testApi() {
  const secret = process.env.SUPABASE_JWT_SECRET;
  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (!secret) throw new Error("Missing SUPABASE_JWT_SECRET");
  
  const token = jwt.sign(
    { 
      email: adminEmail,
      aud: 'authenticated',
      role: 'authenticated'
    }, 
    secret, 
    { expiresIn: '1h' }
  );

  console.log("Generated Token:", token.substring(0, 20) + "...");
  
  try {
    const res = await fetch('http://localhost:5000/api/contacts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log("Response:", data);
  } catch (error) {
    console.error("Fetch Error:", error.message);
  }
}

testApi();
