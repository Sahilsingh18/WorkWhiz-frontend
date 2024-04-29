import { mongooseConnect } from "@/lib/mongoose";
import Hero from "./components/Hero";
import { ServiceAgent } from "@/models/Product";
import Products from "./components/Products";
import Collection from "./components/Collection";

export default function Home({ featuredProduct, newProducts, collectionProduct1, allProducts }) {
  return (
    <main
      className={`min-h-screen p-4 bg-background `}
    >

      <Hero serviceAgent={featuredProduct} />

      <hr class="my-1 h-px border-0 bg-gray-300" />

      <Products products={newProducts} />
      <hr class="my-1 h-px border-0 bg-gray-300" />
      <Collection product={collectionProduct1} />
    </main>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredId = '662fb321370ccfca75c7ab64';
  const collectionId = '662fb703d75fe3f76e40dcfe';

  const featuredProduct = await ServiceAgent.findById(featuredId);
  const collectionProduct1 = await ServiceAgent.findById(collectionId);
  const newProducts = await ServiceAgent.find({}, null, {sort: {'_id': 1}, limit: 5})
  const allProducts = await ServiceAgent.find({}, null, {sort: {'_id': 1}})

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      collectionProduct1: JSON.parse(JSON.stringify(collectionProduct1)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    }
  }
}
