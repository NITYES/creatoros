import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateData, updateCount } from "../../store/applicationSlice";
import type { RootState } from "../../store";

const Step1Form = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.application);

  // Initialize state with Redux data or defaults
  const [userForm, setFormData] = useState({ 
    name: data.name || "", 
    age: data.age || 0, 
    subject: data.subject || "" 
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // name MUST match the keys in userForm (name, age, subject)
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value, // Convert age to number
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (userForm.name.length < 3) {
      setError("Name is too short (min 3 characters)");
      return;
    }

    // Update Redux and move to Step 2
    dispatch(updateData({ ...userForm }));
    dispatch(updateCount(2));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px' }}>
      <h2 style={{ marginTop: 0 }}>Step 1: Personal Info</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Full Name:</label>
          <input
            name="name" // MATCHES STATE KEY
            type="text"
            value={userForm.name}
            onChange={handleChange}
            style={inputStyle(!!error)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Age:</label>
          <input
            name="age" // MATCHES STATE KEY
            type="number"
            value={userForm.age}
            onChange={handleChange}
            style={inputStyle(false)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Subject:</label>
          <input
            name="subject" // MATCHES STATE KEY
            type="text"
            value={userForm.subject}
            onChange={handleChange}
            style={inputStyle(false)}
          />
        </div>

        {error && <p style={{ color: 'red', fontSize: '12px', margin: 0 }}>{error}</p>}

        <button type="submit" style={buttonStyle}>
          Next Step
        </button>
      </form>
    </div>
  );
};

// Styles
const inputStyle = (hasError: boolean) => ({
  width: '100%',
  padding: '10px',
  border: hasError ? '2px solid red' : '1px solid #ccc',
  borderRadius: '4px',
  marginTop: '5px'
});

const buttonStyle = {
  padding: '12px',
  backgroundColor: '#4f46e5',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold' as const
};

export default Step1Form;