import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from "./login.module.css";


const LoginPage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter();
  console.log(user)

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

    return (
      <>
        <div className={styles.conatiner}>
          <Auth
            redirectTo="http://localhost:3000/"
            appearance={{ theme: ThemeSupa }}
            supabaseClient={supabaseClient}
            providers={[]}
            socialLayout="horizontal"
          />
        </div>
      </>
    )
}

export default LoginPage
