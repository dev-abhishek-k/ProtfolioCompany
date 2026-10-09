import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({error:'Invalid request.'},{status:400}); }
  if (!body || typeof body !== 'object') return NextResponse.json({error:'Invalid request.'},{status:400});
  const {name,email,message} = body as Record<string,unknown>;
  if (typeof name !== 'string' || name.trim().length < 2 || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) return NextResponse.json({error:'Please enter a valid name, email, and message (at least 10 characters).'},{status:400});
  const apiKey=process.env.RESEND_API_KEY, to=process.env.CONTACT_TO_EMAIL, from=process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return NextResponse.json({error:'Messaging is not configured yet. Please use the email link when available.'},{status:503});
  try {
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to,reply_to:email,subject:`Portfolio message from ${name.trim()}`,text:`From: ${name.trim()} <${email}>\n\n${message.trim()}`})});
    if (!response.ok) throw new Error('Email delivery failed');
    return NextResponse.json({success:true});
  } catch { return NextResponse.json({error:'Message could not be sent. Please try again later.'},{status:502}); }
}
