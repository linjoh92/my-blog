import styles from "./root-layout.module.css";
import Sidebar from "../sidebar";
import classNames from "classnames";

import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '900'], 
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <div className={classNames(styles.container, poppins.className)}>
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
