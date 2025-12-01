import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

// Note: In production, generate proper types with `supabase gen types typescript`

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('account_id');
    const type = searchParams.get('type');
    const status = searchParams.get('status') || 'pending';
    
    const supabase = await createServerClient();
    
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = supabase
      .from('suggestions')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (accountId) {
      query = query.eq('ad_account_id', accountId);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data: suggestions, error } = await query;

    if (error) {
      console.error('Error fetching suggestions:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createServerClient();
    const body = await request.json();
    const { id, action, dismissed_reason } = body;
    
    if (!id || !action) {
      return NextResponse.json({ error: 'ID and action required' }, { status: 400 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    let updateData: Record<string, unknown> = {};
    
    if (action === 'apply') {
      updateData = {
        status: 'applied',
        applied_at: new Date().toISOString(),
        applied_by: user?.id,
      };
    } else if (action === 'dismiss') {
      updateData = {
        status: 'dismissed',
        dismissed_reason,
      };
    } else if (action === 'snooze') {
      updateData = {
        status: 'snoozed',
      };
    }

    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: suggestion, error } = await (supabase as any)
      .from('suggestions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating suggestion:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

