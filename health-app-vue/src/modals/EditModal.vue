<template>
  <div class="edit-modal-parent">
    <div class="edit-modal">
      <div class="x-close">
        <i @click="closeModalFx" class="fa-solid fa-square-xmark"></i>
      </div>
      <hr />
      <form @submit="formData($event)" method="PATCH">
        <label for="name">Hopsital Name</label>
        <input type="text" name="name" v-model="edit.name" />
        <label for="email">Email</label>
        <input type="email" name="email" v-model="edit.email" />
        <label for="phone">Phone Number</label>
        <input type="text" name="phone" v-model="edit.phone" />
        <button type="submit" class="modal-btn">Save Edits</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HealthAppVueEditModal',
  props: ['closeModal', 'individualHospital'],
  data() {
    return {
      closeModalState: false,
      edit: {
        name: this.individualHospital.name,
        email: this.individualHospital.email,
        phone: this.individualHospital.phone
      }
    }
  },

  mounted() {
    // console.log('individualHospital', this.individualHospital)
  },

  methods: {
    async formData(e) {
      e.preventDefault()
      const payload = {
        name: this.edit.name,
        phone: this.edit.phone,
        email: this.edit.email
      }

      try {
        const result = await axios.patch(`https://health-app-vue.onrender.com/api/data/${this.individualHospital.id}`, payload)
        const status = result.status
        if (status == 200) {
          console.log("successful")
          this.$toast.success('Hospital added successfully!')
          this.closeModalFx()
        }
      } catch (error) {
        console.log(error)
      }

      // console.log('here', e.target.value)
    },
    closeModalFx() {
      this.closeModal(this.closeModalState)
    }
  }
}
</script>

<style scoped>
.edit-modal-parent {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent black background */
  z-index: 1000;
}
.edit-modal {
  background: #2c3e50c9;
  text-align: left;
  display: block;
  position: absolute;
  padding: 25px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f1faee;
  /* width: 120px; */
  margin: 0px auto;
}

form {
  display: grid;
}
.x-close {
  text-align: right;
}
.x-close i {
  font-size: 16px;
  color: #e63946;
}
.modal-btn {
  margin: 10px 0;
  text-align: center;
  border: none;
  color: #f1faee;
  background: #457b9d;
  border-radius: 5px;
  padding: 10px 20px;
}
input {
  margin: 10px 0;
}
</style>