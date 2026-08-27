import { NextResponse } from 'next/server'
import { createStorySubmission, validateSubmission } from '@/lib/config/site'
export async function POST(request: Request){ try { const body=await request.json(); if(body.website) return NextResponse.json({error:'Invalid request'},{status:400}); const errors=validateSubmission(body); if(Object.keys(errors).length) return NextResponse.json({errors},{status:422}); await createStorySubmission(body); return NextResponse.json({ok:true}) } catch { return NextResponse.json({error:'Story submission storage is not configured yet.'},{status:503}) } }
