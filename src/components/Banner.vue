<template>
    <div class="banner-container">
      <div class="banner" :style="{ backgroundImage: 'url(' + getImageUrl(movies[currentSlide].backdrop_path) + ')' }">
        <div class="banner-overlay">
          <div class="banner-info">
            <h2>{{ movies[currentSlide].title }}</h2>
            <p>{{ truncateText(movies[currentSlide].overview, 150) }}</p>
            <router-link :to="{ name: 'MovieDetail', params: { id: movies[currentSlide].id } }" class="read-more-btn">
              Read More
            </router-link>
          </div>
        </div>
      </div>
      <div class="dots">
        <span
          v-for="(movie, index) in movies"
          :key="movie.id"
          :class="['dot', { active: index === currentSlide }]"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      movies: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        currentSlide: 0,
        interval: null
      };
    },
    computed: {
      getImageUrl() {
        return path => `https://image.tmdb.org/t/p/original${path}`;
      }
    },
    mounted() {
      this.startSlideshow();
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
    methods: {
      startSlideshow() {
        this.interval = setInterval(() => {
          this.currentSlide = (this.currentSlide + 1) % this.movies.length;
        }, 5000);
      },
      goToSlide(index) {
        this.currentSlide = index;
      },
      truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
      }
    }
  };
  </script>
  
  <style scoped>
  .banner-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  
  .banner {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: background-image 0.5s ease-in-out;
  }
  
  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8));
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 40px;
    color: white;
  }
  
  .banner-info {
    max-width: 600px;
    margin-bottom: 20px;
  }
  
  .banner-info h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
    line-height: 1.2;
    font-weight: 700;
  }
  
  .banner-info p {
    font-size: 1.2rem;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  
  .read-more-btn {
    align-self: flex-start;
    padding: 12px 24px;
    background-color: #3490dc;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .read-more-btn:hover {
    background-color: #2779bd;
  }
  
  .dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .dot.active {
    background-color: #3490dc;
  }
  </style>
  