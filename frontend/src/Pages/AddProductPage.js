import React, { useState } from 'react';
import ReturnHomeButton from '../Components/ReturnHomeButton';
import TextInput from '../Components/Fields/TextInput';
import TextAreaInput from '../Components/Fields/TextAreaInput';
import SelectInput from '../Components/Fields/SelectInput';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
export default function AddProductPage() {
  const formatDate = (d) => {
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    const year = d.getFullYear();
    return [year, month, day].join('-');
  };
  const defaultDate = formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [form, setForm] = useState({name: '',catalogNumber: '',description: '',type: '',marketingDate: defaultDate});
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const validate = () => {
    const newErrors = {};
    if (!form.name?.trim()) newErrors.name = 'Name is required';
    if (form.catalogNumber === '' || form.catalogNumber === null || form.catalogNumber === undefined) {
      newErrors.catalogNumber = 'Catalog number is required';
    }else if (isNaN(form.catalogNumber) || Number(form.catalogNumber) < 0) {
      newErrors.catalogNumber = 'Catalog number must be 0 or greater';
    }
    if (!form.type) newErrors.type = 'Type is required';
    if (!form.marketingDate) newErrors.marketingDate = 'Marketing date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/addProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.status === 400) {
        alert(`Catalog Number already exists`);
        return;
      }else if(response.status === 500){
        alert(`Error in Connect to server`);
      }else if (response.status === 401){
        alert("One or more fields are not valid."); 
      }if (response.ok){
        alert('Product added successfully!'); 
      }
  } catch (error) {
      alert(`Error: ${error.message || 'Network error'}`);
  }
};
  return (
    <>
      <ReturnHomeButton />
      <div className="container my-5" style={{ maxWidth: '600px' }}>
        <h2 className="mb-4">Add Product</h2>
        <form noValidate onSubmit={handleSubmit}>
          <TextInput label="Product Name" id="name" name="name"  value={form.name} onChange={handleChange} error={errors.name}/>
          <TextInput label="Catalog Number" id="catalogNumber" name="catalogNumber" value={form.catalogNumber} onChange={handleChange} error={errors.catalogNumber} type="number"/>
          <TextAreaInput label="Description" id="description" name="description" value={form.description} onChange={handleChange} error={errors.description}/>
          <SelectInput label="Type" id="type" name="type" value={form.type} onChange={handleChange} error={errors.type} options={['Fruit', 'Vegetable', 'Field crops']}/>
          <TextInput label="Product Marketing Date" id="marketingDate" name="marketingDate" type="date" value={form.marketingDate} onChange={handleChange} error={errors.marketingDate}/>
          <button type="submit" className="btn btn-primary w-100">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}
