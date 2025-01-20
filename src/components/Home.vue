<template>
    <main>
        <h1 class="home">Home</h1>
        <b-row class="landing-page">

            <b-col style="margin-top: 10px;">
                <h2>Be Mindful of Your Workspace</h2>
                <h1>Project Clarity</h1>
                <p>Elevate productivity and well-being with cl(air)ity's smart air quality sensors </p>
                <b-row>
                    <b-col>
                        <div class="information-box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                            </svg>
                            <h3>
                                Real-time
                            </h3>
                            <p>Deliver real-time data insights</p>
                            
                        </div>
                </b-col>
                    <b-col>
                        <div class="information-box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-rulers" viewBox="0 0 16 16">
                                <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1z"/>
                                </svg>
                            <h3>
                                Percise
                            </h3>
                            <p>Ensure precise measurements</p>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="information-box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
                            <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
                            </svg>
                            <h3>
                                Interactive
                            </h3>
                            <p>Present interactive data visualizations</p>
                        </div>
                    </b-col>

                    <b-row style="margin-top: 10px;">
                    <button @click="openModal" class="feedback-button" >
                            tell us how you feel
                    </button>
                    </b-row>
                </b-row>
            </b-col>
        

            

        </b-row>
        <b-row class="map-container">
            <b-row class="info-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
                <p>
                    Please click the placemark to view more details
                </p>

                
            </b-row>
            <b-row :class="{ 'disabled-content': showModal }" >
               
                <!-- map goes here -->
                <GMapMap class="map"
                    :center="center"
                    :zoom="11.5"
                    map-type-id="terrain"
                    style="height:600px; width:100%;"
                    @click="activeInfoWindow = null"
                >
                    <GMapMarker
                        v-if="fields.length"

                        v-for="(field, index) in fields"
                        :key="index"
                        :position="{lat: Number(field?.latitude), lng: Number(field?.longitude) }"
                        :clickable="true"
                        :options="mapOptions"
                        @click="openInfoWindow(index, field.id)" 
                    >
                    <GMapInfoWindow  
                        :opened="activeInfoWindow === index"
                    >
                        <div class="info-window">
                            <h4>{{ field.name }}</h4>
                            <hr>

                            <b-row  v-for="(device) in devices" >
                                <b-col class="device-row">
                                    <p> {{device.name}}</p>
                                </b-col>
                                <b-col :class="getStatusClass(evaluateCO2(device.devices[0].latest_payload.co2_ppm))">
                                    <p>{{ evaluateCO2(device.devices[0].latest_payload.co2_ppm) }}</p>
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

        <!-- Modal component -->
        <Modal v-if="showModal" @close="closeModal">
        <FeedbackForm @close="closeModal" />
        </Modal>
        


    </main>
   

</template>

<script>
    import axios from 'axios'
    import { defineComponent } from 'vue'
    import FeedbackForm from './FeedbackForm.vue';
    import Modal from './Modal.vue';

    export default defineComponent({
        name: 'homePage',
        components: {
            Modal,
            FeedbackForm
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
                showModal: false,
                mapOptions: {
                    restriction: {
                    latLngBounds: {
                        north: -6.15,  // Northern boundary
                        south: -6.25,  // Southern boundary
                        east: 106.85,  // Eastern boundary
                        west: 106.75,  // Western boundary
                    },
                    strictBounds: true, // Ensures users can't pan outside the bounds
                    },
                    zoomControl: true, // Enable zoom controls
                    gestureHandling: "auto", // Allow zooming and panning within bounds
                    draggable: true, // Allow panning
                },
                
            
            };
        },
        mounted() {
        // Fetch the data when the component is mounted
        this.getData();
        this.getFieldDevices();
        },
        methods: {
            // async getFieldDevices(fieldId){
            //     console.log("Field ID:", this.fieldId);
            //     const response = await this.$api.getFieldDetail(fieldId, {
            //     });

            //     return response.data.data.blocks;
            // },
            async getFieldDevices(){
                if (!this.fields) return;

                console.log("Fields:", this.fields);

                for (let i = 0; i < this.fields?.length; i++) {
                    const response = await this.$api.getFieldDetail(fields[i].id, {
                });
                    this.devices.push(response.data.data.blocks);
                }
            },
            handleClick(field_Id) {
                const routeData = this.$router.resolve({
                    name: 'Dashboard',
                    params: {
                        fieldId: field_Id,
                    }
                });
                window.open(routeData.href, '_blank');
            },
            async openInfoWindow(index, fieldId ) {

                if (this.activeInfoWindow === index) {
                    // Close the info window if it's already open
                    this.activeInfoWindow = null;
                } else {
                    // Open the new info window
                    this.activeInfoWindow = index;

                    // (Optional) Perform any additional logic for the clicked marker
                    console.log(`Marker clicked: Field ID = ${fieldId}`);
                }
                console.log(fieldId)
                this.activeInfoWindow = index;
                this.selectedDevice = this.devices[index];
                
                const response = await this.$api.getFieldDetail(fieldId, {
                });
                this.devices = response.data.data.blocks

              
                            


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
            getStatusClass(status) {
                return {
                    good: "status-good",
                    fair: "status-fair",
                    poor: "status-poor",
                }[status] || "status-default";
                },
            async getData() {
                try {
                        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/devices`, {
                        // headers: {
                        //     'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                        // }
                        // });
                        // this.devices = response.data.data;
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
                openModal() {
                console.log('open modal')
                this.showModal = true;
                },
                closeModal() {
                    this.showModal = false;
                }
    
            },
            
            
    })


    

    
</script>
  