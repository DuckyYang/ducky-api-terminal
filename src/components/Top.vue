<!--
 * @Author: Ducky
 * @Date: 2020-05-24 16:09:34
 * @LastEditTime: 2020-06-12 12:43:25
 * @LastEditors: Ducky Yang
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/components/Top.vue
 * @
-->
<template>
  <div class="ducky-top-container">
    <!-- Collapse Navigation -->
    <i
      class="ducky-collapse el-icon-s-unfold"
      title="click to collapse navigaion"
      @click="onCollapse"
      v-if="navCollapsed"
    ></i>
    <i
      class="ducky-collapse el-icon-s-fold"
      title="click to collapse navigaion"
      @click="onCollapse"
      v-else
    ></i>
    <div class="ducky-user-center">
      <!-- Top Right Menu -->
      <!-- User Avatar -->
      <span class="ducky-user-avatar" @click="onAvatarClick">
        <img class="avatar" src="@/assets/logo.png" alt srcset />
      </span>
      <!-- User Menu -->
      <div class="ducky-user-menu" v-show="showUserMenu">
        <span class="ducky-user-name">{{userIdentity.name}}</span>
        <a href="javascript:;"><i class="el-icon-setting"></i> Settings</a>
        <a href="javascript:;"><i class="el-icon-star-on"></i> GitHub</a>
        <a href="javascript:;" @click="signOut"><i class="el-icon-switch-button"></i> Sign Out</a>
      </div>
      <!-- Message Center -->
      <span class="ducky-message-center">
        <i class="el-icon-message-solid"></i>
        <span class="tips"></span>
      </span>
      <!-- Zoom Page -->
      <span class="ducky-full-screen" title="full screen" @click="onFullScreen">
        <i v-if="fullScreen" class="el-icon-crop"></i>
        <i v-else class="el-icon-full-screen"></i>
      </span>
      <!-- Top Right Menu End -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showUserMenu: false,
      fullScreen: false
    };
  },
  methods: {
    onCollapse() {
      this.$store.commit("navCollapse");
    },
    onAvatarClick() {
      this.showUserMenu = !this.showUserMenu;
    },
    onFullScreen() {
      if (!this.fullScreen) {
        //W3C
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        }
        //FireFox
        else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        }
        //Chrome等
        else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen();
        }
        //IE11
        else if (document.documentElement.msRequestFullscreen) {
          document.body.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      this.fullScreen = !this.fullScreen;
    },
    signOut(){
      this.$store.commit('signOut')
    }
  },
  computed: {
    navCollapsed() {
      return this.$store.state.navCollapsed;
    },
    userIdentity(){
      return this.$store.state.identity;
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector("body").addEventListener("click", e => {
        if (e.target.className !== "avatar") {
          this.showUserMenu = false;
        }
      });
    });
  }
};
</script>
<style lang="scss" scoped>
$base-color: #3498db;

.ducky-top-container{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ducky-collapse {
  width: 40px;
  margin-left: 20px;
  font-size: 28px;
  cursor: pointer;
  color: $base-color;
}
.ducky-user-center {
  width: 200px;
  height: 60px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  position: relative;
  .ducky-user-avatar {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    border: 1px solid $base-color;
    border-radius: 5px;
    cursor: pointer;
    img {
      width: 50px;
    }
  }
  .ducky-user-menu {
    position: absolute;
    width: 180px;
    border: 1px solid rgba(27, 31, 35, 0.15);
    top: 70px;
    right: 20px;
    z-index: 1000;
    background-color: #fff;
    .ducky-user-name {
      display: inline-block;
      width: 100%;
      padding: 10px;
      font-family: inherit;
      font-size: 18px;
      height: 42px;
      line-height: 22px;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      text-align: center;
    }
    a {
      display: inline-block;
      height: 40px;
      width: 100%;
      padding: 10px 10px 10px 20px;
      box-sizing: border-box;
      font-size: 16px;
      text-decoration: none;
      color: #24292e;
      line-height: 20px;
    }
    a:hover {
      background-color: #3498db;
      color: #fff;
    }
  }
  .ducky-user-menu::before,
  .ducky-user-menu::after {
    display: inline-block;
    content: "";
    position: absolute;
    border: 10px solid transparent;
  }
  .ducky-user-menu::before {
    left: 146px;
    top: -21px;
    border-bottom-color: rgba(27, 31, 35, 0.15);
  }
  .ducky-user-menu::after {
    left: 146px;
    top: -20px;
    border-bottom-color: #fff;
  }
  .ducky-message-center {
    width: 50px;
    height: 50px;
    font-size: 28px;
    line-height: 50px;
    text-align: center;
    margin-right: 20px;
    color: $base-color;
    position: relative;
    cursor: pointer;
    .tips {
      position: absolute;
      width: 5px;
      height: 5px;
      background-color: red;
      border-radius: 50%;
      right: 8px;
      top: 8px;
    }
  }
  .ducky-full-screen {
    width: 50px;
    height: 50px;
    font-size: 28px;
    line-height: 50px;
    text-align: center;
    color: $base-color;
    position: relative;
    cursor: pointer;
  }
}
</style>
