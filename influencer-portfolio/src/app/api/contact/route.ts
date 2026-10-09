import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  let data: Record<string,unknown>;
  try {data=await request.json()} catch {return NextResponse.json({error:'Invalid request.'},{status:400})}
  const {brand,name,email,type,budget,details}=data;
  if ([brand,name,email,type,budget,details].some(v=>typeof v!=='string') || String(brand).trim().length<2 || String(name).trim().length<2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email)) || String(details).trim().length<10 || String(details).length>5000) return NextResponse.json({error:'Please complete all fields with valid details.'},{status:400});
  const {RESEND_API_KEY:key,CONTACT_TO_EMAIL:to,CONTACT_FROM_EMAIL:from}=process.env;
  if (!key||!to||!from) return NextResponse.json({error:'The contact form is not configured yet. Please reach out through the social link.'},{status:503});
  try {const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to,reply_to:email,subject:`Creator inquiry from ${String(brand).slice(0,100)}`,text:`Brand: ${brand}\nContact: ${name}\nEmail: ${email}\nType: ${type}\nBudget: ${budget}\n\n${details}`})});if(!response.ok)throw Error();return NextResponse.json({ok:true})}catch{return NextResponse.json({error:'Your inquiry could not be sent. Please try again.'},{status:502})}
}
