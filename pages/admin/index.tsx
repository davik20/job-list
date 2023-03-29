import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import Admin from '../../components/admin';
import Auth from '../auth';

const AdminPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>("")
 
  console.log(user, 'user')

  useEffect(() => {
    supabase.auth.getUser().then(user => {
      if (!user.data.user) {
        console.log(router)
        router.replace('/auth')
      }
      console.log(user.data.user)
      setUser(user.data.user)
    })
   
  }, []);

  // if (!user) {
  //   return <Auth />;
  // }

  return <Admin />;
};

export default AdminPage;
