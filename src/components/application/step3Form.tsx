import { useSelector, useDispatch } from "react-redux";
import { resetApplication, updateCount } from "../../store/applicationSlice";
import type { RootState } from "../../store";
import { useState } from "react";

const Step3Form = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.application);
  const [process, setProcess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    try {
      console.log("Final Submission Data:", data);

      // In a real app, you'd do: 
      // await fetch('/api/apply', { method: 'POST', body: JSON.stringify(data) })
      setProcess(true)
      await new Promise((resolve, reject) => {
        if (data.age > 25) {
          setTimeout(() => {
            resolve(true)
          }, 500);
        } else {
          setTimeout(() => {
            reject(false)
          }, 500);
        }
      })
      alert("Application Submitted Successfully!");

      // Clean up the Redux state after submission
      dispatch(resetApplication());
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setProcess(false)
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px' }}>
      <h2 style={{ marginTop: 0 }}>Step 3: Review Your Details</h2>
      {error && <div>{error}</div>}

      <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
        {/* Correct way to map through an object in React */}
        {Object.entries(data).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
            <strong style={{ textTransform: 'capitalize', color: '#666' }}>{key}:</strong>
            <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{String(value)}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => dispatch(updateCount(2))} // Or use updateCount(2)
          style={{ flex: 1, padding: '12px', cursor: 'pointer' }}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          style={{
            flex: 2,
            padding: '12px',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {process ? "Sending" : " Confirm & Submit"}
        </button>
      </div>
    </div>
  );
};

export default Step3Form;