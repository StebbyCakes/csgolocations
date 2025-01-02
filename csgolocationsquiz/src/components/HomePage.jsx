import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function HomePage() {
  const [selectedMap, setSelectedMap] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const maps = ['Dust II', 'Mirage', 'Inferno', 'Nuke', 'Overpass', 'Vertigo', 'Ancient'];

  const handleActiveDutyClick = () => {
    navigate('/quiz/active'); // Navigate to quiz page with 'active' parameter
  };

  const handleMapSelection = (e) => {
    const map = e.target.value;
    setSelectedMap(map);
    if (map) {
      navigate(`/quiz/${map}`); // Navigate to quiz page with selected map
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button onClick={handleActiveDutyClick}>Active Duty Maps</button>
      <select onChange={handleMapSelection} value={selectedMap}>
        <option value="">Select a Map</option>
        {maps.map(map => (
          <option key={map} value={map}>{map}</option>
        ))}
      </select>
    </div>
  );
}

export default HomePage;
