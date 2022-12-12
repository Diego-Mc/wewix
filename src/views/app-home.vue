<template>
  <main class="homepage">
    <div class="header-container">
      <app-header />
    </div>
    <section class="hero" id="home">
      <h1>The <span>modern</span> way to<br />build websites</h1>
      <p>
        The wewix website builder is a no-code rubust website builder, built
        with the user’s exprience in mind.
        <svg
          class="decor"
          width="65"
          height="195"
          viewBox="0 0 65 195"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.0002 193L16.5002 167.5"
            stroke="#EEEEEE"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M42.4583 182.302L16.0372 193.081"
            stroke="#EEEEEE"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M23.4517 2C47.017 29.8056 78.7911 106.675 17.3651 191.711"
            stroke="#EEEEEE"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </p>
      <button @click="$router.push('/templates')">Get Started</button>

      <div class="img-container">
        <img
          src="https://res.cloudinary.com/wewix/image/upload/v1670844938/hero-img-final_yrcer9.png"
          alt="hero-img" />
      </div>
    </section>
    <section class="features" id="features">
      <div class="title-wrapper">
        <h2>We have a ton of features for giving</h2>
        <h2>you the best experience</h2>
        <svg
          class="decor"
          width="306"
          height="18"
          viewBox="0 0 306 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 12.0001C73.6667 5.66679 232.5 -3.19987 302.5 12.0001"
            stroke="#00C2A6"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M3.00001 11.834C78.5969 6.37402 245.763 -2.39233 301.5 14.5"
            stroke="#00C2A6"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M301.5 14.5L302.5 12"
            stroke="#00C2A6"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <!-- <svg
          class="decor"
          width="306"
          height="20"
          viewBox="0 0 306 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 12C73.6667 5.66667 232.5 -3.19999 302.5 12"
            stroke="#00C2A6"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M2.99996 11.8339C78.5968 6.37388 245.762 -0.392276 301.5 16.5"
            stroke="#00C2A6"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg> -->
      </div>
      <!-- TODO: Add features as draggables, could be cool -->
      <section class="cards">
        <article class="card">
          <i class="bi bi-arrows-move"></i>
          <h3>Draggable Components</h3>
          <p>Everything is draggable and easy to use.</p>
        </article>
        <article class="card">
          <i class="bi bi-cast"></i>
          <h3>Publish your website</h3>
          <p>Get your own custom domain to send to your customers.</p>
        </article>
        <article class="card">
          <i class="bi bi-braces-asterisk"></i>
          <h3>No-Code</h3>
          <p>
            Our builder is fit for anyone, you don’t need to write a single line
            of code.
          </p>
        </article>
        <article class="card">
          <i class="bi bi-chat-left-dots"></i>
          <h3>Costumers instant-chat</h3>
          <p>
            Add a chat to your website to talk with your customers in real-time.
          </p>
        </article>
        <article class="card">
          <i class="bi bi-graph-up-arrow"></i>
          <h3>Your own dashboard</h3>
          <p>Statistics about visitors subsribers data - all in one place.</p>
        </article>
        <article class="card">
          <i class="bi bi-aspect-ratio"></i>
          <h3>Responsive-only</h3>
          <p>All websites built with our editor are responsive.</p>
        </article>
      </section>
    </section>
    <section class="demo" id="demo">
      <h3>Let's make a website <span>in less than a minute.</span></h3>
      <main>
        <section class="video">
          <video
            src="https://res.cloudinary.com/wewix/video/upload/v1670845043/wewix_site_example_l53dbt.mov"
            autoplay
            loop
            muted></video>
        </section>

        <section class="demo-text">
          <article class="demo-part">
            <h4>1. Start with a design template</h4>
            <p>Get going with our pre-built stunning layouts collection.</p>
          </article>
          <article class="demo-part">
            <h4>2. Drag & drop anything you need</h4>
            <p>Add beatiful components build for you.</p>
          </article>
          <article class="demo-part">
            <h4>3. Publish to the web</h4>
            <p>Publish your website with your own custom domain.</p>
          </article>
        </section>
      </main>
    </section>
    <footer class="footer">
      <h2>Try wewix now & start building your next website.</h2>
      <button @click="$router.push('/templates')">Try wewix now</button>
      <div class="links">
        <section class="logo">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 0.875C0 0.391751 0.364805 0 0.814815 0H10.1852C10.6352 0 11 0.391751 11 0.875V6.125C11 6.60825 10.6352 7 10.1852 7H0.814815C0.364805 7 0 6.60825 0 6.125V0.875Z"
              fill="currentColor" />
            <path
              d="M24 23.1765C24 23.6313 23.6352 24 23.1852 24L13.8148 24C13.3648 24 13 23.6313 13 23.1765L13 17.8235C13 17.3687 13.3648 17 13.8148 17L23.1852 17C23.6352 17 24 17.3687 24 17.8235L24 23.1765Z"
              fill="currentColor" />
            <path
              d="M0 9.83333C0 9.3731 0.364805 9 0.814815 9H10.1852C10.6352 9 11 9.3731 11 9.83333V23.1667C11 23.6269 10.6352 24 10.1852 24H0.814815C0.364805 24 0 23.6269 0 23.1667V9.83333Z"
              fill="currentColor" />
            <path
              d="M24 14.1429C24 14.6162 23.6352 15 23.1852 15L13.8148 15C13.3648 15 13 14.6162 13 14.1429L13 0.857142C13 0.383755 13.3648 -4.86981e-07 13.8148 -4.4764e-07L23.1852 3.71544e-07C23.6352 4.10885e-07 24 0.383756 24 0.857143L24 14.1429Z"
              fill="currentColor" />
          </svg>
          <h1>wewix</h1>
        </section>
        <nav>
          <a href="#" v-scroll-to="'#home'">Home</a>
          <a href="#" v-scroll-to="'#features'">Features</a>
          <a href="#" v-scroll-to="'#demo'">Demo</a>
          <a href="#" v-scroll-to="'#about'">About</a>
        </nav>
      </div>
    </footer>
  </main>
</template>

<script>
import appHeader from '../cmps/app-cmps/app-header.vue'
export default {
  name: 'home',
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {},
  components: {
    appHeader,
  },
}
</script>
