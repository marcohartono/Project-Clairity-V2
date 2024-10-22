<template>
  <div id="app">
    <div class="c_navigation-bar-instance">
      <div class="c_navigation-bar-frame">
        <div class="c_navigation-bar-frame1">
          <router-link to="/">
            <div class="c_navigation-bar-frame2">
              <img
                src="/logo_1.png"
                alt="rectangle"
                :width="40"
                :height="40"
                class="c_navigation-bar-rectangle"
              />
              <div class="c_navigation-bar-text">
                <p class="c_navigation-bar-text1">PROJECT CLARITY</p>
              </div>
            </div>
          </router-link>

          <div class="c_navigation-bar-frame3">
            <router-link to="/">
              <div class="c_navigation-bar-frame4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  alt="frame"
                  :width="20"
                  :height="20"
                  class="c_navigation-bar-frame5"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
                  />
                </svg>
                <div class="c_navigation-bar-text2">
                  <p class="c_navigation-bar-text3">Home</p>
                </div>
              </div>
            </router-link>
            <router-link to="/about">
              <div class="c_navigation-bar-frame6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  alt="frame"
                  :width="20"
                  :height="20"
                  class="c_navigation-bar-frame7"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
                  />
                </svg>
                <div class="c_navigation-bar-text4">
                  <p class="c_navigation-bar-text5">About</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view class="main-content"> </router-view>
</template>

<script>
  export default {
    name: 'CNavigationBar',
  }
</script>

<style scoped>
.c_navigation-bar-instance {
  width: 100%;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

#app {
  background-color: #f2f7f2;
}

a {
  text-decoration: none;
}

.c_navigation-bar-frame,
.c_navigation-bar-frame1,
.c_navigation-bar-frame2 {
  width: 100%;
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}

.c_navigation-bar-frame {
  gap: 38px;
  padding: 24px 208px;

  background-color: #1e3622;
}

.c_navigation-bar-frame1,
.c_navigation-bar-frame2 {
  gap: 491px;
}

.c_navigation-bar-frame2 {
  gap: 24px;
  max-width: 352px;
  justify-content: center;
}

.c_navigation-bar-rectangle {
  width: 100%;
  height: auto;
  margin: 0;
  display: block;
  max-width: 26.03564453125px;
}

.c_navigation-bar-text {
  width: 100%;
  max-width: 302px;
  margin-top: 0;
  min-height: auto;
  text-align: left;
  margin-bottom: 0;
}

.c_navigation-bar-text1 {
  color: #f2f7f2;
  font-size: 18px;
  font-style: normal;
  margin-top: 0;
  text-align: left;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0;
  letter-spacing: 0;
  text-transform: none;
}

.c_navigation-bar-frame3 {
  gap: 48px;
  display: flex;
  position: relative;
  max-width: 186px;
  align-items: center;
}

.c_navigation-bar-frame3,
.c_navigation-bar-frame4,
.c_navigation-bar-frame5 {
  width: 100%;
  box-sizing: border-box;
  justify-content: flex-start;
}

.c_navigation-bar-frame4 {
  gap: 8px;
  display: flex;
  position: relative;
  max-width: 69px;
  align-items: center;
}

.c_navigation-bar-frame5 {
  overflow: hidden;
  max-width: 16px;
  align-items: flex-start;
  flex-direction: column;
}

.c_navigation-bar-text2 {
  width: 100%;
  max-width: auto;
  margin-top: 0;
  min-height: auto;
  text-align: left;
  margin-bottom: 0;
}

.c_navigation-bar-text3 {
  color: #f2f7f2;
  font-size: 15px;
  font-style: normal;
  margin-top: 0;
  text-align: left;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0;
  letter-spacing: 0;
  text-transform: none;
}

.c_navigation-bar-frame6,
.c_navigation-bar-frame7 {
  width: 100%;
  box-sizing: border-box;
  justify-content: flex-start;
}

.c_navigation-bar-frame6 {
  gap: 8px;
  display: flex;
  position: relative;
  max-width: 69px;
  align-items: center;
}

.c_navigation-bar-frame7 {
  overflow: hidden;
  max-width: 16px;
  align-items: flex-start;
  flex-direction: column;
}

.c_navigation-bar-text4 {
  width: 100%;
  max-width: auto;
  margin-top: 0;
  min-height: auto;
  text-align: left;
  margin-bottom: 0;
}

.c_navigation-bar-text5 {
  color: #97be98;
  font-size: 15px;
  font-style: normal;
  margin-top: 0;
  text-align: left;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0;
  letter-spacing: 0;
  text-transform: none;
}
.main-content {
  margin-left: 208px;
  margin-right: 208px;
}
</style>
