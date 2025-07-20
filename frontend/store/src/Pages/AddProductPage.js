import React, { useState } from 'react';
import ReturnHomeButton from '../Components/ReturnHomeButton';
import TextInput from '../Components/Fields/TextInput';
import TextAreaInput from '../Components/Fields/TextAreaInput';
import SelectInput from '../Components/Fields/SelectInput';

export default function AddProductPage() {
  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    const year = d.getFullYear();
    return [year, month, day].join('-');
  };
  const defaultDate = formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [form, setForm] = useState({name: '',catalogNumber: '',description: '',type: '',marketingDate: defaultDate,});
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.catalogNumber.trim()) newErrors.catalogNumber = 'Catalog number is required';
    if (!form.type) newErrors.type = 'Type is required';
    if (!form.marketingDate) newErrors.marketingDate = 'Marketing date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await fetch('/api/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMsg = errorData?.message || 'Failed to add product';
        alert(`Error: ${errorMsg}`);
        return;
      }
      alert('Product added successfully!');
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
          <TextInput label="Catalog Number" id="catalogNumber" name="catalogNumber" value={form.catalogNumber} onChange={handleChange} error={errors.catalogNumber}/>
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
