<!-- PopupContent.vue -->
<template>
  <div class="popup-content">
    <h2>Place Details</h2>
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <td>{{ description.name }}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{{ description.email }}</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>{{ description.phone }}</td>
        </tr>
        <tr>
          <th>Longitude</th>
          <td>{{ description.longitude }}</td>
        </tr>
        <tr>
          <th>Latitude</th>
          <td>{{ description.latitude }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="editPlace">Edit</button>
    <button @click="deletePlace">Delete</button>
  </div>
</template>

<script>
export default {
  props: ['description'],
  methods: {
    editPlace() {
      // Handle edit button click
      console.log('Edit button clicked:', this.description)
    },
    deletePlace() {
      // Handle delete button click
      console.log('Delete button clicked:', this.description)
    }
  }
}
</script>

<style scoped>
.popup-content {
  /* Add scoped CSS styles here */
  background: red;
}
</style>
