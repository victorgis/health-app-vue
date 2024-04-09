<template>
  <div></div>
</template>

<script>
export default {
  name: 'HealthAppVueTestPoint',
  props: ['map'],
  data() {
    return {
      //   map: this.map
    }
  },

  mounted() {
    this.addPoint()
  },
  created() {},

  methods: {
    addPoint() {
      console.log('map', this.map)
        // this.map.on('load', () => {
        //   this.map.addSource('places', {
        //     type: 'geojson',
        //     data: {
        //       type: 'FeatureCollection',
        //       features: [
        //         {
        //           type: 'Feature',
        //           properties: {
        //             name: 'Sam',
        //             area: 64,
        //             description: 'This is a town',
        //             icon: 'theatre'
        //           },
        //           geometry: {
        //             coordinates: [8.084942202848993, 4.776192184612867],
        //             type: 'Point'
        //           }
        //         },
        //         {
        //           type: 'Feature',
        //           properties: {
        //             name: 'Abang',
        //             area: 25,
        //             description: 'This is a village',
        //             icon: 'theatre'
        //           },
        //           geometry: {
        //             coordinates: [7.6949275544108104, 4.798088191650336],
        //             type: 'Point'
        //           }
        //         },
        //         {
        //           type: 'Feature',
        //           properties: {
        //             name: 'Uyo',
        //             area: 34,
        //             description: 'This is a town',
        //             icon: 'theatre'
        //           },
        //           geometry: {
        //             coordinates: [7.623516421598055, 5.041633177074289],
        //             type: 'Point'
        //           }
        //         }
        //       ]
        //     }
        //   })
        //   this.map.addLayer({
        //     id: 'places',
        //     type: 'symbol',
        //     source: 'places',
        //     layout: {
        //       'icon-image': ['get', 'icon'],
        //       'icon-allow-overlap': true
        //     }
        //   })

        //   this.map.on('click', 'places', (e) => {
        //     const coordinates = e.features[0].geometry.coordinates.slice()
        //     const description = e.features[0].properties

        //     // rr.addEventListener("click", (()=>console.log("I got here")))

        //     const html = `<h2>Simple HTML Table</h2>

        //         <table>
        //             <tbody>
        //                 <tr>
        //                     <th>Name</th>
        //                     <td>${description.name}</td>
        //                 </tr>
        //                 <tr>
        //                     <th>Area</th>
        //                     <td>${description.area}</td>
        //                 </tr>
        //                 <tr>
        //                     <th>Description</th>
        //                     <td>${description.description}</td>
        //                 </tr>
        //             </tbody>
        //         </table>

        //         <button name="button" id="popup-button">Click me</button>
        //     `

        //     // const rr = document.getElementById("popup-button");

        //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        //     }
        //     const rrs = new mapboxgl.Popup().setLngLat(coordinates).setHTML(html).addTo(this.map)
        //     console.log(rrs)
        //   })

        //   this.map.on('mouseenter', 'places', () => {
        //     this.map.getCanvas().style.cursor = 'pointer'
        //   })
        //   this.map.on('mouseleave', 'places', () => {
        //     this.map.getCanvas().style.cursor = ''
        //   })
        // })
    }
  }
}
</script>

<style scoped>
</style>