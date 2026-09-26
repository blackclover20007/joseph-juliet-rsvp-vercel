'use client';
import { useState } from 'react';

export default function Home(){
 const [form,setForm]=useState({attending:'Yes',guest_count:'1',guest_names:'',phone:'',message:''});
 const [status,setStatus]=useState('idle');
 const update=(e)=>setForm({...form,[e.target.name]:e.target.value});
 async function submit(e){e.preventDefault();setStatus('loading');try{const r=await fetch('/api/rsvp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,guest_count:Number(form.guest_count)})});if(!r.ok)throw new Error();setStatus('success')}catch{setStatus('error')}}
 return <main className="page">
  <section className="hero"><div className="hero-inner"><div className="monogram">J<span className="gold">&</span>J</div><div className="eyebrow">Together with their families</div><h1 className="serif">Joseph <span className="gold">&</span> Juliet</h1><div className="gold-rule"/><div className="date">Monday, 21 December 2026</div><div className="venue">Munondo 11 Events</div></div></section>
  <section className="section">
   <div className="intro"><div className="eyebrow gold">A celebration of love</div><h2>We would be honoured to celebrate with you</h2><p>Please confirm your attendance by completing the RSVP below. This celebration is strictly by invitation and strictly no children.</p></div>
   <div className="details"><div className="detail"><small>Date</small><strong>21 December 2026</strong></div><div className="detail"><small>Venue</small><strong>Munondo 11 Events</strong></div><div className="detail"><small>RSVP by</small><strong>15 October 2026</strong></div></div>
   <div className="form-card">
    {status==='success'?<div className="message"><div className="check">✓</div><h2 className="serif">Thank you!</h2><p>Your RSVP has been received. We look forward to celebrating this beautiful day with you.</p><div className="gold-rule"/><strong className="serif" style={{fontSize:22}}>Joseph & Juliet</strong></div>:<><h2 className="form-title">Wedding RSVP</h2><p style={{textAlign:'center',color:'#777'}}>Kindly submit your response by <b>15 October 2026</b>.</p>
     <form onSubmit={submit}>
      <div className="field"><label>Will you be attending our wedding? <span className="required">*</span></label><div className="options">{['Yes','No','Maybe'].map(x=><label className="option" key={x}><input type="radio" name="attending" value={x} checked={form.attending===x} onChange={update}/>{x}</label>)}</div></div>
      <div className="field"><label>How many invited guests will be attending with you? <span className="required">*</span></label><div className="hint">Please select only the number of guests stated on your invitation. Unfortunately, we are unable to accommodate additional guests.</div><select className="input" name="guest_count" value={form.guest_count} onChange={update} required>{[1,2,3,4].map(n=><option key={n} value={n}>{n} {n===1?'guest':'guests'}</option>)}</select></div>
      <div className="field"><label>Full name(s) of everyone attending under this invitation <span className="required">*</span></label><div className="hint">Please include your name. Example: Joseph Moyo, Mary Moyo</div><textarea className="textarea" name="guest_names" value={form.guest_names} onChange={update} required placeholder="Enter full name(s)"/></div>
      <div className="field"><label>Phone / WhatsApp number</label><input className="input" name="phone" value={form.phone} onChange={update} placeholder="e.g. +263 77 123 4567"/></div>
      <div className="field"><label>Message to the couple</label><textarea className="textarea" name="message" value={form.message} onChange={update} placeholder="Optional message"/></div>
      {status==='error'&&<p className="error">Something went wrong. Please try again.</p>}
      <button className="submit" disabled={status==='loading'}>{status==='loading'?'Submitting…':'Submit RSVP'}</button>
     </form></>}
   </div>
   <div className="dress"><div className="eyebrow">Dress code</div><h3>Dark Shades</h3><p>We kindly ask guests to dress in dark shades such as black, navy and charcoal grey.</p><div className="swatches"><span className="swatch black"/><span className="swatch navy"/><span className="swatch charcoal"/></div></div>
  </section><footer className="footer">With love, Joseph & Juliet<small>21 • 12 • 2026</small></footer>
 </main>
}
