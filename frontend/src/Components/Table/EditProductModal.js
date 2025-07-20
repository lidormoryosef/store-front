import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TextInput from './../Fields/TextInput';
import TextAreaInput from './../Fields//TextAreaInput';
import SelectInput from './../Fields//SelectInput';

export default function EditProductModal({ show, product, onClose, onSave }) {
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
    if (!form.catalogNumber?.trim()) newErrors.catalogNumber = 'Catalog number is required';
    if (!form.description?.trim()) newErrors.description = 'Description is required';
    if (!form.type) newErrors.type = 'Type is required';
    if (!form.marketingDate) newErrors.marketingDate = 'Marketing date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        onSave(updatedProduct); // Notify parent
      } else {
        alert('Failed to update product');
      }
    } catch (err) {
      alert('Server error while updating product');
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextInput label="Product Name" id="editName" name="name" value={form.name} onChange={handleChange} error={errors.name}/>
        <TextInput label="Catalog Number" id="editCatalogNumber" name="catalogNumber" value={form.catalogNumber} onChange={handleChange} error={errors.catalogNumber} />
        <TextAreaInput label="Description" id="editDescription" name="description" value={form.description} onChange={handleChange} error={errors.description} />
        <SelectInput label="Type" id="editType" name="type" value={form.type} onChange={handleChange} error={errors.type} options={['Fruit', 'Vegetable', 'Field crops']} />
        <TextInput label="Marketing Date" id="editMarketingDate" name="marketingDate" type="date" value={form.marketingDate} onChange={handleChange} error={errors.marketingDate} />
      </Modal.Body>
      <Modal.Footer>
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
