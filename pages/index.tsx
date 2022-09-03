import type { NextPage, NextPageContext } from "next";
import { getBlog } from "../lib/file";

const Home: NextPage = ({ blog }) => {
  return <p>{blog}</p>;
};

export async function getStaticProps(context: NextPageContext) {
  const { blog } = await getBlog();
  return {
    props: { blog: blog },
  };
}

export default Home;
