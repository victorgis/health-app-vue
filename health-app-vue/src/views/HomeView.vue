<template>
  <div class="parent">
    <Header :loginModal="loginModal" />
    <div v-if="isLoading">
      <Loading />
    </div>

    <!-- Edit Modal  -->
    <div v-if="showEditModal" class="edit-modal-position">
      <EditModal :closeModal="closeModal" :individualHospital="individualHospital" />
    </div>

    <!-- Delete Modal  -->
    <div v-if="showDeleteModal" class="edit-modal-position">
      <DeleteModal :closeModal="closeModal" :individualHospital="individualHospital" />
    </div>

    <div class="main">
      <div id="map"></div>

      <div v-if="showLoginModal" class="login-modal">
        <LoginModal />
      </div>

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
      <!-- <TestPoints :map="map" /> -->
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import mapboxgl from 'mapbox-gl'
import Loading from '@/components/Loader.vue'
import axios from 'axios'
import LoginModal from '../modals/LoginModal.vue'
import EditModal from '../modals/EditModal.vue'
import DeleteModal from '../modals/DeleteModal.vue'

export default {
  name: 'HealthAppVueHomeView',
  components: { Header, Footer, Loading, LoginModal, EditModal, DeleteModal },
  // props: ['modelValue'],
  data() {
    return {
      individualHospital: {},
      showLoginModal: false,
      showEditModal: false,
      showDeleteModal: false,
      map: null,
      geocoder: null,
      isLoading: false,
      isHospitalForm: false,
      coordinates: {
        longitude: '',
        latitude: ''
      },
      reload: {
        longitude: '',
        latitude: '',
        zoom: ''
      },
      hospital: {
        name: '',
        email: '',
        phone: ''
      },
      zoom: 5,
      location: {
        lng: 9.354,
        lat: 8.2446,
        zoom: 5
      },
      allHospitals: {}
    }
  },

  mounted() {
    this.getAllLayers()
    this.mapBoxApp()
    this.reloadCoord()
  },
  methods: {
    async getAllLayers() {
      const { data } = await axios.get('https://health-app-vue.onrender.com/api/data')
      this.allHospitals = data.data

      this.$watch('allHospitals', async (newValue, oldValue) => {
        if (newValue !== oldValue) {
          console.log('Data has changed. Reloading...')

          this.mapBoxApp()
        }
      })
    },
    closeModal(response) {
      this.showEditModal = response
      this.showDeleteModal = response
      this.location.lng = this.individualHospital.longitude
      this.location.lat = this.individualHospital.latitude
      this.location.zoom = this.zoom
      this.individualHospital = ''
      this.getAllLayers()
    },
    loginModal(data) {
      this.showLoginModal = data
    },
    getLocation() {
      // this.location.lng = 9.354
      // this.location.lat = 8.2446
      // this.location.zoom = 5
      // this.mapBoxApp()

      window.location.reload()
    },
    reloadCoord() {
      this.map.on('click', (e) => {
        this.reload.longitude = e.lngLat.lng
        this.reload.latitude = e.lngLat.lat
        this.reload.zoom = e.target.style.z
      })
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
        for (const key in this.hospital) {
          if (!this.hospital[key]) {
            this.$toast.error('Kindly fill in all fields!')
            return
          }
        }
        for (const key in this.coordinates) {
          if (!this.coordinates[key]) {
            this.$toast.error('Click on the map to get accurate coordinates')
            return
          }
        }

        this.isLoading = true
        const data = await axios.post('https://health-app-vue.onrender.com/api/data', result)
        const status = data.status
        if (status == 201) {
          this.$toast.success('Hospital added successfully!')
        }

        // resetting the forms to empty
        for (const key in this.hospital) {
          this.hospital[key] = ''
        }
        for (const key in this.coordinates) {
          this.coordinates[key] = ''
        }

        // closing forms after submissionƒ
        document.getElementById('addHospitalCheckbox').checked = false
        this.isHospitalForm = false

        this.location.lng = result.longitude
        this.location.lat = result.latitude
        this.location.zoom = this.reload.zoom

        this.getAllLayers()

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
      // this.location.lng = this.individualHospital.longitude
      //   ? this.individualHospital.longitude
      //   : 9.354
      // this.location.lat = this.individualHospital.latitude
      //   ? this.individualHospital.latitude
      //   : 8.2446

      mapboxgl.accessToken =
        'pk.eyJ1IjoidmVlc3BhdGlhbCIsImEiOiJjbHJxbXpkZWkwNDRlMmluenlnd2E4Mm9tIn0.2zBcvY3IMGRN2tS7kU5rNg'
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
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
          data: this.allHospitals
        })
        this.map.addLayer({
          id: 'places',
          source: 'places',
          type: 'circle',
          paint: {
            'circle-radius': 10,
            'circle-color': '#448ee4',
            'circle-outline': 2
          }
        })

        // this.map.addLayer({
        //   id: 'places',
        //   type: 'symbol',
        //   source: 'places',
        //   layout: {
        //     'icon-image': ['get', 'icon'],
        //     'icon-allow-overlap': true
        //   }
        // })

        this.geocoder.on('result', (event) => {
          this.map.getSource('places').setData(event.result.geometry)
        })

        this.map.on('click', 'places', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice()
          const description = e.features[0].properties
          this.individualHospital = e.features[0].properties
          this.zoom = e.features[0]._z

          const html = `<h3>${description.name} Popup</h3>
                <hr>
                <table>
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <td>${description.name}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>${description.email}</td>
                        </tr>
                        <tr>
                            <th>Phone:</th>
                            <td>${description.phone}</td>
                        </tr>
                        <tr>
                            <th>Longitude:</th>
                            <td>${description.longitude}</td>
                        </tr>
                        <tr>
                            <th>Latitude:</th>
                            <td>${description.latitude}</td>
                        </tr>
                    </tbody>
                </table>
                <hr>
                <div class="align-center">
                  <small><i>log in to <b>edit</b> or <b>delete</b></i></small>
                  <div>
                    <button name="button" id="popup-button">Edit me</button>
                    <button class="popup-button" id="popup-button" name="button">Delete me</button>
                  </div>
                </div>

            `

          const div = document.createElement('div')
          div.innerHTML = html

          const editBtn = div.children[4].children[1].children[0]
          const deleteBtn = div.children[4].children[1].children[1]

          editBtn.addEventListener('click', () => {
            this.showEditModal = true
          })
          deleteBtn.addEventListener('click', () => {
            this.showDeleteModal = true
          })

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }
          const popups = new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setDOMContent(div)
            .addTo(this.map)
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
  },
  watch: {}
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

template {
  text-align: left;
}
.edit-modal-position {
  position: relative;
}
</style>