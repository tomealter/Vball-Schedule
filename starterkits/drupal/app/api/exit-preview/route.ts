import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

function GET() {
  draftMode().disable();
  redirect('/');
}

export { GET };
