import React, { useEffect, useState } from 'react'

const Products = () => {
  const [openModel, setOpenModel] = useState(false)
  const [vendors, setVendors] = useState([])
  const [categories, setCategories] = useState([])

  fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products", { headers : { Authorization : `Bearer ${localStorage.getItem("store-token")}`}, 
    })} catch (error) {
      console.error("Error fetching products", error);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className='w-full h-full flex flex-col gap-4 p-4'>
      <h1 className='font-bold'>Products Management</h1>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder="Search" className="border p-1 bg-white rounded px-4" />
        <button className='px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600' onClick={() => setOpenModel(true)}>Add New Product</button>
      </div>
    </div>

    { openModel && ( 
      <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
        <div className='bg-white p-4 shadow rounded-md w-1/3 relative'>
          <h1 className='font-bold text-xl'>Add Product</h1>
          <button className='absolute top-4 right-4 font-bold text-lg cursor-pointer' onClick={() => setOpenModel(false)}>X</button>
          <form className='flex flex-col gap-4 mt-4'>
            <input type="text" name="vendorID" placeholder="Vendor ID" className="border p-1 bg-white rounded px-4"/>
            <input type="text" name="vendorName" placeholder="Vendor Name" className="border p-1 bg-white rounded px-4"/>
            <input type="email" name="vendorEmail" placeholder="Vendor Email" className="border p-1 bg-white rounded px-4"/>
            <input type="number" name="vendorPhone" placeholder="Vendor Phone" className="border p-1 bg-white rounded px-4"/>
            <textarea rows={4} type="text" name="vendorAddress" placeholder="Vendor Address" className="border p-1 bg-white rounded px-4"/>
            <textarea rows={5} type="text" name="vendorDescription" placeholder="Vendor Description" className="border p-1 bg-white rounded px-4"/>
            <div>
              <select name='category'>
                <option value="">Select Category</option>

              </select>
            </div>
            <div>
              <select name="vendor">
                <option value="">Select Vendor</option>

              </select>
            </div>
            <div className='flex space-x-2'>
              <button type="submit" className='w-full mt-2 rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600'>{editVendor ? "Update Product" : "Add Product"}</button>
              {editVendor && (<button type="button" className="w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600" onClick={closeModel}>Cancel</button>)}
            </div>
          </form>
        </div>
      </div>
    )}
  )
}

export default Products