import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../utils/firebase";
import { Spin, Button, Badge } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CartContext } from "../context/CartContext";
import AddToCartBtn from "../components/AddToCartBtn";
import Loader from "../loader";
import SaleBadge from "../components/SaleBadge";
import BottomLine from "../components/BottomLine";
dayjs.extend(relativeTime);

function MensHoddies() {
  const [mensHoddies, setMensHoddies] = useState([]);
  const [loader, setLoader] = useState(true);
  const { addItemToCart, isItemAdded } = useContext(CartContext);

  useEffect(() => {
    fetchCategoryProducts("Men's", setMensHoddies);
  }, []);

  // Function to fetch products by category
  const fetchCategoryProducts = async (category, setProducts) => {
    try {
      const prodCollection = collection(db, "WarduroProducts");
      const q = query(
        prodCollection,
        where("category", "==", category)
      );
      const docs = await getDocs(q);
      const arr = docs.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      setProducts(arr);
      setLoader(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoader(false);
    }
  };
  

  const renderProducts = (products) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-8">
      {products?.map((data) => (
        

        <div className="border rounded-md overflow-hidden sale-ribbon shadow relative" key={data?.id}>
          <SaleBadge/>
          <Link to={`/products/${data?.id}`}>
            <div className="image-box rounded">
              <img src={data?.img} alt={data?.title} className="hover-img rounded" />
            </div>
          </Link>
          <div className="bg-white z-50 p-2 pt-0 lg:pt-2">
            <p className=" font-semibold line-clamp-1 text-sm  lg:text-lg">{data?.title}</p>
            <h1 className="text-gray-600 hide-text line-clamp-1">{data?.ProductCategory}</h1>
            <div className="flex justify-between  text-lg mb-auto">
                     
                     <h1 className="font-bold my-2 text-gray-600"><del>Rs. {data?.price}/-</del></h1>
                     
                     <h1 className="font-bold my-2 themeText">Rs. {data?.SalePrice}/-</h1>

                    
                   
            </div>
            <button
              className="learn-btn transition-all px-3 rounded w-full py-2"
              onClick={() => addItemToCart(data)}
              >
              {isItemAdded(data.id) ? "Added in your cart" : "Add to Cart"}
            </button>
          </div>
        </div>
           
      ))}
    </div>
  );

  return (
    <div className="container mx-auto">
      {loader ? (
        <div className="flex h-screen justify-center items-center">
          <Loader className="w-28 h-28" />
        </div>
      ) : (
        <div className=" mt-24 md:mt-20 lg:mt-28 xl:mt-28">
          <div className="flex justify-center my-6 lg:my-10 text-center items-center">
         <BottomLine text={`Men's Hoodies`} className={' text-2xl  md:text-3xl  lg:text-3xl xl:text-4xl xxl:text-4xl font-bold text-black'}/>
          </div>

        
          {mensHoddies.length ? (
            renderProducts(mensHoddies)
          ) : (
            <div className="text-xl text-center  my-72">

            <p>No men's hoodies available.</p>
            </div>
          )}

          
        </div>
      )}
    </div>
  );
}

export default MensHoddies;
