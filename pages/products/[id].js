import { CartContext } from "@/lib/CartContext";
import { mongooseConnect } from "@/lib/mongoose";
import { ServiceAgent } from "@/models/Product";
import { useContext } from "react";
import toast from "react-hot-toast";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext)
  if (product) {
    return (
      <section className="mt-20 md:mt-6 ">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Image section */}
          <div className="px-4 overflow-hidden lg:aspect-h-2 lg:aspect-w-2 lg:rounded-lg md:px-2">
            <img
              src={product.images[0]}
              alt={product.images[0]}
              className="w-full h-full md:h-[90vh] object-cover object-center border border-primary rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 px-2 lg:grid lg:grid-cols-1 lg:gap-y-4 md:gap-0 md:px-2">
            {product.images.slice(1, 3).map((image, index) => (
              <div
                key={index}
                className="lg:aspect-h-2 lg:aspect-w-3 lg:overflow-hidden lg:rounded-lg "
              >
                <img
                  src={image}
                  alt={image}
                  className="w-full h-full md:h-[44vh] object-cover object-center border rounded-lg border-secondary p-4"
                />
              </div>
            ))}
          </div>

          {/* Product info */}
          <div className="p-4 border lg:p-8">
            <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Description</h2>
              <p className="mt-2 text-gray-700">{product.description}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Details</h2>
              <p className="mt-2 text-gray-700 list-disc list-inside">
                {product?.details}
              </p>
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 my-3">
              <div>
                <label className="font-semibold text-text">Experience</label>
                <p className="mt-2 list-disc list-inside text-accent">
                  {product?.experience}
                </p>
              </div>

            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 my-3">
              <div>
                <label className="font-semibold text-text">Work</label>
                <p className="mt-2 list-disc list-inside text-accent">
                  {product?.work}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <h2 className="text-xl font-semibold text-gray-900">Price</h2>
              <p className="mt-2 text-lg font-semibold text-primary">
                Rps {formatPrice(product.price)}
              </p>
            </div>
            <div className="w-full">
              <button
                className="w-full px-4 py-2 mt-4 text-white rounded-md bg-primary hover:bg-primary-dark"
                onClick={() => {addProduct(product._id);
                  toast.success('Item added to cart!!')}}
              >
                Add to Cart
              </button>
            </div>




          </div>
        </div>
      </section>
    );
  }

  return <p>Product not found.</p>;
}


export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await ServiceAgent.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
