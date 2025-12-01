import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

// Note: In production, generate proper types with `supabase gen types typescript`
// These API routes use type assertions until proper schema is deployed

export async function GET() {
  try {
    const supabase = await createServerClient();
    
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: accounts, error } = await (supabase as any)
      .from('ad_accounts')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching accounts:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ accounts });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient();
    const body = await request.json();
    
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: account, error } = await (supabase as any)
      .from('ad_accounts')
      .insert({
        name: body.name,
        platform: body.platform,
        platform_account_id: body.platform_account_id,
        organization_id: body.organization_id,
        currency: body.currency || 'USD',
        timezone: body.timezone || 'America/New_York',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating account:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ account }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

