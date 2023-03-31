import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';
import bodyParser from 'body-parser';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { tagName } = JSON.parse(req.body);

    console.log(req.body)



    if (!tagName) {
      res.status(400).json({ error: 'Tag name is required' });
      return;
    }

    console.log(tagName)

    try {
      const result= await supabase.from('tags').insert([{ name: tagName }]);
      console.log(result, 'es')
      const {data, error } = result
      console.log(data, 'data')
      if (error) {
        throw error;
      }
        
      res.status(200).json({ message: "success", error: null});
    
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
