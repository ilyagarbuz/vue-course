<template>
  <div class="loader"></div>
</template>

<script>
export default {
}
</script>

<style>
  .loader {
    border: 6px solid #f3f3f3; /* Light grey */
    border-top: 6px solid #9eff00; /* Blue */
    border-radius: 50%;
    width: 25px;
    height: 25px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
