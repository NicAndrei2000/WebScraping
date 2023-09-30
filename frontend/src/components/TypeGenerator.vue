<template>
  <div class="containerResult">
    <div v-if="selectedItem.isTitleSelected && page.title">
      <p class="staticContent">The main title:</p>
      <h1>
        {{ page.title }}
      </h1>
    </div>

    <div v-if="selectedItem.isTextSelected">
      <p class="staticContent">The content:</p>
      <div v-for="parag in page.text" :key="parag.heading">
        <h2>{{ parag.heading }}</h2>
        <p>{{ parag.paragraph }}</p>
      </div>
    </div>

    <div
      v-if="selectedItem.isImgSelected && page.imageURL"
      class="imageSection"
    >
      <p class="staticContent">The image:</p>

      <div class="imageClass">
        <img :src="page.imageURL" alt="" class="image" />
      </div>
    </div>

    <div v-if="selectedItem.isSentimentAnSelected">
      <p class="staticContent">Sentiment analysis:</p>
      <template v-if="page.SentimentCof > 0">
        <p>
          After conducting sentiment analysis, the text appears to be positive.
        </p>
      </template>
      <template v-else>
        <p>
          The sentiment analysis results suggest a negative tone in the text.
        </p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: Object,
    selectedItem: Object,
  },
};
</script>

<style>
.containerResult {
  height: auto;
  width: 90rem;
  margin-top: 5rem;
  background-color: rgb(231, 220, 220);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  min-height: 50rem;
  padding: 3rem;
}
.imageSection {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.imageClass {
  width: 35rem;
}
.image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}
.staticContent {
  padding-top: 2rem;
  font-weight: bold;
  font-size: large;
  text-align: center;
}
</style>
