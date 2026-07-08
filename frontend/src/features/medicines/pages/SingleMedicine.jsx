import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AddtoUserCart, getMedicines } from "../api/medicineApi";
import { toast } from "react-toastify";
import { Button } from "../../../shared/components/ui";
function SingleMedicine() {
  const [product, setproduct] = useState({})
  const productId = useParams().id
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  console.log(productId);

  const fetchProductDetails = async () => {
    setLoading(true)
    getMedicines(productId).then((res) => {
      setLoading(false)
      console.log(res);
      setproduct(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchProductDetails()
  }, [productId])

  const handleAddToCart = async (e, id) => {
    try {
      await AddtoUserCart({
        medicineId: productId,
        quantity: 1,
        price: product.price,
        discount: product.discount || 0
      })
      toast.success("Medicine added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Please login before adding medicine");
      navigate("/login");
    }
  }

  const handleBuyProduct = async () => {
    try {
      await AddtoUserCart({
        medicineId: productId,
        quantity: 1,
        price: product.price,
        discount: product.discount || 0
      })
      navigate("/medicines/cart")
    } catch (error) {
      toast.error(error.response?.data?.message || "Please login before buying medicine");
      navigate("/login");
    }
  }
  return (
    <>
      <div className="container mx-auto my-5 p-10 relative">
        <div className="row flex flex-col md:flex-row justify-center gap-2">
          <div className="col-md-6">
            <img src={product.image} alt={product.name} className="img-fluid" />
          </div>
          <div className="col-md-6 flex flex-col justify-center gap-4">
            <h1 className='text-xl font-bold'>{product.name}</h1>
            <p className='text-lg text-gray-800'>{product.description}</p>
            <p className='text-lg'>Price: {product.price}</p>
            <p className='text-lg'>Discount: {product.discount}</p>
            <p className='text-lg'>Stock: {product.stock}</p>
            <Button variant="blue" size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="green" size="lg" onClick={handleBuyProduct}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleMedicine
