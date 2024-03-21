<script setup>
import ProgressSpiner from "primevue/progressspinner"
</script>

<template>
    <ProgressSpiner 
    style="
        width: 50px;
        height: 50px"
        strokeWidth= "8"
        fill="var(--surface-groud)"
        animatoinDuration=".5s"
        aria-label="Custom ProgressSpinner"   
    
    />
</template>

