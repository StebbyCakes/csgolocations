import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [title, setTitle] = useState('CSGOLOCATIONS.COM');
  const [highlight, setHighlight] = useState(false);
  const [selectedMap, setSelectedMap] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Start the highlight animation after 1 second
    const timer = setTimeout(() => {
      setHighlight(true);
      setTimeout(() => {
        setTitle(title.replace('GO', '2'));
        setHighlight(false);
      }, 2000);  // Time after which "GO" is replaced with "2"
    }, 1000);  // Initial delay before starting the highlight

    return () => clearTimeout(timer);
  }, []);

  const maps = ['Dust II', 'Mirage', 'Inferno', 'Nuke', 'Overpass', 'Vertigo', 'Ancient'];

  const formatMapNameForUrl = (mapName) => {
    return mapName.replace(/\s+/g, '').toLowerCase(); // Remove spaces and convert to lowercase
  };

  const handleActiveDutyClick = () => {
    navigate('/quiz/active');
  };

  const handleMapSelection = (e) => {
    const map = e.target.value;
    setSelectedMap(map);
    if (map) {
      navigate(`/quiz/${formatMapNameForUrl(map)}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1>
        {title.split('GO').map((part, index) => 
          index === 0 ? part : [<span key="highlight" style={{ backgroundColor: highlight ? 'yellow' : 'transparent' }}>GO</span>, part])
        }
      </h1>
      <p>The best way to learn Counter-Strike callouts</p>
      <button onClick={handleActiveDutyClick} style={{ padding: '10px 20px', margin: '10px', fontSize: '16px' }}>Active Duty Maps</button>
      <select onChange={handleMapSelection} value={selectedMap} style={{ padding: '10px 20px', margin: '10px', fontSize: '16px' }}>
        <option value="">Select a Map</option>
        {maps.map(map => (
          <option key={map} value={map}>{map}</option>
        ))}
      </select>
    </div>
  );
}

export default HomePage;
