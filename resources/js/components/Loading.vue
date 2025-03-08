<template>
  <div class="loading-overlay">
    <div class="spinner"></div>
    <img src="/images/logo_black.png" alt="Logo" class="spinner-logo" />
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  position: absolute;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 250px;
  height: 250px;
  animation: spin 1s linear infinite;
}

.spinner-logo {
  position: absolute;
  width: 150px;
  height: 150px;
  z-index: 10;
  pointer-events: none;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
