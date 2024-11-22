import { NextResponse } from 'next/server';
import {NeuMailer} from '@/mailer/neu-mailer'
import {Contact} from '@/mailer/templates/contact'

export async function GET(request) {

    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name')
    const from = searchParams.get('email')
    const message = searchParams.get('message')

    const MailTemplate = Contact({name:name,email:from,message:message}) 
    const to = process.env.CONTACT_RECIEVER;

    await NeuMailer(to,'Contact Message',MailTemplate)
    
    return NextResponse.json({ success: true});
  }