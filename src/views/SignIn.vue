<!--
 * @Description: 
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-10 14:57:29
 * @LastEditors: Ducky Yang
 * @LastEditTime: 2020-06-12 12:40:15
-->
<template>
  <div class="ducky-signin" @keyup.enter="onSignIn">
    <div class="ducky-signin-container">
      <div class="ducky-signin-container__title">
        <span>welcome</span>
      </div>
      <div class="ducky-signin-container__card">
        <div class="ducky-signin-container__form">
          <div class="ducky-signin-container__form-item">
            <el-input
              v-model="email"
              placeholder="please input your email"
              size="small"
            >
              <template slot="prepend"
                ><i class="el-icon-user-solid"></i
              ></template>
            </el-input>
          </div>
          <div class="ducky-signin-container__form-item">
            <el-input
              v-model="password"
              placeholder="please input your password"
              show-password
              size="small"
            >
              <template slot="prepend"><i class="el-icon-lock"></i></template>
            </el-input>
          </div>
          <div>
            <el-button
              size="small"
              type="primary"
              style="width:100%;"
              @click="onSignIn"
              >Sign In</el-button
            >
          </div>
          <p class="ducky-signin-info">
            please contract admin to create account
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../api/index'
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onSignIn() {
      if (!this.email) {
        this.$message({
          type: "error",
          message: "email can't be empty",
        });
        return;
      }
      if (!this.password) {
        this.$message({
          type: "error",
          message: "password can't be empty!",
        });
        return;
      }
      api.accesstoken.get(this.email,this.password).then(response=>{
        this.$store.commit('setToken',response.data.accesstoken)
        this.$store.commit('setUserIdentity',response.data)

        this.$router.push({path:'/'})
      }).catch(reason=>{
        this.$message({
          type:"error",
          message: reason
        })
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.ducky-signin {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  background-image: url(../assets/login-bg.jpg);
  background-size: cover;
  background-position: 50%;
  box-sizing: border-box;
  .ducky-signin-container {
    width: 300px;
    height: 280px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    position: absolute;
    right: 160px;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
    .ducky-signin-container__title {
      padding: 14px 16px;
      border-bottom: 1px solid #e8eaec;
    }
    .ducky-signin-container__card {
      padding: 16px;
      box-sizing: border-box;
      .ducky-signin-container__form {
        padding: 10px 10px 0px;
        .ducky-signin-container__form-item {
          margin-bottom: 20px;
          box-sizing: border-box;
        }
        .ducky-signin-info {
          font-size: 10px;
          padding-top: 10px;
          color: #c3c3c3;
          text-align: center;
        }
      }
    }
  }
}
</style>
