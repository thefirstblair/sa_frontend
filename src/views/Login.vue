<template>
  <v-container fill-height fluid>
    <v-row class="justify-center align-center">
      <v-col cols="6" class="left">
        <h1 class="text-center" style="color:white;">
          ติดต่อรับรหัสได้ที่ผู้บังคับบัญชาของท่าน <br />
          ติดต่อ 000-000-0000
        </h1></v-col
      ><v-col cols="6" class="right">
        <h1 class="text-center">
          เข้าสู่ระบบ
        </h1>
        <h4 class="text-center mt-4">
          หากยังไม่มีบัญชีผู้ใช้ โปรดติดต่อที่ผู้บัญชาการของท่านก่อน
        </h4>
        <v-col>
          <v-form @submit.prevent="confirmed_login" v-model="loginValid">
            <v-text-field
              label="Username"
              required
              v-model="loginform.username"
              prepend-icon="mdi-email"
              type="text"
              color="teal accent-3"
            />
            <v-text-field
              v-model="loginform.password"
              required
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              prepend-icon="mdi-lock"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
              color="teal accent-3"
            />
            <v-btn
              rounded
              color="success"
              dark
              type="submit"
              :disabled="!loginValid"
              >เข้าสู่ระบบ</v-btn
            >
          </v-form>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      loginform: { username: "", password: "" },
      show1: false,
      loginValid: false,
    };
  },
  methods: {
    confirmed_login() {
      this.$http
        .post("http://127.0.0.1:8000/api/auth/login/", this.loginform, {})
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.$store.commit("rememberUser", response.data.user);
            this.$router.push("/");
            console.log(response.data);
            Swal.fire("เข้าสู่ระบบสำเร็จ", "", "success");
            this.loginform = {};
          } else {
            Swal.fire(
              "ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบ Username และ Password อีกครั้ง",
              "",
              "error"
            );
            console.log(response.data.error);
          }
        });
    },
  },
};
</script>

<style>
.left {
  background-color: #474747;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
