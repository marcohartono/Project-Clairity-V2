<template>
    <main>
        <b-row>
            <b-col>
                <h2>Be Mindful of Your Workspace</h2>
                <h1>Project Clarity</h1>
                <p>Elevate productivity and well-being with cl(air)ity's smart air quality sensors </p>
                <b-row>
                    <b-col>
                        <div>
                            <img src="" alt="">
                            <h3>
                                Real-time
                            </h3>
                            <p>Deliver real-time data insights</p>
                        </div>
                    </b-col>
                    <b-col></b-col>
                    <b-col></b-col>
                </b-row>
            </b-col>
            <b-col>
                <h1>test</h1>
                <!-- <p> {{  devices.item.name  }}</p> -->
            </b-col>

        </b-row>
    </main>
   

</template>

<script>
    import axios from 'axios'
    import { defineComponent } from 'vue'
    import { addDays, format } from 'date-fns';

    export default defineComponent({
        name: 'homePage',
        data(){
            return {
                devices : [],
            };
        },
        mounted() {
        // Fetch the data when the component is mounted
        this.getData();
        this.getHistoricalData();
        },
        methods: {
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
                    } catch (error) {
                        console.error('Error fetching devices:', error);
                    }
                },
            
            async getHistoricalData() {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/uplinks`, {
                        params: {
                        start_date: '2024-01-01', // Example start date
                        load_payloads: 1,
                        device_id: this.deviceId, // Fetch data for the current device
                        per_page: 15,
                        page: 1
                    },
                    headers: {
                        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                    }
                });
                    console.log(response.data.data); // Log the historical data
                 }catch (error) {
                console.error('Error fetching historical data:', error);
            }
            }
            }
    })


    

    
</script>
  