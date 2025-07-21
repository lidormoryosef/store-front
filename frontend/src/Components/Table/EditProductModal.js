import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TextInput from './../Fields/TextInput';
import TextAreaInput from './../Fields/TextAreaInput';
import SelectInput from './../Fields/SelectInput';

export default function EditProductModal({ show, product, onClose, onSave , onDelete}) {
  const [form, setForm] = useState({ ...product });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({ ...product });
    setErrors({});
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name?.trim()) newErrors.name = 'Name is required';
    if (form.name.length > 50) newErrors.name = 'Name must be at most 50 characters';
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

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      console.log()
      const response = await fetch(`/api/products/editProduct`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        alert('Product updated successfully');
        onSave(updatedProduct);
        onClose();
      }else if(response.status === 404){
        alert('ProductId Not Found');
      }else if(response.status === 400){
        alert('You Change to Catalog Number That already exists');
      }else if (response.status === 401){
        alert("One or more fields are not valid."); 
      }else{
        alert('Failed to update product');
      }
    } catch (err) {
      alert('Server error while updating product');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/deleteProduct/${product.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete() 
        onClose();
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      alert('Server error while deleting product');
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextInput label="Product Name" id="editName" name="name" value={form.name} onChange={handleChange} error={errors.name} />
        <TextInput label="Catalog Number" id="editCatalogNumber" name="catalogNumber" value={form.catalogNumber} onChange={handleChange} error={errors.catalogNumber} type = "number" />
        <TextAreaInput label="Description" id="editDescription" name="description" value={form.description} onChange={handleChange} error={errors.description} />
        <SelectInput label="Type" id="editType" name="type" value={form.type} onChange={handleChange} error={errors.type} options={['Fruit', 'Vegetable', 'Field crops']} />
        <TextInput label="Marketing Date" id="editMarketingDate" name="marketingDate" type="date" value={form.marketingDate} onChange={handleChange} error={errors.marketingDate} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
