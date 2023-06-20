import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./sidebar.module.css";
import classNames from "classnames";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setTimeout(() => {
      setShowMenu(false);
    }, 350); // Add a delay of 300ms before closing the menu
  };

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
      onClick: async () => {
        await supabaseClient.auth.signOut();
        router.push("/login");
      },
    },
  };

  return (
    <aside className={styles.container}>
      <div className={styles.sticky}>
        <nav className={styles.navigation} id="nav">
          <Link className={styles.imgContainer} key={"/blog"} href={"/blog"}>
            <Image
              src="/images/the-midsummer-blog-logo.svg"
              alt="svensk sommaräng"
              width={600}
              height={400}
              className={styles.img}
              priority={true}
            />
          </Link>
          <div className={styles.menuIconContainer} onClick={toggleMenu}>
            {showMenu ? (
              <IoMdClose className={styles.menuIcon} onClick={closeMenu} />
            ) : (
              <HiMenuAlt3 className={styles.menuIcon} />
            )}
          </div>
          <div
            className={`${styles.navigationItemWrapper} ${
              showMenu ? styles.showNavigation : ""
            }`}
          >
            {Object.entries(navItems).map(
              ([path, { name, requiersAuth, onClick }]) => {
                const isActive = path === pathname;

                if ((requiersAuth && !user) || (path === "/login" && user)) {
                  return null;
                }

                if (path === "/logout") {
                  return (
                    <button
                      className={classNames(styles.navigationButton, {
                        [styles.textNeutral]: !isActive,
                        [styles.fontBold]: isActive,
                      })}
                      key={path}
                      onClick={() => {
                        closeMenu();
                        onClick && onClick();
                      }}
                    >
                      {name}
                    </button>
                  );
                }

                return (
                  <Link
                    key={path}
                    href={path}
                    className={classNames(styles.navigationItem, {
                      [styles.textNeutral]: !isActive,
                      [styles.fontBold]: isActive,
                    })}
                    onClick={closeMenu}
                  >
                    <span className={styles.linkName}>{name}</span>
                  </Link>
                );
              }
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}
