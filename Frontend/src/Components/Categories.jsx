import React, { useEffect, useState } from 'react'
import axios from "axios";

const Categories = () => {
  const[categoryName, setCategoryName] = useState("");
  const[categoryDescription, setCategoryDescription] = useState("");
  const[categories, setCategories] = useState([]);
  const[filteredCategories, setFilteredCategories] = useState([]);
  const[loading, setLoading] = useState(true);
  const[editCategory, setEditCategory] = useState(null)

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("store-token")}`,
        },
      });
      console.log(response.data.categories);
      setCategories(response.data.categories);
      setFilteredCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = async (category) => {
    setEditCategory(category._id);
    setCategoryName(category.categoryName);
    setCategoryDescription(category.categoryDescription);
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (!searchTerm) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((category) => 
        ["categoryName", "categoryDescription"].some((key) => 
          category[key]?.toString().toLowerCase().includes(searchTerm)
        )
      );
      setFilteredCategories(filtered);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?")
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/category/${id}`, { headers : { Authorization : `Bearer ${localStorage.getItem("store-token")}`}, })
        if (response.data.success) {
          alert("Category deleted successfully!")
          fetchCategories();
        } else {
          console.error("Error in deleting category:", data);
          alert("Error in deleting category, Please try again!")
        }
      } catch (error) {
        console.error("Error deleting category", error);
        alert("Error in deleting category, Please try again!")
      }
    }
  }

  const handleCancel = () => {
    setEditCategory(null);
    setCategoryName("");
    setCategoryDescription("");
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editCategory) { const response = await axios.put(`http://localhost:3000/api/category/${editCategory}`, { categoryName, categoryDescription }, { headers: { Authorization : `Bearer ${localStorage.getItem("store-token")}`}, })
      if (response.data.success) {
        alert("Category Updated successfully!")
        setEditCategory(null);
        setCategoryName("");
        setCategoryDescription("");
        fetchCategories();
      } else {
        console.error("Error in updating category:", data);
        alert("Error in updating category, Please try again!")
      }
    } else { const response = await axios.post("http://localhost:3000/api/category/add", { categoryName, categoryDescription }, { headers: { Authorization : `Bearer ${localStorage.getItem("store-token")}`}, })
      if (response.data.success) {
        setCategoryName("");
        setCategoryDescription("");
        alert("Category added successfully!")
        fetchCategories();
      } else {
        console.error("Error in adding category:", data);
        alert("Error in adding category, Please try again!")
      }
    }
  }
  
  if (loading)  return <div>Loading...</div> 

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-8'>Category Management</h1>
      <div className='mb-6 flex justify-between items-center'>
        <input  type="text"  placeholder="Search By Category Name / Description"  className="border p-2 bg-white rounded px-4 w-96" onChange={handleSearch} />
      </div>
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className='lg:w-1/3'>
          <div className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-center text-xl font-bold mb-4'>{editCategory ? "Edit Category" : "Add Category"}</h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <input type="text" placeholder='Category Name' className='border w-full p-2 rounded-md' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
              </div>
              <div>
                <textarea type="text" placeholder='Category Description' className='border w-full p-2 rounded-md' value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)} rows={6} />
              </div>
              <div className='flex space-x-2'>
                <button type="submit" className='w-full mt-2 rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600'>{editCategory ? "Update Changes" : "Add Category"}</button>
                {editCategory && (<button type="button" className="w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600" onClick={handleCancel}>Cancel</button>)}
              </div>
            </form>
          </div>
        </div>
        <div className='lg:w-2/3'>
          <div className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-center text-xl font-bold mb-4'>Category List</h2>
            <table className='w-full border-collapse border border-gray-200'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border border-gray-200 p-2'>S.No</th>
                  <th className='border border-gray-200 p-2'>Category Name</th>
                  <th className='border border-gray-200 p-2'>Description</th>
                  <th className='border border-gray-200 p-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan="4" className='text-center border border-gray-200 p-2'>
                      No categories found
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category, index) => (
                    <tr key={category._id}>
                      <td className='border border-gray-200 p-2'>{index + 1}</td>
                      <td className='border border-gray-200 p-2'>{category.categoryName}</td>
                      <td className='border border-gray-200 p-2'>{category.categoryDescription || '-'}</td>
                      <td className='border border-gray-200 p-2'>
                        <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2" onClick={() => handleEdit(category)}>Edit</button>
                        <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600" onClick={() => handleDelete(category._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {filteredCategories.length > 0 && filteredCategories.length !== categories.length && (
              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredCategories.length} of {categories.length} categories
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories