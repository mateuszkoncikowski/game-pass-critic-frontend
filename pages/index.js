import Head from "next/head";
import Layout, {siteTitle} from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import fetchAPI from "../lib/api";
import {map, pick, pipe} from "ramda";

export default function Home({ data }) {
  const selectedData = pipe(map(pick(["LocalizedProperties"])))(data);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        {JSON.stringify(selectedData, null, 2)}
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await fetchAPI();
  return {
    props: {
      data,
    },
    revalidate: 5,
  };
}
