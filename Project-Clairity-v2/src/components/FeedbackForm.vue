<template>
    <!-- Your HTML template goes here -->
    <div class="feedback-form">
      <h2>PROJECT CLARITY</h2>
      <p>Could you please let us know your current location?</p>
  
      <div class="form-group">
        <label for="area">Area</label>
        <select v-model="area">
          <option value="" disabled>Select Area</option>
          <option v-for="field in fields" :key="field" >{{ field?.name}}</option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="section">Section</label>
        <select v-model="section">
          <option value="" disabled>Select Section</option>
          <option v-for="device in devices" :key="device" >{{ device?.name }}</option>
        </select>
      </div>
  
      <p>How are you feeling right now?</p>
      <div class="emoji-options">
        <label v-for="(emoji, index) in emojiOptions" :key="index">
          <input type="radio" v-model="mood" :value="emoji.text" />
          <img :src="emoji.image" :alt="emoji.text" class="emoji-icon" />
        </label>
      </div>
  
      <button @click="submitFeedback">Send</button>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import axios from 'axios'

 
  export default defineComponent({
    setup() {
      const area = ref('');
      const section = ref('');
      const mood = ref('');
      const locations = ref(['Wisma BCA Foresta', 'Other Area']);
      const sections = ref(['Meeting Room 1', 'Meeting Room 2']);
      const emojiOptions = ref([
        { text: 'Very Tired', image: 'path-to-very-tired-emoji' },
        { text: 'Tired', image: 'path-to-tired-emoji' },
        { text: 'Happy', image: 'path-to-happy-emoji' },
        { text: 'Very Happy', image: 'path-to-very-happy-emoji' }
      ]);
  
      const submitFeedback = () => {
        const feedback = {
          area: area.value,
          section: section.value,
          mood: mood.value,
        };
        console.log(feedback);
        // Logic to handle form submission, e.g., sending data to the backend
      };
  
      return {
        area,
        section,
        mood,
        locations,
        sections,
        emojiOptions,
        submitFeedback,
        fields: [],
        devices: [],
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
        async getData() {
                try {
                        const response = await axios.get(`${import.meta.env.VITE_API_URL}/devices`, {
                        headers: {
                            'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                        }
                        });
                        this.devices = response.data.data;
                        const fields = await axios.get(`${import.meta.env.VITE_API_URL}/fields`, {
                        headers: {
                        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                        }
                        });
                         this.fields = fields.data.data;
                    } catch (error) {
                        console.error('Error fetching devices:', error);
                    }
                },
    },
  });
  </script>
  
  <style scoped>
  /* Add styles here */
  .feedback-form {
    /* your styles */
  }
  </style>
  