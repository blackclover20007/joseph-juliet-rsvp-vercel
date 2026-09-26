import { NextResponse } from 'next/server';
import { supabasePublic } from '../../../lib/supabase';
export async function POST(req){
 try{const body=await req.json();const attending=['Yes','No','Maybe'].includes(body.attending)?body.attending:null;const guest_count=Number(body.guest_count);const guest_names=String(body.guest_names||'').trim();if(!attending||!Number.isInteger(guest_count)||guest_count<1||guest_count>10||!guest_names)return NextResponse.json({error:'Invalid RSVP'}, {status:400});
 const {error}=await supabasePublic.from('rsvps').insert({attending,guest_count,guest_names,phone:String(body.phone||'').trim(),message:String(body.message||'').trim()});if(error)throw error;return NextResponse.json({ok:true});
 }catch(e){return NextResponse.json({error:'Unable to save RSVP'}, {status:500})}
}
