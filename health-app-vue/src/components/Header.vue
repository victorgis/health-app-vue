<template>
  <header>
    <div class="header-container">
      <div class="logo"><i class="fa-solid fa-suitcase"></i> Ops Management Portal</div>
      <div id="injectIcon" class="menu-button" @click="toggleMenu">
        <i class="fa-solid fa-bars"></i>
      </div>
      <ul class="menu" :class="{ open: isMenuOpen }">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <!-- <li><a href="#">Services</a></li> -->
        <li><a href="#">Contact</a></li>
        <!-- <li><a href="#" @click="loginModal">Login</a></li> -->
      </ul>
    </div>
  </header>
</template>
    
<script>
export default {
  name: 'HeaderVue',
  props: ['loginModal'],
  data() {
    return {
      isMenuOpen: false,
      isLoginOpen: false
    }
  },
  methods: {
    toggleMenu() {
      const icon = document.getElementById('injectIcon')
      icon.className = 'sizes'
      if (this.isMenuOpen == true) {
        icon.innerHTML = `<i class="fa-solid fa-bars"></i>`
        this.isMenuOpen = false
      } else {
        icon.innerHTML = `<i class="fa-solid fa-xmark"></i>`
        this.isMenuOpen = true
      }
    },
    loginModal() {
      this.isLoginOpen = true
      // this.$emit
      this.loginModal(this.isLoginOpen)
    }
  }
}
</script>
    
    <style scoped>
/* Add your styling here */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #2c3e50;
  color: #fff;
}

.menu-button {
  display: none;
  cursor: pointer;
}

.menu-button i {
  font-size: 24px;
}

.menu {
  list-style: none;
  display: flex;
}

.menu li {
  margin: 0 20px;
}

.menu a {
  text-decoration: none;
  color: #fff;
}

/* Media query for mobile responsiveness */
@media (max-width: 768px) {
  .menu-button {
    display: block;
  }

  .menu {
    border-radius: 10px;
    display: none;
    flex-direction: column;
    position: absolute;
    top: 45px;
    right: 15px;
    background-color: #2c3e50db;
    width: 150px;
    z-index: 1;
  }
  .menu li {
    padding: 10px 0;
    margin: 0 20px;
  }

  .menu.open {
    display: flex;
  }
  .sizes {
    font-size: 22px;
  }
}
</style>
    