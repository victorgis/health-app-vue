<template>
  <footer>
    <!-- <div class="footer-container">
      <div class="footer-links">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </div> -->
    <!-- <div class="social-media">
      <a href="https://twitter.com/victor_gis"><i class="fa fa-twitter" aria-hidden="true"></i></a>
      <a href="https://www.linkedin.com/in/victoressang/"
        ><i class="fa fa-linkedin" aria-hidden="true"></i
      ></a>
      <a href="https://github.com/victorgis"><i class="fa fa-github" aria-hidden="true"></i></a>
      <a href="https://medium.com/@victorgis"><i class="fa fa-medium" aria-hidden="true"></i></a>
      <a href="https://www.youtube.com/@victoressang"
        ><i class="fa fa-youtube" aria-hidden="true"></i
      ></a>
      <a href="https://veespatial.netlify.app/"><i class="fas fa-globe-africa"></i></a>
    </div> -->
    <div>
      <p>
        <i class="fa fa-copyright" aria-hidden="true"></i> 2024 Victor Essang. All Rights
        Reserved.
      </p>
    </div>
  </footer>
</template>
    
    <script>
export default {
  name: 'FooterVue'
  // You can add any logic or data properties specific to your footer here.
}
</script>
    
    <style scoped>
/* Add your styling for the footer here */
footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  /* position: absolute;
  bottom: 0;
  width: 100%; */
}

.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-logo {
  font-size: 24px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  display: inline-block;
  margin: 0 10px;
}

.footer-links a {
  text-decoration: none;
  color: #fff;
}

.social-media i {
  padding: 0 10px;
}
.social-media i:hover {
  color: rgba(187, 187, 187, 0.865);
}

/* Add additional styles as needed */
</style>
    