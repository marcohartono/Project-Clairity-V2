<template>
    <main>
      <div id="main-content">
          <b-row>
            <b-col>
              <h1 >Dashboard</h1>
              <h2 v-if="selectedField">Name: {{ selectedField.name }}</h2>
            
            </b-col>
            <b-col style="align-items: right;">
              <b-dropdown id="dropdown-1" text="Choose a Location" class="m-md-2">
              <b-dropdown-item v-for="(field) in fields" 
              @click="changeDevice(field.id)"
              >{{field.name}}</b-dropdown-item>
          </b-dropdown>
            </b-col>
          </b-row>
          <b-row v-if="selectedField">
            <GMapMap 
                    :center="{lat: Number(selectedField.latitude) , lng: Number(selectedField.longitude)}"
                    :zoom="21"
                    map-type-id="terrain"
                    :styles= "mapStyles"
                    style="height:362px; width:1224px"
                    
                >
                <GMapMarker
                        v-if="devices.length > 1"

                        v-for="(device, index) in devices"
                        :key="index"
                        :position="{lat: Number(device?.latitude), lng: Number(device?.longitude) }"
                        :clickable="true"
                        
                    >
                    </GMapMarker>

              
            </GMapMap>
          </b-row>
          <b-row>
            <b-col md="2">
              <h2>Section</h2>
            </b-col>
            <b-col md="10">
              <b-dropdown
              text="Block Level Dropdown Menu"
              class="m-2 w-100"
              menu-class="dropdown-full-width"
              block
              
              
              >
                <b-dropdown-item href="#" v-for="(device) in devices">{{device.name}}</b-dropdown-item>
                
              </b-dropdown>
            </b-col>
          </b-row>
          <b-row>
            <table>
              
            </table>
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
            selectedField: null,
            mapStyles: [
                  {
                      featureType: "poi",
                      stylers: [{ visibility: "off" }]
                  },
                  {
                      featureType: "transit",
                      elementType: "labels.icon",
                      stylers: [{ visibility: "off" }]
                  }
              ],


        }

    },
    computed: {
        fieldId() {
            return this.$route.params.fieldId;
        },
        selectedField() {
            const fieldId = this.$route.params.fieldId;
            return this.fields.find(field => field.id === parseInt(fieldId));
        }


    },
    mounted() {
    this.getData()
  },
    methods:
    {
      changeDevice(field_Id){
      const routeData = this.$router.resolve({
                    name: 'Dashboard',
                    params: {
                        fieldId: field_Id,
                    }
                });
                window.open(routeData.href, '_blank');
    },
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
        console.log("Field ID:", this.fieldId);
        console.log(this.selectedField);  // Log to verify it’s being set correctly
    }
};
</script>
