<template>
  <div class="page">
    <h1>Technical test</h1>
    <br />
    <div class="container">
      <label for="text">Write here the URL</label>
      <input
        type="text"
        v-model="inputText"
        :placeholder="placeholder"
        class="urlInput"
      />

      <br />

      <div class="checkboxContainer">
        <label for="titlu">Extract the main title</label>
        <input
          type="checkbox"
          name="titlu"
          id="titlu"
          v-model="isTitleSelected"
        />

        <label for="text">Extract the content</label>
        <input type="checkbox" name="text" id="text" v-model="isTextSelected" />

        <label for="img">Extract image</label>
        <input type="checkbox" name="img" id="img" v-model="isImgSelected" />

        <label for="img">See sentiment analysis</label>
        <input
          type="checkbox"
          name="text"
          id="text"
          v-model="isSentimentAnSelected"
        />
      </div>
      <br />

      <button @click="sendTheUrl" class="button">Send</button>
      <div class="downloadContent">
        <label v-if="raspuns" for="text">Download JSON</label>
        <button v-if="raspuns" @click="downloadText" class="button">
          Download
        </button>

        <br />

        <label v-if="raspuns && isImgSelected" for="text">Download Image</label>
        <button
          v-if="raspuns && isImgSelected"
          @click="downloadImage"
          class="button"
        >
          Download
        </button>
      </div>
    </div>
    <type-generator
      :page="raspuns"
      :selectedItem="{
        isTextSelected,
        isTitleSelected,
        isImgSelected,
        isSentimentAnSelected,
      }"
      v-if="raspuns"
    />
  </div>
</template>

<script>
import axios from "axios";
import TypeGenerator from "./components/TypeGenerator.vue";

export default {
  data() {
    return {
      inputText: "",
      placeholder: "Add the URL...",
      isTextSelected: false,
      isTitleSelected: false,
      isImgSelected: false,
      isSentimentAnSelected: false,
      raspuns: false,
    };
  },
  methods: {
    async sendTheUrl() {
      this.raspuns = false;

      try {
        const response = await axios.post("http://localhost:8080/api", {
          Url: this.inputText,
        });

        this.raspuns = response.data;
      } catch (error) {
        console.error("An error occurred: " + error);
      }
    },
    downloadText() {
      if (this.raspuns) {
        const textContent = JSON.stringify(this.raspuns, null, 2);

        const blob = new Blob([textContent], { type: "text/plain" });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "resultJSON.txt";

        a.click();

        URL.revokeObjectURL(url);
      }
    },
    async downloadImage() {
      if (this.raspuns && this.raspuns.imageURL) {
        if (this.raspuns && this.raspuns.imageURL) {
          const imageURL = this.raspuns.imageURL;

          try {
            const response = await fetch(imageURL);
            const imageBlob = await response.blob();

            const blobURL = URL.createObjectURL(imageBlob);

            const a = document.createElement("a");
            a.href = blobURL;
            a.download = "downloaded_image.jpg";

            a.click();

            URL.revokeObjectURL(blobURL);
          } catch (error) {
            console.error("An error occurred: " + error);
          }
        }
      }
    },
  },
  components: { TypeGenerator },
};
</script>

<style>
.container {
  height: auto;
  width: 50rem;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  background-color: rgb(231, 220, 220);
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
.urlInput {
  height: 2rem;
  width: 25rem;
  border-radius: 10px;
}
.checkboxContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.checkboxContainer label {
  font-size: medium;
}
.checkboxContainer input {
  margin-bottom: 1.5rem;
  transform: scale(1.5);
}

.button {
  width: 100px;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 10px;
}
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1300px;
  padding-bottom: 50px;
}

.downloadContent {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
