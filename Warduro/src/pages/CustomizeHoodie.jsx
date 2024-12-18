
import customize from "../assets/images/intro.png";
import CustomizeHoodie2 from "../assets/images/customize.png";
import { Carousel } from "antd";
import { CartContext } from "../context/CartContext";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../utils/firebase";
import { Spin, Button, Badge } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import AddToCartBtn from "../components/AddToCartBtn";
import Loader from "../loader";
dayjs.extend(relativeTime);


 


export function CustomizeHoodie() {
    const { addItemToCart, lessQuantityFromCart, isItemAdded, buyNow } =
    useContext(CartContext);

    const [CustomizeHoodie, setCustomizeHoodie] = useState([]);
    const [loader, setLoader] = useState(true);
  
    useEffect(() => {
      fetchCustomizeHoodie("Customize, Customize able, Front & Back Customization, Vibrant Prints", setCustomizeHoodie);
    }, []);
  

    const fetchCustomizeHoodie = async (ProductCategory, setCustomizeHoodie) => {
      try {
        const prodCollection = collection(db, "WarduroProducts");
        const q = query(
          prodCollection,
          where("ProductCategory", "==", ProductCategory)
        );
        const docs = await getDocs(q);
        const arr = docs.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        setCustomizeHoodie(arr);
        setLoader(false);
      } catch (err) {
        console.error("Error fetching customize hoodie", err);
        setLoader(false);
      }
    };
    const renderProducts = (products) => (
     
      <section className="text-gray-600 mt-16 md:mt-20 lg:mt-10 xl:mt-10">
        {products?.map((data) => (
       
        <div  key={data?.id}  className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <Carousel effect="fade" autoplay className="rounded">
              <div >
                <img src={customize} className="rounded"/>
              </div>
              <div >
                <img src={data?.img} className="rounded"/>
              </div>
              <div >
                <img src={customize} className="rounded"/>
              </div>
              <div >
                <img src={data?.img} className="rounded"/>
              </div>
            </Carousel>
          </div>

          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 sm:w-full flex flex-col md:items-start md:text-left items-center text-center">
            <div className="relative border-b-2 border-gray-100 mb-4">

            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {data?.title}
              <br className="hidden lg:inline-block" />
            </h1>
            <p className="mb-8 leading-relaxed ">
            {data?.desc}
            </p>
         <div className="flex gap-2 mb-3 justify-center">

             <del className="text-gray-600 mr-3"> <p className="title-font font-medium text-2xl text-gray-700">
             Rs. {data?.price}
              </p></del>
              <p className="title-font font-medium text-2xl text-gray-900">
              Rs. {data?.SalePrice}
              </p>
            </div>
                        </div>
           
            <div className="flex flex-col justify-center items-center w-full gap-3">
              <button className=" text-white w-full lg:w-2/4 learn-btn transition-all   border-0 py-2 px-6 focus:outline-none  rounded text-lg"
              onClick={() => addItemToCart(data)}
              >
              {isItemAdded(data.id) ? "Added in your cart" : "Add to Cart"}
              </button>
              <Link to="/checkout" className="w-full">
              <button 
              className="w-full  lg:w-2/4 themeBackground  learn-btn transition-all  border-0 py-2 px-6 focus:outline-none  rounded text-lg"
              onClick={() => buyNow(data)}
              >
              
                Buy Now
              </button>
                </Link>
            </div>
          </div>
        </div>
   
   
  ))}
  </section>
    
    );  

  
  return (
    <div className="container mx-auto">
      {loader ? (
        <div className="flex h-screen justify-center items-center">
          <Loader className="w-28 h-28" />
        </div>
      ) : (
        <div>
        

        
          {CustomizeHoodie.length ? (
            renderProducts(CustomizeHoodie)
          ) : (
            <div className="text-xl text-center">

            <p>Not Found.</p>
            </div>
          )}

          
        </div>
      )}
    </div>
   
  );
}
