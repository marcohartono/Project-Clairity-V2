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
                    <b-col>
                        <div>
                            <img src="" alt="">
                            <h3>
                                Percise
                            </h3>
                            <p>Ensure precise measurements</p>
                        </div>
                    </b-col>
                    <b-col>
                        <div>
                            <img src="" alt="">
                            <h3>
                                Interactive
                            </h3>
                            <p>Present interactive data visualizations</p>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
            </b-col>

        </b-row>
        <b-row>
            <b-row>
                <!-- image for info -->
                <img src="" alt=""> 

                <p>
                    Please click the placemark to view more details
                
                </p>
            </b-row>
            <b-row>
                <!-- map goes here -->
                <div >
                    <GoogleMap api-key="AIzaSyAu_FjQY1_hxZZUIGej6HLlein1hC1ugMQ" style="height:600px; width:800px" :zoom="12" :center="center">
                        <Marker 
                            v-for="(device, index) in devices" :key="index" 
                            :options="{position: {lat: device.latitude, lng: device.longitude}, title: device.name}"
                        
                        />
                    </GoogleMap>
                </div>
            </b-row>
        </b-row>

    </main>
   

</template>

<script>
    import axios from 'axios'
    import { defineComponent } from 'vue'
    import { GoogleMap, Marker } from 'vue3-google-map';
    export default defineComponent({
        name: 'homePage',
        components: {
            GoogleMap,
            Marker
        },
        data(){
            return {
                devices : [],
                selectedDevice: null,
                center: {lat: -6.2088, lng: 106.8456},
            };
        },
        mounted() {
        // Fetch the data when the component is mounted
        this.getData();
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
            
    
            }
    })


    

    
</script>
  