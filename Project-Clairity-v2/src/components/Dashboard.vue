<template>
    <main>
      <b-row>
        <b-col>
          <h1>Dashboard</h1>
        </b-col>
        <b-col>
          <p>test {{ fieldId }}</p>
        </b-col>
      </b-row>
      <div id="main-content">
          <b-row>
            <!-- building layout goes here -->
             <!-- {{devices[1]}} -->
             {{ fields }}
          </b-row>
          <b-row>
            <b-col md="3">section</b-col>
            <b-col md="9">
              <!-- dropdown -->
            </b-col>
          </b-row>

          <b-row>
            <b-table striped hover :items="items"> 
              
            </b-table>
          </b-row>
      </div>

    </main>
    
</template>
  
<script>
import { addDays, format } from 'date-fns'; // Import date fns function
// import Chart from '@/components/Chart.vue';
import axios from 'axios'

 export default {
    name: 'Dashboard',
    data() {
        return {
            devicePayloads: [],
            isLoading: false,
            selectedDevice: null,
            devices: [],
            fields:[],


        }

    },
    computed: {
        fieldId() {
            return this.$route.params.fieldId;
        },


    },
    mounted() {
    this.getData()
  },
    methods:
    {
      async getUplink() {
            try {
                const response = await this.$api.getUplinks({
                    start_date: format(addDays(new Date(), -1), 'yyyy-MM-dd'), // Format 3 days ago to yyyy-MM-dd, e.g. 2024-05-26
                    end_date: format(new Date(), 'yyyy-MM-dd'), // Format today to yyyy-MM-dd, e.g. 2024-05-29
                    device_id: this.deviceId,
                    load_payloads: 1,
                    per_page: 20
                });
                console.log(response.data);
                } catch (error) {
                console.error('Error fetching uplink data:', error);
            }
      },
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

    created() {
        console.log("Field ID:", this.fieldId); // Log to verify it’s being set correctly
    }
};
</script>