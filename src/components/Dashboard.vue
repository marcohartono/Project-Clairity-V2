<template>
    <main>
      <div id="main-content">
          <b-row>
            <b-col>
              <h1 >Dashboard</h1>
              <h2 v-if="selectedField">Name: {{ selectedField.name }}</h2>
            
            </b-col>
            <b-col style="align-items: right;">

              <div class="form-group">
                <label for="area">Area</label>
                <select v-model="area" v-if="fields.length" @change="handleFieldChange">
                  <option value="" disabled>Select Location</option>
                  <option v-for="field in fields" :key="field.id" :value="field.id">
                    {{ field.name }}
                  </option>
                </select>

              </div>
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
            <b-col> 
              <!-- <b-dropdown text="Select a Location">
                <b-dropdown-item @click="changeDevice(device?.devices[0])" v-for="(device) in chosenField?.blocks">{{device.name}}</b-dropdown-item>
              </b-dropdown> -->

              <div class="form-group">
                <label for="area">Section</label>
                <select v-model="selectedDeviceId" v-if="fields.length" @change="handleDeviceChange">
                  <option value="" disabled>Select Location</option>
                  <option 
                    v-for="(device, index) in chosenField?.blocks" 
                    :key="index" 
                    :value="device.devices[0]">
                    {{ device.name }}
                  </option>
                </select>

              </div>
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
                  <b-button @click="downloadData" >Download</b-button>
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
                <Chart v-if="!chartLoading" :data="chartData" /> 
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
import '@vuepic/vue-datepicker/dist/main.css';
// import { get } from 'bootstrap-vue-next/dist/src/utils';
import Chart from '@/components/Chart.vue';
import { utils,writeFile } from "xlsx";




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
            area: '', 
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
            chartLoading: false,
            selectedDeviceId: "",
            

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
    this.getFields().then(() => {
      
    if (this.chosenField.blocks[0].devices[0]) {
      this.changeDevice(this.chosenField.blocks[0].devices[0]);
    } else {
      console.error("No devices available to select.");
    }
  });
    
    },
    methods:
    { 
      handleDeviceChange() {
        const selectedDevice = this.selectedDeviceId;
        if (selectedDevice) {
          this.changeDevice(selectedDevice);
        } else {
          console.error("Selected device not found");
        }
      },
      handleFieldChange() {
        if (this.area) {
          this.changeField(this.area);
        }
      },
      changeField(fieldId) {
        const routeData = this.$router.resolve({
          name: 'Dashboard',
          params: { fieldId },
        });
        window.open(routeData.href, '_blank');
      },
      updateChartData() {
        console.log("Updating chart data...");
        this.chartLoading = true;

        const rawData = this.devicePayloads;

        // Compress data to fit 100 points
        const step = Math.ceil(rawData.length / 100); // Calculate step size
        const compressedData = rawData.filter((_, index) => index % step === 0);

        // Reset labels and dataset
        this.chartLabels = [];
        this.chartDataset = [];

        compressedData.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Generate labels and data based on the selected particulate
        compressedData.forEach(datePayload => {

          datePayload.payloads.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

          datePayload.payloads.forEach(payload => {
            // Combine date and time
            const datetime = payload.datetime
            const formattedDatetime = format(
              new Date(datetime),
              "yyyy-MM-dd HH:mm" // Include both date and time
            );
            
            // Add formatted datetime to labels
            this.chartLabels.push(formattedDatetime);

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

        // Stop loading after a brief delay
        setTimeout(() => {
          this.chartLoading = false;
        }, 1);
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
  // Check if dateString is valid
  if (!dateString) {
    console.error("Invalid dateString:", dateString);
    return "Invalid Date";
  }

  // Convert the input string to a valid Date object
  const parsedDate = new Date(dateString);

  // Validate if the parsing worked
  if (isNaN(parsedDate.getTime())) {
    console.error("Failed to parse date:", dateString);
    return "Invalid Date";
  }

  // Format the parsed date into 'yyyy-MM-dd HH:mm'
  return format(parsedDate, 'yyyy-MM-dd HH:mm');
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
    changeDevice(device) {
            const selected = device;
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
          const response = await this.$api.getFieldDetail(this.fieldId, {
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


          // Loop through each payload in the date-specific payloads array
          datePayload.payloads.forEach(payload => {
            const datetime = payload.datetime
            console.log("Datetime:", datetime);
            const formattedDatetime = format(
              new Date(datetime),
              "yyyy-MM-dd HH:mm" // Include both date and time
            );
            // Push formatted data into tableData array
            this.tableData.push({
              datetime: formattedDatetime,
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
      downloadData() {
      // Format current date for filename
      const now = format(new Date(), 'yyyy-MM-dd_HH-mm');

      // Convert `tableData` to worksheet format with appropriate headers
      const worksheet = utils.json_to_sheet(this.tableData.map(data => ({
        'Datetime': data.datetime,
        'CO2 (ppm)': data.co2,
        'Temperature (°C)': data.temperature,
        'Humidity (%)': data.humidity,
        'PM2.5 (µg/m³)': data.pm25,
        'PM10 (µg/m³)': data.pm10
      })));

      // Create a new workbook and append the worksheet
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, 'Devices');

      // Write the workbook to a CSV file
      writeFile(workbook, `Devices_Report_${now}.csv`, { bookType: 'csv', compression: true });
    },
      

    },
    

    created() {
        console.log("Field ID:", this.fieldId);
        console.log(this.selectedField);  // Log to verify it’s being set correctly
    }
};
</script>


<style scoped>
#main-content {
  padding: 20px;
  background-color: white; /* Light green background */
  font-family: Arial, sans-serif;
}

/* Title Styling */
h1 {
  font-size: 2em;
  font-weight: bold;
  color: #333;
}

h2 {
  font-size: 1.2em;
  font-weight: bold;
  color: #5c8e50; /* Green color for headings */
  margin-top: 10px;
}

/* Dropdown styling */
b-dropdown {
  display: inline-block;
  font-size: 1em;
  color: #333;
}

b-dropdown-item {
  font-size: 1em;
  color: #333;
}

/* Map container styling */
.gmap {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Container for sections and tables */
.container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 15px;
}

/* Section Header Styling */
.text-muted {
  color: #555;
}

.border {
  border: 1px solid #e0e0e0;
}

/* Latest Data Styling */
.container .row {
  margin-bottom: 15px;
}

.container .text-center {
  font-weight: bold;
  font-size: 1.2em;
  color: #333;
}

.bg-info {
  background-color: #6cb9b3 !important; /* Teal color */
}

.container .badge {
  font-size: 0.8em;
}

/* Data Boxes Styling */
.data-box {
  background-color: #e0f2f1;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  color: #5c8e50;
}

/* Individual Stat Boxes */
.col-3 .h6, .col-4 .h6 {
  color: #555;
  font-weight: bold;
}

.col-3 .h3, .col-4 .h3 {
  font-size: 1.8em;
  color: #333;
}

.col-3 .p-3, .col-4 .p-3 {
  background-color: #6cb9b3; /* Teal background for indoor AQI */
  color: white;
  border-radius: 12px;
}

/* Button Styling */
b-button {
  background-color: #5c8e50;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  border-radius: 8px;
  margin-top: 15px;
  transition: background-color 0.3s;
}

b-button:hover {
  background-color: #4c7a40;
}

/* Date Picker and Dropdown */
label {
  font-weight: bold;
  color: #5c8e50;
}

.vue-datepicker {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px 10px;
}

/* Chart Styling */
.chart-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chart-container .chart {
  width: 100%;
  height: 300px;
}

/* Table Styling */
b-table {
  margin-top: 15px;
  font-size: 0.9em;
}

.table-responsive {
  margin-top: 15px;
}

.table-bordered th, .table-bordered td {
  border: 1px solid #ddd;
  text-align: center;
  padding: 8px;
}

.table-bordered th {
  background-color: #e0f2f1;
  color: #333;
}

.table-bordered td {
  background-color: #fff;
  color: #555;
}

.form-group {
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

</style>