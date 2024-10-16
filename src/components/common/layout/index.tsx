import { FunctionComponent, ReactNode } from "react";
import PageHead from "./head";
import { DEFAULT_PAGE_TITLE } from "@/logic/constants";
import Header from "./header";
import styles from './index.module.scss'
import Footer from "./footer";


type LayoutProps = {
  title: string,
  exactTitle?: boolean,
  metaDescription?: string,
  children: ReactNode,
}

const Layout: FunctionComponent<LayoutProps> = ({ title, exactTitle, metaDescription, children }) => {
  const titleToUse = exactTitle ? title : `${DEFAULT_PAGE_TITLE} | ${title}`

  return (
    <>
      <PageHead
        title={title}
        metaDescription={metaDescription ?? titleToUse}
      />
      
      <Header />

      <main className={styles.pageBody}>
        {children}
      </main>

      <Footer />
    </>
  );
}
 
export default Layout;