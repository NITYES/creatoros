import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateData, updateCount } from "../../store/applicationSlice";
import type { RootState } from "../../store";

const Step1Form = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.application);

  // Local State for the form fields
  const [userForm, setFormData] = useState({ url: data.url, link: data.link })


  // Local State for validation messages
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    // 1. Prevent the browser from refreshing the page (Standard HTML Behavior)
    e.preventDefault();

    // 2. Manual Validation
    if (!userForm.link.includes('http')) {
      setError("Link must contain http");
      return;
    }

    // 3. Dispatch to Redux (Lifting the state)
    dispatch(updateData({ ...userForm }));

    // 4. Move to next step
    dispatch(updateCount(3));
  };

  const handlePrevious = (e: React.FormEvent) => {
    // 1. Prevent the browser from refreshing the page (Standard HTML Behavior)
    e.preventDefault();
    // 4. Move to next step
    dispatch(updateCount(1));
  };

  const handleChange = (e: any) => {
    // validate and 
    const { id, value } = e.target

    setFormData((prev) => ({
      ...prev, [id]: value
    }))
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ marginTop: 0 }}>Step 1: Personal Info</h2>

      <form onSubmit={handleSubmit}>
        {/* Full Name Field */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="fullName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Full Name:
          </label>
          <input
            id="link"
            type="text"
            placeholder="Enter your link"
            value={userForm.link}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: error ? '2px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box' // Essential for width: 100%
            }}
          />
          <input
            id="url"
            type="text"
            placeholder="Enter your age"
            value={userForm.url}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: error ? '2px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box' // Essential for width: 100%
            }}
          />
          <input
            id="subject"
            type="text"
            placeholder="Enter your best subject"
            value={userForm.url}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: error ? '2px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box' // Essential for width: 100%
            }}
          />
          {error && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{error}</p>}
        </div>



        {/* Submit Button */}
        <button
          type="submit"
          onClick={handlePrevious}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Previous Step
        </button>
        <button
          type="submit"
          onClick={handleChange}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Next Step
        </button>
      </form>
    </div>
  );
};

export default Step1Form;