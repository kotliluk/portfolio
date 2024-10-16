import Head from 'next/head'
import { FunctionComponent } from 'react'


type PageHeadProps = {
  title: string,
  metaDescription: string,
}

const PageHead: FunctionComponent<PageHeadProps> = ({ title, metaDescription }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default PageHead