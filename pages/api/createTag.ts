import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { tagName } = req.body;

    console.log(req.body)

    if (!tagName) {

      
      res.status(400).json({ error: 'Tag name is required' });
      return;
    }

    try {
      const { data, error } = await supabase.from('tags').insert([{ name: tagName }]);

      if (error) {
        throw error;
      }
      if(data){
        res.status(200).json({ tag: data[0] });
      }else {
        res.status(200).json({ tag: null });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
