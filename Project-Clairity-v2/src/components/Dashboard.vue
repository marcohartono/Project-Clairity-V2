<template>
  <main>
    <div id="main-content">
      <b-row>
        <b-col>
          <h1>Dashboard</h1>
          <h2 v-if="selectedField">Name: {{ selectedField.name }}</h2>
        </b-col>
        <b-col style="align-items: right">
          <b-dropdown id="dropdown-1" text="Choose a Location" class="m-md-2">
            <b-dropdown-item
              v-for="(field) in fields"
              @click="changeField(field.id)"
              >{{field.name}}</b-dropdown-item
            >
          </b-dropdown>
        </b-col>
      </b-row>
      <b-row v-if="selectedField">
        <GMapMap
          :center="{lat: Number(selectedField.latitude) , lng: Number(selectedField.longitude)}"
          :zoom="21"
          map-type-id="terrain"
          :styles="mapStyles"
          style="height: 362px; width: 100%"
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
        <b-col md="1">
          <h2>Section</h2>
        </b-col>
        <b-col md="11">
          <b-dropdown text="Block Level Dropdown Menu">
            <b-dropdown-item
              @click="changeDevice(device?.id)"
              v-for="(device) in devices"
              >{{device.name}}</b-dropdown-item
            >
          </b-dropdown>
        </b-col>
      </b-row>
      <b-row v-if="selectedDevice && latestPayload">
        <div class="container border p-3 mt-3">
          <!-- Header Row -->
          <div class="row align-items-center">
            <div class="col">
              <h6 class="text-muted">Device</h6>
            </div>
            <div class="col text-end">
              <span
                class="badge bg-danger rounded-pill"
                >{{ latestPayload }}</span
              >
            </div>
          </div>

          <!-- Table Structure -->
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

      <b-row>
        <div class="container border p-3" v-if="selectedDevice">
          <!-- Header Row -->
          <div class="row align-items-center">
            <div class="col">
              <h6 class="text-muted">LATEST DATA</h6>
            </div>
            <div class="col text-end">
              <small
                class="text-muted"
                >{{ formatDate(selectedDevice.latest_payload.datetime)}}</small
              >
            </div>
          </div>

          <!-- Data Row -->
          <div class="row mt-3">
            <!-- Indoor AQI -->
            <div class="col-3">
              <div class="p-3 bg-info text-white text-center rounded">
                <div class="h6">INDOOR AQI</div>
                <div class="h5">
                  {{evaluateCO2(selectedDevice.latest_payload.co2_ppm)}}
                </div>
              </div>
            </div>

            <!-- Temperature -->
            <div class="col-3 text-center">
              <div class="h6">
                TEMPERATURE
                <small>°C</small>
              </div>
              <div class="h3">
                {{selectedDevice.latest_payload.temperature}}
              </div>
            </div>

            <!-- PM2.5 -->
            <div class="col-3 text-center">
              <div class="h6">
                PM2.5
                <small>µg/m³</small>
              </div>
              <div class="h3">
                {{selectedDevice.latest_payload.mass_concentration_pm025}}
              </div>
            </div>
          </div>

          <!-- CO₂, Humidity, PM1.0 Row -->
          <div class="row mt-3">
            <!-- CO₂ -->
            <div class="col-4 text-center">
              <div class="h6">
                CO₂
                <small>PPM</small>
              </div>
              <div class="h3">{{selectedDevice.latest_payload.co2_ppm }}</div>
            </div>

            <!-- Humidity -->
            <div class="col-4 text-center">
              <div class="h6">
                HUMIDITY
                <small>%</small>
              </div>
              <div class="h3">
                {{selectedDevice.latest_payload.relative_humidity }}
              </div>
            </div>

            <!-- PM1.0 -->
            <div class="col-4 text-center">
              <div class="h6">
                PM1.0
                <small>µg/m³</small>
              </div>
              <div class="h3">
                {{selectedDevice.latest_payload.mass_concentration_pm010 }}
              </div>
            </div>
          </div>
        </div>
      </b-row>
      <b-row>
        <div>
          <b-row>
            <b-col>
              <label for="startDate" class="form-label">Start Date</label>
              <div class="input-group">
                <input
                  type="text"
                  id="startDate"
                  class="form-control"
                  placeholder="Select Start Date"
                  ref="startDatePicker"
                />
                <span class="input-group-text"
                  ><i class="bi bi-calendar"></i
                ></span>
              </div>
            </b-col>
            <b-col> </b-col>
            <b-col> </b-col>
            <b-col> </b-col>
            <b-col> </b-col>
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
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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
      latestPayload: null,
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
    excelData() {
      return this.devices
    }
  },
  mounted() {
    this.getData();
    flatpickr(this.$refs.startDatePicker, {
      enableTime: true,
      dateFormat: "d M Y H:i"
    });
    flatpickr(this.$refs.endDatePicker, {
      enableTime: true,
      dateFormat: "d M Y H:i"
    });
  },
  methods: {
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
    changeField(field_Id) {
      const routeData = this.$router.resolve({
        name: 'Dashboard',
        params: {
        fieldId: field_Id,
      }});
      window.open(routeData.href, '_blank');
    },
    changeDevice(device_Id) {
      const selected = this.devices.find(device => device.id === device_Id);
      if (selected) {
        this.selectedDevice = selected;
        console.log("Selected Device:", this.selectedDevice);
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
