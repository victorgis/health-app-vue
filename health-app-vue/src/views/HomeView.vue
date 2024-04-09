<template>
  <div class="parent">
    <Header />
    <div v-if="isLoading">
      <Loading />
    </div>
    <div class="main">
      <div id="map"></div>

      <!-- Home button  -->
      <div @click="getLocation" class="homeBtn">
        <span><i class="fa-solid fa-house"></i></span>
      </div>

      <!-- Form  -->
      <div class="addHospitalContainer">
        <div class="addHospital">
          <p><i class="fa-solid fa-house-medical-flag"></i></p>
          <label className="switch">
            <input type="checkbox" @change="handleToggle" id="addHospitalCheckbox" />
            <span className="slider round"></span>
          </label>

          <!-- Adding the form  -->
          <div v-if="isHospitalForm" class="hospitalForm">
            <form action="" @submit="handleForm" class="form" id="addHospitalForm">
              <div class="form-container">
                <div style="text-align: right">
                  <span class="close-x" @click="closeForm"
                    ><i class="fa-solid fa-rectangle-xmark"></i
                  ></span>
                </div>
                <p><b>Add Hospital Form</b></p>
                <input
                  type="text"
                  placeholder="Enter hospital name"
                  name="hospital"
                  id=""
                  v-model="hospital.name"
                  class="form-input"
                />
                <input
                  type="email"
                  placeholder="Enter email address"
                  name="email"
                  id=""
                  v-model="hospital.email"
                  class="form-input"
                />
                <input
                  type="tel"
                  placeholder="Enter hospital tel+"
                  name="phone"
                  id=""
                  v-model="hospital.phone"
                  class="form-input"
                />
                <input
                  type="text"
                  name="latitude"
                  placeholder="Tap the map to autofill"
                  id=""
                  v-model="coordinates.longitude"
                  class="form-input"
                />
                <input
                  type="text"
                  name="latitude"
                  placeholder="Tap on the map to autofill"
                  id=""
                  v-model="coordinates.latitude"
                  class="form-input"
                />
                <button type="submit" class="addHospital-btn" name="button">Add Hospital</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <TestPoints :map="map" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import mapboxgl from 'mapbox-gl'
import Loading from '@/components/Loader.vue'
import TestPoints from '../layers/test-point.vue'
import axios from 'axios'

export default {
  name: 'HealthAppVueHomeView',
  components: { Header, Footer, Loading, TestPoints },
  // props: ['modelValue'],
  data() {
    return {
      // show: false,
      map: null,
      geocoder: null,
      isLoading: false,
      isHospitalForm: false,
      coordinates: {
        longitude: '',
        latitude: ''
      },
      hospital: {
        name: '',
        email: '',
        phone: ''
      },
      location: {
        lng: 9.354,
        lat: 8.2446,
        zoom: 5
      }
    }
  },

  mounted() {
    this.mapBoxApp()
  },
  methods: {
    getLocation() {
      this.mapBoxApp()
    },
    closeForm() {
      this.isHospitalForm = false
      document.getElementById('addHospitalCheckbox').checked = false
    },

    handleToggle(event) {
      const isChecked = event.target.checked
      if (isChecked) {
        this.isHospitalForm = true
        // location of mouse click.
        this.map.on('click', (e) => {
          this.coordinates.longitude = e.lngLat.lng
          this.coordinates.latitude = e.lngLat.lat
          console.log(this.coordinates)
        })
      } else {
        this.isHospitalForm = false
        this.coordinates.longitude = ''
        this.coordinates.latitude = ''
      }
    },

    async handleForm(e) {
      e.preventDefault()

      const result = {
        name: this.hospital.name,
        email: this.hospital.email,
        phone: this.hospital.phone,
        longitude: this.coordinates.longitude,
        latitude: this.coordinates.latitude
      }

      try {
        // Testing for empty forms
        // for (const key in this.hospital) {
        //   if (!this.hospital[key].trim()) {
        //     this.$toast.error('Kindly fill in all fields!')
        //     return
        //   }
        // }
        // for (const key in this.coordinates) {
        //   if (!this.coordinates[key].trim()) {
        //     this.$toast.error('Click on the map to get accurate coordinates')
        //     return
        //   }
        // }

        // running the loader
        this.isLoading = true
        const { data } = await axios.post('/api/data', result)
        console.log('response from the back to the front', data.data)
        this.$toast.success('Hospital added successfully!')

        // resetting the forms to empty
        for (const key in this.hospital) {
          this.hospital[key] = ''
        }
        for (const key in this.coordinates) {
          this.coordinates[key] = ''
        }

        // closing forms after submission
        document.getElementById('addHospitalCheckbox').checked = false
        this.isHospitalForm = false
        this.isLoading = false
      } catch (error) {
        this.$toast.error('An error occured!s')
        this.isLoading = false
        // Reload the current page
        // window.location.reload()

        console.log(error)
      }
    },
    mapBoxApp() {
      // const { lng, lat, zoom, bearing, pitch } = this.modelValue
      mapboxgl.accessToken =
        'pk.eyJ1IjoidmVlc3BhdGlhbCIsImEiOiJjbHJxbXpkZWkwNDRlMmluenlnd2E4Mm9tIn0.2zBcvY3IMGRN2tS7kU5rNg'
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.location.lng, this.location.lat], // starting position [lng, lat]
        zoom: this.location.zoom // starting zoom
      })

      this.geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        // marker: false
      })

      this.map.on('load', () => {
        this.map.addSource('places', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  name: 'Sam',
                  area: 64,
                  description: 'This is a town',
                  icon: 'theatre'
                },
                geometry: {
                  coordinates: [8.084942202848993, 4.776192184612867],
                  type: 'Point'
                }
              },
              {
                type: 'Feature',
                properties: {
                  name: 'Abang',
                  area: 25,
                  description: 'This is a village',
                  icon: 'theatre'
                },
                geometry: {
                  coordinates: [7.6949275544108104, 4.798088191650336],
                  type: 'Point'
                }
              },
              {
                type: 'Feature',
                properties: {
                  name: 'Uyo',
                  area: 34,
                  description: 'This is a town',
                  icon: 'theatre'
                },
                geometry: {
                  coordinates: [7.623516421598055, 5.041633177074289],
                  type: 'Point'
                }
              }
            ]
          }
        })
        this.map.addLayer({
          id: 'point',
          source: 'places',
          type: 'circle',
          paint: {
            'circle-radius': 10,
            'circle-color': '#448ee4'
            // 'circle-outline': 2
          }
        })
        // this.geocoder.on('result', (event) => {
        //   this.map.getSource('places').setData(event.result.geometry)
        // })

        this.map.on('click', 'places', (e) => {
          console.log('e', e)
          const coordinates = e.features[0].geometry.coordinates.slice()
          const description = e.features[0].properties

          // rr.addEventListener("click", (()=>console.log("I got here")))

          const html = `<h2>Simple HTML Table</h2>

                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>${description.name}</td>
                        </tr>
                        <tr>
                            <th>Area</th>
                            <td>${description.area}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>${description.description}</td>
                        </tr>
                    </tbody>
                </table>

                <button name="button" id="popup-button">Click me</button>
            `

          // const rr = document.getElementById("popup-button");

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }
          const rrs = new mapboxgl.Popup().setLngLat(coordinates).setHTML(html).addTo(this.map)
          console.log('rrs', rrs)
        })
      })

      // Adding to the map
      this.map.addControl(new mapboxgl.NavigationControl())
      this.map.addControl(this.geocoder)
      this.map.on('mouseenter', 'places', () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      this.map.on('mouseleave', 'places', () => {
        this.map.getCanvas().style.cursor = ''
      })
    }
  }
}
</script>

<style scoped>
@import url('mapbox-gl/dist/mapbox-gl.css');

#map {
  position: relative;
  height: calc(100vh - 168px); /* Subtract header and footer heights */
  width: 100%;
}
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 13px;
  width: 13px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.homeBtn {
  cursor: pointer;
  padding: 10px;
  background: #fff;
  position: absolute;
  top: 237px;
  right: 10px;
  border-radius: 3px;
}

.addHospitalContainer {
  position: absolute;
  top: 300px;
  right: 10px;
}

.addHospital {
  background: #fff;
  padding: 5px;
  padding-bottom: 10px;
  border-radius: 5px;
}

.hospitalForm {
  top: 0;
  right: 60px;
  position: absolute;
}

.form {
  display: flex;
  flex-direction: column;
}
.form-container {
  background: #fff;
  padding: 20px;
  overflow-y: auto;
}

input.form-input {
  width: 200px;
}

/* Media query for mobile responsiveness */
@media (max-width: 768px) {
  .form-container {
    height: 250px;
  }
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* width: 100%; */
  margin: 5px 0;
  box-sizing: border-box;
}

/* Additional styling for focus or hover states */
.form-input:focus {
  outline: none;
  border-color: #007bff; /* Change the color when the input is focused */
}

button.addHospital-btn {
  color: #fff;
  padding: 7px 20px;
  margin: 20px 0;
  background: #2196f3;
  border: 1px #2196f3 solid;
  border-radius: 5px;
}

button.addHospital-btn:hover {
  background: #67afea;
  border: 1px #67afea solid;
  cursor: pointer;
}

.close-x {
  cursor: pointer;
}
</style>