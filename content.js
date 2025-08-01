/* --- All previous CSS remains the same --- */

#ai-sidebar {
  position: fixed;
  width: 60px;
  height: 60px;
  background-color: #1a73e8;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  z-index: 2147483647; /* Max z-index */
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: grab;
  color: black;
}

#ai-sidebar.expanded {
  width: 400px;
  height: 500px; /* Set a default expanded height */
  min-height: 300px; /* Add min dimensions */
  min-width: 300px; /* Add min dimensions */
  max-height: 95vh; /* Add max dimensions */
  max-width: 95vw; /* Add max dimensions */
  background-color: #f4f7f9;
  overflow: visible; /* Change overflow to allow handle to be seen */
}

/* --- Other styles like .collapsed, #sidebar-toggle, etc. remain the same --- */

#ai-sidebar.expanded #sidebar-content {
  opacity: 1;
}

.container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  height: 100%;
  box-sizing: border-box; /* Ensures padding is included in height/width */
}

/* --- All other styles remain the same --- */


/* --- NEW Styles for Resize Handle --- */
#resize-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;
  cursor: se-resize; /* Southeast resize cursor */
  opacity: 0;
  background-image: linear-gradient(135deg, transparent 50%, #1a73e8 50%);
  transition: opacity 0.2s;
}

#ai-sidebar.expanded #resize-handle {
  opacity: 1; /* Only show when expanded */
}
