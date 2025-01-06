import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const [title, setTitle] = useState('CSGOLOCATIONS.COM');
  const [highlight, setHighlight] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   

    const timer = setTimeout(() => {
      setHighlight(true);
      setTimeout(() => {
        setTitle(title.replace('GO', '2'));
        setHighlight(false);
      }, 2000); 
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const maps = [
    { name: 'Dust II', file: 'DustII' },
    { name: 'Mirage', file: 'Mirage' },
    { name: 'Inferno', file: 'Inferno' },
    { name: 'Nuke', file: 'Nuke' },
    { name: 'Anubis', file: 'Anubis' },
    { name: 'Vertigo', file: 'Vertigo' },
    { name: 'Ancient', file: 'Ancient' }
  ];

  const handleMapClick = (mapFile) => {
    const formattedMapName = mapFile.replace(/\s+/g, '').toLowerCase();
    navigate(`/quiz/${formattedMapName}`);
  };

  const handleActiveDutyClick = () => {
    navigate('/quiz/active');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1>
        {title.split('GO').map((part, index) => 
          index === 0 ? part : [<span key="highlight" style={{ backgroundColor: highlight ? 'yellow' : 'transparent' }}>GO</span>, part])
        }
      </h1>
      <p>The easiest way to learn Counter-Strike callouts</p>
      <button onClick={handleActiveDutyClick} style={{ padding: '10px 20px', margin: '10px', fontSize: '16px' }}>Random Quiz</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px', margin: '20px auto' }}>
        {maps.map((map, index) => (
          <div key={map.name} onClick={() => handleMapClick(map.file)}
               style={{
                 width: '223px',
                 height: '223px',
                 margin: '10px',
                 position: 'relative',
                 overflow: 'hidden',
                 borderRadius: '15px',
                 boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                 cursor: 'pointer',
                 transform: 'scale(1)',
                 transition: 'transform 0.3s ease-in-out'
               }}
               onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
               onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img src={`/csgolocations/images/Maps/${map.file}.png`} alt={map.name}
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
                 position: 'absolute',
                 bottom: '0',
                 width: '100%',
                 textAlign: 'center',
                 background: 'rgba(0,0,0,0.6)',
                 color: 'white',
                 fontSize: '18px',
                 padding: '10px 0'
               }}
            >
              {map.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
