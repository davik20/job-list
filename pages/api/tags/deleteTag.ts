import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';

async function deleteTag(id: number) {
  const { error } = await supabase.from('tags').delete().eq('id', id);

  if (error) {
    console.error('Error deleting tag:', error);
    return false;
  }
  return true;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } =  JSON.parse(req.body);

  console.log(id)

  if (req.method === 'DELETE') {
    const isDeleted = await deleteTag(id);
    res.status(200).json({ success: isDeleted });
  } else {
    res.setHeader('Allow', 'DELETE');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
