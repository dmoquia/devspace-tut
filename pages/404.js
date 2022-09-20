import Image from "next/image";
import Layout from "../components/Layout";

export default function PageNotFound() {
  return (
    <Layout title="Page not found">
      <div className="flex flex-col items-center mt-20">
        <Image
          src="/images/logo.png"
          alt="logo"
          className="bg-gray-800 rounded-2xl"
          height={70}
          width={70}
        />
        <h1 className="text-6xl my-5">Whoops!</h1>
        <h2 className="text-4xl text-gray-400 mb-5">
          This page does not exist
        </h2>
      </div>
    </Layout>
  );
}
