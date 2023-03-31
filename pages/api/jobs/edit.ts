import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';

const editJob = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        const { id, title, company, tags } = req.body;

        console.log(req.body)

        if (!id || !title || !company || !Array.isArray(tags)) {
            console.log('not ofund')
            return res.status(400).json({ error: 'Invalid request parameters' });
        }

        try {
            // Update job record
            const { error: updateError} = await supabase
                .from('jobs')
                .update({ title, company })
                .match({ id });

                console.log(updateError, 'update error')

            if (updateError) {
                throw updateError;
            }

            // Delete existing JobTags
            const { error: deleteError } = await supabase
                .from('job-tags').delete()
                .match({ job_id: id });

            if (deleteError) {
                throw deleteError;
            }

            // Insert new JobTags
            const newJobTags = tags.map((tag_id: string) => ({
                job_id: id,
                tag_id,
            }));

            console.log('new job tag', newJobTags)
            const { error: insertError } = await supabase
                .from('job-tags')
                .insert(newJobTags);

                console.log(insertError)
            if (insertError) {
                throw insertError;
            }

            res.status(200).json({ message: 'Job updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', 'PUT');
        // res.status(405).end(Method ${req.method} Not Allowed);
    }
};

export default editJob;