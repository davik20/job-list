import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';

async function fetchTags() {
  const { data, error } = await supabase.from('tags').select('*');

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tags = await fetchTags();
    res.status(200).json({ data: tags });
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
