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
                  @click="changeField(field.id)"
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
                    style="height:362px; width:100%"
                    
                >
                <GMapMarker
                        v-if="chosenField"

                        v-for="(device, index) in chosenField"
                        :key="index"
                        :position="{lat: Number(device?.latitude), lng: Number(device?.longitude) }"
                        :clickable="true"
                        
                    >
                    </GMapMarker>

              
            </GMapMap>
          </b-row>
          <b-row>
            <b-col md="1">
              <h2>Section</h2>
            </b-col>
            <b-col md="11"> 
              <b-dropdown
              text="Select a device"
              
              
              >
                <b-dropdown-item @click="changeDevice(device?.id)" v-for="(device) in chosenField">{{device.name}}</b-dropdown-item>
                
              </b-dropdown>
            </b-col>
          </b-row>


          <b-row v-if="selectedDevice && latestPayload">
          <div class="container border p-3 mt-3">
          <div class="row align-items-center">
            <div class="col">
              <h6 class="text-muted">Device</h6>
            </div>
            <div class="col text-end">
              <span class="badge bg-danger rounded-pill">{{ latestPayload }}</span>
            </div>
          </div>

            <div class="table-responsive mt-2">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td class="fw-bold">Name</td>
                    <td colspan="2">{{ selectedDevice.name }}</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">ID</td>
                    <td colspan="2">{{ selectedDevice.id }}</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">Timezone</td>
                    <td colspan="2">Asia/Jakarta (UTC + 07.00)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
            
          </b-row>

          <b-row v-if="selectedDevice">
            <div class="container border p-3" >
              <!-- Header Row -->
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-muted">LATEST DATA</h6>
                </div>
                <div class="col text-end">
                  <small class="text-muted">{{ formatDate(selectedDevice.latest_payload.datetime)}}</small>
                </div>
              </div>

              <!-- Data Row -->
              <div class="row mt-3">
                <!-- Indoor AQI -->
                <div class="col-3">
                  <div class="p-3 bg-info text-white text-center rounded">
                    <div class="h6">INDOOR AQI</div>
                    <div class="h5">{{evaluateCO2(selectedDevice.latest_payload.co2_ppm)}}</div>
                  </div>
                </div>

                <!-- Temperature -->
                <div class="col-3 text-center">
                  <div class="h6">TEMPERATURE
                    <small>°C</small>
                  </div>
                  <div class="h3">{{selectedDevice.latest_payload.temperature}}</div>
                  
                </div>

                <!-- PM2.5 -->
                <div class="col-3 text-center">
                  <div class="h6">PM2.5
                    <small>µg/m³</small>
                  </div>
                  <div class="h3">{{selectedDevice.latest_payload.mass_concentration_pm025}}</div>
                  
                </div>
              </div>

              <!-- CO₂, Humidity, PM1.0 Row -->
              <div class="row mt-3">
                <!-- CO₂ -->
                <div class="col-4 text-center">
                  <div class="h6">CO₂
                    <small>PPM</small>
                  </div>
                  <div class="h3">{{selectedDevice.latest_payload.co2_ppm }}</div>
                  
                </div>

                <!-- Humidity -->
                <div class="col-4 text-center">
                  <div class="h6">HUMIDITY
                    <small>%</small>
                  </div>
                  <div class="h3">{{selectedDevice.latest_payload.relative_humidity }}</div>
                </div>

                <!-- PM1.0 -->
                <div class="col-4 text-center">
                  <div class="h6">PM1.0
                    <small>µg/m³</small>
                  </div>
                  <div class="h3">{{selectedDevice.latest_payload.mass_concentration_pm010 }}</div>
                  
                </div>
              </div>
            </div>
          </b-row>
          <b-row>
            <div v-if="selectedDevice">
              <b-row >
                <b-col >
                  <label for="">Start Date</label>
                  <VueDatePicker v-model="startDate"></VueDatePicker>
                </b-col>
                <b-col>
                  <label for="">End Date</label>
                  <VueDatePicker v-model="endDate"></VueDatePicker>
                </b-col>
                <b-col>
                  <b-button @click="generateReport">Generate</b-button>
                </b-col>
                <b-col>
                  <b-button>Download</b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col>Data Key</b-col>
                <b-col>
                  <b-dropdown id="dropdown-1" text="Choose a Particulate" class="m-md-2">
                    <b-dropdown-item v-for="(particulate, index) in essentialParticulates" :key="index" @click="selectParticulate(particulate)">{{ particulate.name }}</b-dropdown-item>
                  </b-dropdown>
                </b-col>
              </b-row>
              <b-row v-if="chartData && chartData.labels.length && chartData.datasets.length">
                <Chart :data="chartData" /> 
                </b-row>
              <b-row v-if="tableData.length">
              <b-col>
                <b-table :items="tableData" :fields="tableFields" responsive="md"></b-table>
              </b-col>
            </b-row>
            </div>

          </b-row>

          </div>

    </main>
    
</template>
  
<script>
import { addDays, format, formatDistanceToNow } from 'date-fns'; // Import date fns function
// import Chart from '@/components/Chart.vue';
import axios from 'axios'
import { enUS } from 'date-fns/locale';
// import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
// import { get } from 'bootstrap-vue-next/dist/src/utils';
import Chart from '@/components/Chart.vue';



 export default {
    name: 'Dashboard',
    components: {
        Chart,
    },
    data() {
        return {
            devicePayloads: [],
            isLoading: false,
            selectedDevice: null,
            devices: [],
            chosenField: null,
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
            latestPayload: null,
            startDate: null,
            endDate: null,
            essentialParticulates: [],
            isLoading: false,
            tableData: [],
            tableFields: [
              { key: 'datetime', label: 'Datetime' },
              { key: 'co2', label: 'CO2 (ppm)' },
              { key: 'temperature', label: 'Temperature (°C)' },
              { key: 'humidity', label: 'Humidity (%)' },
              { key: 'pm25', label: 'PM2.5 (µg/m³)' },
              { key: 'pm10', label: 'PM10 (µg/m³)' }
            ],
            selectedParticulate: "CO2",
            chartLabels: [],    // Holds x-axis labels (datetimes)
            chartDataset: [],  
            

        }

    },
    computed: {
        fieldId() {
            return this.$route.params.fieldId;
        },
        selectedField() {
            const fieldId = this.$route.params.fieldId;
            return this.fields.find(field => field.id === parseInt(fieldId));
        },
        chartData() {
          console.log("chartLabels:", this.chartLabels);    // Check if labels are valid
          console.log("chartDataset:", this.chartDataset); 
          // Maximum number of points to display on the chart
          const maxPoints = 50;
          const totalPoints = this.chartLabels.length;

          // Determine the interval dynamically to fit within maxPoints
          const interval = Math.ceil(totalPoints / maxPoints);

          // Sample data based on the calculated interval
          const sampledLabels = this.chartLabels.filter((_, index) => index % interval === 0);
          const sampledDataset = this.chartDataset.filter((_, index) => index % interval === 0);

          return {
            labels: sampledLabels,
            datasets: [
              {
                label: this.selectedParticulate,
                data: sampledDataset,
                backgroundColor: '#41B883',
                borderColor: '#41B883',
                fill: false,
                pointBackgroundColor: '#41B883',
                pointBorderColor: '#41B883',
                pointRadius: 5,
                pointHoverRadius: 7,
                tension: 0.4,
              }
            ]
          };
        }
        },


    mounted() {
    this.getData();
    this.getFields();
    
    },
    methods:
    {
      updateChartData() {
        this.chartLabels = [];
        this.chartDataset = [];

        // Generate labels and data based on the selected particulate
        this.devicePayloads.forEach(datePayload => {
          const date = datePayload.date;

          datePayload.payloads.forEach(payload => {
            const datetime = `${date} ${payload.time || ''}`.trim();

            // Add datetime to labels
            this.chartLabels.push(datetime);

            // Add the selected particulate's value to the dataset
            if (this.selectedParticulate === "CO2") {
              this.chartDataset.push(payload.co2_ppm);
            } else if (this.selectedParticulate === "Humidity") {
              this.chartDataset.push(payload.relative_humidity);
            } else if (this.selectedParticulate === "Temperature") {
              this.chartDataset.push(payload.temperature);
            } else if (this.selectedParticulate === "PM2.5") {
              this.chartDataset.push(payload.mass_concentration_pm025);
            } else if (this.selectedParticulate === "PM10") {
              this.chartDataset.push(payload.mass_concentration_pm010);
            }
          });
        });
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
      formatDate(dateString) {
      const date = new Date(dateString);
      return format(date, "EEEE, dd MMM yyyy – HH:mm", { locale: enUS });
    },
      changeField(field_Id){
      const routeData = this.$router.resolve({
                    name: 'Dashboard',
                    params: {
                        fieldId: field_Id,
                    }
                });
                window.open(routeData.href, '_blank');
    },
    changeDevice(device_Id) {
            const selected = this.chosenField.find(device => device.id === device_Id);
        this.getUplink(selected.device_id);

        if (selected) {
          this.selectedDevice = selected;
          console.log("Selected Device:", this.selectedDevice);

          // Call loadEssentialParticulates after selecting a device
          this.loadEssentialParticulates();

          if (this.selectedDevice.latest_payload && this.selectedDevice.latest_payload.datetime) {
            const lastPayloadDate = new Date(this.selectedDevice.latest_payload.datetime);
            const timeSinceLastPayload = formatDistanceToNow(lastPayloadDate, { addSuffix: true });
            this.latestPayload = timeSinceLastPayload;
            console.log("Time since last payload:", timeSinceLastPayload);
          } else {
            console.log("No latest payload available");
          }
        } else {
          console.error("Device not found");
        }
      },
      async getUplink(device_id) {
        console.log("Device ID:", device_id);
            try {
                const startDate = this.startDate 
                ? format(this.startDate, 'yyyy-MM-dd') 
                : format(addDays(new Date(), -3), 'yyyy-MM-dd'); // Default to 3 days ago
      
                const endDate = this.endDate 
                ? format(this.endDate, 'yyyy-MM-dd') 
                : format(new Date(), 'yyyy-MM-dd'); // Default to today

                console.log("start date", startDate, "end date", endDate);

                const response = await this.$api.getUplinks({
                    start_date: startDate, // Format 3 days ago to yyyy-MM-dd, e.g. 2024-05-26
                    end_date: endDate, // Format today to yyyy-MM-dd, e.g. 2024-05-29
                    device_id: device_id,
                    load_payloads: 1,
                    per_page: 2
                });
                
                
                this.devicePayloads = response.data.data;
                
                } catch (error) {
                console.error('Error fetching uplink data:', error);
            }
      },
      async getData() {
                try {
                        
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
      async getFields() {
        try {
          console.log("Field ID:", this.fieldId);

          // Call the backend method with the fieldId and optional params (e.g., type, device_id)
          const response = await this.$api.getFields(this.fieldId, {
          });

          // Assuming 'data' contains the list of devices
          this.chosenField = response.data.data;
        } catch (error) {
          console.error("Error fetching field data:", error);
        }
      },
      async generateReport() {
        console.log("Generating report...");
        await this.getUplink(this.selectedDevice.device_id);
        this.processDataForTable();
        this.updateChartData();
      },
      processDataForTable() {
        this.tableData = [];

        // Loop through each date-specific array in devicePayloads
        this.devicePayloads.forEach(datePayload => {
          const date = datePayload.date;

          // Loop through each payload in the date-specific payloads array
          datePayload.payloads.forEach(payload => {
            const datetime = `${date} ${payload.time || ''}`.trim();

            // Push formatted data into tableData array
            this.tableData.push({
              datetime: datetime,
              co2: payload.co2_ppm,
              temperature: payload.temperature,
              humidity: payload.relative_humidity,
              pm25: payload.mass_concentration_pm025,
              pm10: payload.mass_concentration_pm010
            });
          });
        });
      },
      loadEssentialParticulates() {
        console.log("Loading essential particulates");
        if (this.selectedDevice && this.selectedDevice.latest_payload) {
          this.essentialParticulates = [
            { name: "PM10", value: "PM10" },
            { name: "PM2.5", value: "PM2.5" },
            { name: "CO2", value: "CO2" },
            { name: "Temperature", value: "Temperature" },
            { name: "Humidity", value: "Humidity" }
          ];
        }
      },
      selectParticulate(particulate) {
        this.selectedParticulate = particulate.value;
        this.updateChartData();
      },
      

    },
    

    created() {
        console.log("Field ID:", this.fieldId);
        console.log(this.selectedField);  // Log to verify it’s being set correctly
    }
};
</script>
