<template>
  <section class="url-bar">
    <p class="address">
      <span>https://</span><span class="mb-hide">wewix.onrender.com/</span
      ><span class="mb-show">... /</span
      ><span
        class="site-name"
        :style="{ color: isValidWapName ? 'green' : 'red' }"
        @input="$emit('urlBarChange', $event)"
        :contenteditable="!isPublished"
        >{{ updatedWapName }}</span
      >
    </p>
  </section>
</template>

<script></script>
