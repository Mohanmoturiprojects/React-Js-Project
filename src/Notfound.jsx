import React from 'react';

function Notfound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <img src="public/Images/notfound.png" alt="Page not found" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
}

export default Notfound;