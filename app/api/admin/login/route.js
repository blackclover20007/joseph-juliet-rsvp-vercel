import { NextResponse } from 'next/server';
import { createAdminToken, cookieName } from '../../../../lib/auth';
export async function POST(req){const {password}=await req.json();if(!password||password!==process.env.ADMIN_PASSWORD)return NextResponse.json({error:'Invalid password'},{status:401});const token=await createAdminToken();const res=NextResponse.json({ok:true});res.cookies.set(cookieName,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*12});return res}
