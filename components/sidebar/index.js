import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./sidebar.module.css";
import classNames from "classnames";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from "next/router";


export default function Navbar() {
  const supabaseClient = useSupabaseClient()
  const user = useUser();
  const router = useRouter();

  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  const navItems = {
    "/": {
      name: "Home",
    },
    "/about": {
      name: "About",
    },
    "/blog": {
      name: "Blog",
    },
    "/create-post": {
      name: "Create post",
      requiersAuth: true,
    },
    "/profil": {
      name: "Profil",
      requiersAuth: true,
    },
    "/login": {
      name: "Login",
      requiersAuth: false,
    },
    "/logout": {
      name: "Logout",
      requiersAuth: true,
      onClick: async() => {
      await supabaseClient.auth.signOut();
      router.push("/login");
      },
    },
  };


  return (
    <aside className={styles.container}>
      <div className={styles.sticky}>
        <nav className={styles.navigation} id="nav">
          <div className={styles.navigationItemWrapper}>
            {Object.entries(navItems).map(([path, { name, requiersAuth, onClick }]) => {
              const isActive = path === pathname;

              if((requiersAuth && !user) || (path === "/login" && user)) {
                return null;
              }

              if (path === "/logout") {
                return (
                  <button 
                  className={classNames(styles.navigationButton, {
                    [styles.textNeutral]: !isActive,
                    [styles.fontBold]: isActive,
                  })}key={path}
                  onClick={onClick}
                  >{name}
                  </button>
                )
              }

              return (
                <Link
                  key={path}
                  href={path}
                  className={classNames(styles.navigationItem, {
                    [styles.textNeutral]: !isActive,
                    [styles.fontBold]: isActive,
                  })}
                >
                  <span className={styles.linkName}>{name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}

