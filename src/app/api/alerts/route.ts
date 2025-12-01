import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

// Note: In production, generate proper types with `supabase gen types typescript`

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('account_id');
    const status = searchParams.get('status');
    
    const supabase = await createServerClient();
    
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false });

    if (accountId) {
      query = query.eq('ad_account_id', accountId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data: alerts, error } = await query;

    if (error) {
      console.error('Error fetching alerts:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ alerts });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createServerClient();
    const body = await request.json();
    const { id, status, ...updates } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Alert ID required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = { ...updates };
    
    if (status === 'acknowledged') {
      updateData.status = 'acknowledged';
      updateData.acknowledged_at = new Date().toISOString();
    } else if (status === 'resolved') {
      updateData.status = 'resolved';
      updateData.resolved_at = new Date().toISOString();
    } else if (status) {
      updateData.status = status;
    }

    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: alert, error } = await (supabase as any)
      .from('alerts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating alert:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ alert });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
