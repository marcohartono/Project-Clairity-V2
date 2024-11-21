<template>
    <div class="feedback-form">
      <h2>PROJECT CLARITY</h2>
      <p>Could you please let us know your current location?</p>
  
      <div class="form-group">
        <label for="area">Area</label>
        <select v-model="area" v-if="fields.length">
          <option value="" disabled>Select Location</option>
          <option v-for="field in fields" :key="field.id" :value="field.name">{{ field.name }}</option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="section">Section</label>
        <select v-model="section" v-if="devices.length">
          <option value="" disabled>Select Section</option>
          <option v-for="device in devices" :key="device.id" :value="device.name">{{ device.name }}</option>
        </select>
      </div>
  
      <p>How are you feeling right now?</p>
      <div class="emoji-options">
        <label v-for="(emoji, index) in emojiOptions" :key="index">
          <input type="radio" v-model="mood" :value="emoji.text" />
          <img :src="emoji.image" :alt="emoji.text" class="emoji-icon" />
          <p>{{ emoji.text }}</p>
        </label>
      </div>
      <b-button @click="submitFeedback">Submit</b-button>
    </div>
  </template>
  
  <script>
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import firebase from '../../services/firebase';

export default defineComponent({
  setup(props, { emit }) {
    const area = ref('');
    const section = ref('');
    const mood = ref('');
    const fields = ref([]);
    const devices = ref([]);
    const emojiOptions = ref([
      { text: 'Very Tired', image: '/emojis/emoji-frown-fill.svg' },
      { text: 'Tired', image: '/emojis/emoji-neutral-fill.svg' },
      { text: 'Productive', image: '/emojis/emoji-smile-fill.svg' },
      { text: 'Very Productive', image: '/emojis/emoji-laughing-fill.svg' },
    ]);

    const getData = async () => {
      try {
        const fieldsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/fields`, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          }
        });
        fields.value = fieldsResponse.data.data;

        const devicesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/devices`, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          }
        });
        devices.value = devicesResponse.data.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const submitFeedback = () => {
      // Check if all fields are filled
      if (!area.value || !section.value || !mood.value) {
        alert("Please fill in all fields before submitting.");
        return;
      }

      // Store data in Firebase (or handle data submission)
      firebase.storeData(section.value, mood.value);
      const feedback = {
        area: area.value,
        section: section.value,
        mood: mood.value,
      };
      console.log(feedback);

      // Emit an event to notify the parent component to close the modal
      emit("close");
    };

    onMounted(() => {
      getData();
    });

    return {
      area,
      section,
      mood,
      fields,
      devices,
      emojiOptions,
      submitFeedback,
    };
  }
});
</script>

  
  <style scoped>
  .feedback-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.feedback-form h2 {
  font-size: 1.5em;
  font-weight: bold;
  color: #5c8e50;
  margin-top: 10px;
  text-align: center;
}

.feedback-form p {
  color: #5c8e50;
  text-align: center;
  margin-bottom: 15px;
  font-size: 1.1em;
}

.feedback-form .form-group {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.form-group label {
  flex: 1;
  background-color: #5c8e50;
  color: white;
  padding: 10px;
  border-radius: 8px 0 0 8px;
  font-weight: bold;
  text-align: center;
}

.form-group select {
  flex: 3;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 0 8px 8px 0;
  outline: none;
  appearance: none;
  font-size: 1em;
}

.feedback-form .emoji-options {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 15px;
}

.emoji-options label {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.emoji-options input[type="radio"] {
  display: none; /* Hide the default radio button */
}

.emoji-options img {
  width: 60px;
  height: 60px;
  margin-bottom: 5px;
  transition: transform 0.3s;
  border: 2px solid transparent;
  border-radius: 50%;
}

.emoji-options input[type="radio"]:checked + img {
  transform: scale(1.1);
  border-color: #5c8e50; /* Green border when selected */
}

.emoji-options label p {
  font-size: 0.9em;
  color: #333;
}

.feedback-form button {
  background-color: #5c8e50;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.feedback-form button:hover {
  background-color: #4c7a40;
}

  </style>
  