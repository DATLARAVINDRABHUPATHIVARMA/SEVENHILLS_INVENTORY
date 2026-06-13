import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Vendors = () => {
  const [addModel, setAddModel] = useState(false);
  const [editVendor, setEditVendor] = useState(null);
  const [formData, setFormData] = useState({ vendorID: "", vendorName: "", vendorEmail: "", vendorPhone: "", vendorAddress: "", vendorDescription: "" })
  const[loading, setLoading] = useState(false);
  const[vendors, setVendors] = useState([]);
  const[filteredVendors, setFilteredVendors] = useState([]);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/vendor", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("store-token")}`,
        },
      });
      setVendors(response.data.vendors);
      setFilteredVendors(response.data.vendors)
    } catch (error) {
      console.error("Error fetching vendors", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editVendor) {
      try { const response = await axios.put(`http://localhost:3000/api/vendor/${editVendor}`, formData, { headers: { Authorization : `Bearer ${localStorage.getItem("store-token")}`}, })
        if (response.data.success) {
          alert("Vendor updated successfully!")
          setAddModel(false);
          setEditVendor(null);
        } else {
          console.error("Error in updating vendor:", data);
          alert("Error in updating vendor, Please try again!")
        }
      } catch (error) {
        console.error("Error in updating vendor", error);
        alert("Error in updating vendor, Please try again!")
      }
      fetchVendors()
    } else {
      try { const response = await axios.post("http://localhost:3000/api/vendor/add", formData, { headers: { Authorization : `Bearer ${localStorage.getItem("store-token")}`}, })
        if (response.data.success) {
          alert("Vendor added successfully!")
          setAddModel(false);
          setFormData({ vendorID: "", vendorName: "", vendorEmail: "", vendorPhone: "", vendorAddress: "", vendorDescription: "" })
        } else {
          console.error("Error in adding vendor:", data);
          alert("Error in adding vendor, Please try again!")
        }
      } catch (error) {
        console.error("Error in adding vendor", error);
        alert("Error in adding vendor, Please try again!")
      }
      fetchVendors()
    }
  }

  const handleEdit = (vendor) => {
    setFormData({
      vendorID: vendor.vendorID,
      vendorName: vendor.vendorName,
      vendorEmail: vendor.vendorEmail,
      vendorPhone: vendor.vendorPhone,
      vendorAddress: vendor.vendorAddress,
      vendorDescription: vendor.vendorDescription,
    })
    setEditVendor(vendor._id);
    setAddModel(true);
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Vendor?")
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/vendor/${id}`, { headers : { Authorization : `Bearer ${localStorage.getItem("store-token")}`}, })
        if (response.data.success) {
          alert("Vendor deleted successfully!")
          fetchVendors();
        } else {
          console.error("Error in deleting vendor:", data);
          alert("Error in deleting vendor, Please try again!")
        }
      } catch (error) {
        console.error("Error deleting vendor", error);
        alert("Error in deleting vendor, Please try again!")
      }
    }
  }

 const handleSearch = (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  
  if (!searchTerm) {
    setFilteredVendors(vendors);
  } else {
    const filtered = vendors.filter((vendor) => 
      ["vendorID", "vendorName", "vendorEmail", "vendorPhone", "vendorAddress"].some((key) => 
        vendor[key]?.toString().toLowerCase().includes(searchTerm)
      )
    );
    setFilteredVendors(filtered);
  }
};

  const closeModel = () => {
    setAddModel(false);
    setFormData({ vendorID: "", vendorName: "", vendorEmail: "", vendorPhone: "", vendorAddress: "", vendorDescription: "" })
    setEditVendor(null);
  }

  return (
    <div className='w-full h-full flex flex-col gap-4 p-4'>
      <h1 className='font-bold'>Vendor Management</h1>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder="Search By Vendor ID / Name" className="border p-1 bg-white rounded px-4" onChange={handleSearch} />
        <button className='px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600' onClick={() => setAddModel(true)}>Add New Vendor</button>
      </div>

      {loading ? <div>Loading...</div> : (<div>
        <table className='w-full border-collapse border border-gray-300 mt-4'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border border-gray-300 p-2'>S.No</th>
              <th className='border border-gray-300 p-2'>Vendor ID</th>
              <th className='border border-gray-300 p-2'>Vendor Name</th>
              <th className='border border-gray-300 p-2'>Email</th>
              <th className='border border-gray-300 p-2'>Phone</th>
              <th className='border border-gray-300 p-2'>Address</th>
              <th className='border border-gray-300 p-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor, index) => (
              <tr key={vendor._id}>
                <td className='border border-gray-300 p-2'>{index + 1}</td>
                <td className='border border-gray-300 p-2'>{vendor.vendorID}</td>
                <td className='border border-gray-300 p-2'>{vendor.vendorName}</td>
                <td className='border border-gray-300 p-2'>{vendor.vendorEmail}</td>
                <td className='border border-gray-300 p-2'>{vendor.vendorPhone}</td>
                <td className='border border-gray-300 p-2'>{vendor.vendorAddress}</td>
                <td className='border border-gray-300 p-2'>
                  <button className='px-2 py-1 bg-yellow-500 text-white rounded cursor-pointer hover:bg-yellow-600 mr-2' onClick={() => handleEdit(vendor)}>Edit</button>
                  <button className='px-2 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600' onClick={() => handleDelete(vendor._id)}>Delete</button>
                </td>
              </tr> 
            ))}
          </tbody>
        </table>
        {filteredVendors.length === 0 && <div>No vendors found</div>}
        </div>
      )}

      {addModel && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
          <div className='bg-white p-4 shadow rounded-md w-1/3 relative'>
            <h1 className='font-bold text-xl'>Add New Vendor</h1>
            <button className='absolute top-4 right-4 font-bold text-lg cursor-pointer' onClick={closeModel}>X</button>
            <form className='flex flex-col gap-4 mt-4' onSubmit={handleSubmit}>
              <input type="text" name="vendorID" value={formData.vendorID} onChange={handleChange} placeholder="Vendor ID" className="border p-1 bg-white rounded px-4"/>
              <input type="text" name="vendorName" value={formData.vendorName} onChange={handleChange} placeholder="Vendor Name" className="border p-1 bg-white rounded px-4"/>
              <input type="email" name="vendorEmail" value={formData.vendorEmail} onChange={handleChange} placeholder="Vendor Email" className="border p-1 bg-white rounded px-4"/>
              <input type="number" name="vendorPhone" value={formData.vendorPhone} onChange={handleChange} placeholder="Vendor Phone" className="border p-1 bg-white rounded px-4"/>
              <textarea rows={4} type="text" name="vendorAddress" value={formData.vendorAddress} onChange={handleChange} placeholder="Vendor Address" className="border p-1 bg-white rounded px-4"/>
              <textarea rows={5} type="text" name="vendorDescription" value={formData.vendorDescription} onChange={handleChange} placeholder="Vendor Description" className="border p-1 bg-white rounded px-4"/>
              <div className='flex space-x-2'>
                <button type="submit" className='w-full mt-2 rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600'>{editVendor ? "Update Vendor" : "Add Vendor"}</button>
                {editVendor && (<button type="button" className="w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600" onClick={closeModel}>Cancel</button>)}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Vendors