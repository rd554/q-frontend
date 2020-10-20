import Head from "next/head";
import Link from "next/link";
import Card from "../../components/blog/Card";
import moment from "moment";
import renderHTML from "react-render-html";
import Layout from "../../components/Layout";
import { singleCategory } from "../../actions/category";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

const Category = ({ category, blogs, query }) => {
  const head = () => {
    <Head>
      <title>
        {category.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`Mental health blogs on ${category.name}`}
      />
      <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Mental health blogs on ${category.name}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/public/images/instagram.png`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/public/images/instagram.png`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>;
  };

  const showCategoryBlogs = () => {
    return blogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div>
            <header>
              <div className="rounded ml-3 mr-3 hor-list-nobar overflow-x-auto whitespace-no-wrap py-3 px-2">
              <div className="cursor-pointer rounded-full categories text-white font-extrabold hover:bg-gray-500 text-sm focus:outline-none focus:shadow-outline transition mt-1 ml-2 px-2">{category.name}</div></div>
              {showCategoryBlogs()}
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

export async function getServerSideProps({ query }) {
  return singleCategory(query.slug).then((res) => {
    if (res.err) {
      console.log(res.error);
    } else {
      return { 
        props: {
          category: res.category, blogs: res.blogs, query
        }
         };
    }
  });
};

export default Category;
