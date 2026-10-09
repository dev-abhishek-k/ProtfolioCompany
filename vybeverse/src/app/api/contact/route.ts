import {NextResponse} from 'next/server';
export async function POST(request:Request){
  let body:Record<string,unknown>;try{body=await request.json()}catch{return NextResponse.json({error:'Invalid request.'},{status:400})}
  const {name,email,brand,type,budget,message}=body;
  if([name,email,brand,type,budget,message].some(v=>typeof v!=='string')||String(name).trim().length<2||String(brand).trim().length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))||String(message).trim().length<10||String(message).length>5000)return NextResponse.json({error:'Please check the form fields.'},{status:400});
  const {RESEND_API_KEY:key,CONTACT_TO_EMAIL:to,CONTACT_FROM_EMAIL:from}=process.env;
  if(!key||!to||!from)return NextResponse.json({error:'Contact delivery is not configured yet. Please use the social link.'},{status:503});
  try{const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to,reply_to:email,subject:`VYBEVERSE inquiry from ${String(brand).slice(0,100)}`,text:`Name: ${name}\nEmail: ${email}\nBrand: ${brand}\nType: ${type}\nBudget: ${budget}\n\n${message}`})});if(!response.ok)throw Error();return NextResponse.json({ok:true})}catch{return NextResponse.json({error:'The inquiry could not be delivered. Please try again.'},{status:502})}
}
