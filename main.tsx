import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// This approach allows us to keep the HTML structure while enabling React features
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the React application
  const root = document.getElementById('root');
  
  if (root) {
    createRoot(root).render(<React.Fragment></React.Fragment>);
    
    console.info("Elegance Shop - Script loaded successfully");
  }
});