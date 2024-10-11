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
                <GMapMap ]
                    :center="center"
                    :zoom="11.5"
                    map-type-id="terrain"
                    style="height:600px; width:800px"
                >
                    <GMapMarker
                        v-if="fields.length > 1"

                        v-for="(field, index) in fields"
                        :key="index"
                        :position="{lat: Number(field?.latitude), lng: Number(field?.longitude) }"
                        :clickable="true"
                        @click="openInfoWindow(index)" 
                    >
                    <GMapInfoWindow 
                        :opened="activeInfoWindow === index"
                    >
                        <div class="info-window">
                            <h4>{{ field.name }}</h4>
                            <hr>

                            <b-row  v-for="(device) in devices">
                                <b-col>
                                    <p> {{device.name}}</p>
                                </b-col>
                                <b-col>
                                    <p>{{ evaluateCO2(device.latest_payload.co2_ppm) }}</p>
                                </b-col>
                            </b-row>
                            <b-row>
                                <button @click="handleClick(field.id)">See detail</button>
                            </b-row>

                        </div>
                     </GMapInfoWindow>
                    </GMapMarker>


                </GMapMap>
                <div >
                    
                </div>
            </b-row>
        </b-row>

    </main>
   

</template>

<script>
    import axios from 'axios'
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'homePage',
        components: {

        },
        data(){
            return {
                devices : [],
                fields: [],
                selectedDevice: null,
                center: {lat: -6.2088, lng: 106.8454},
                testloc: [
                    { "lat": -6.2159, "lng": 106.8523 },
                    { "lat": -6.2127, "lng": 106.8375 },
                    { "lat": -6.2048, "lng": 106.8488 }
                ],
                activeInfoWindow: null,  
                
            
            };
        },
        mounted() {
        // Fetch the data when the component is mounted
        this.getData();
        },
        methods: {
            handleClick(field_Id) {
                const routeData = this.$router.resolve({
                    name: 'Dashboard',
                    params: {
                        fieldId: field_Id,
                    }
                });
                window.open(routeData.href, '_blank');
            },
            openInfoWindow(index ) {
                this.activeInfoWindow = index;
                this.selectedDevice = this.devices[index];
            },
            evaluateCO2(co2Value) {
                if (co2Value < 1000) {
                    return 'good';
                } else if (co2Value >= 1000 && co2Value < 2000) {
                    return 'fair';
                } else {
                    return 'poor';
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
    })


    

    
</script>
  