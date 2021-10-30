<template>
  <v-container style="padding-top:30vh">
    <v-row justify="center">
      <v-col class="text-center" cols="12" tag="h1">
        <span class="font-weight-black" style="font-size: 100%">
          Manage by Chitra
        </span>

        <br />

        <span>เว็ปไซต์จัดการและบริหารงานร้องเรียน</span>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="5"
        ><span class="font-weight-black"
          >ช่องทางการติดต่อผู้บังคับบัญชา (จิตรา เมฆาพงศ์พันธุ์)
        </span>
        <br />
        <img
          height="20px"
          src="https://media.discordapp.net/attachments/741986644542095360/904034117727944876/icons8-facebook-48.png"
        />
        Chitra Mekapongpanh <br />
        <img
          height="19px"
          src="https://media.discordapp.net/attachments/741986644542095360/904037851237347388/icons8-email-64.png"
        />
         chitra.m@gmail.com <br />
        <img
          height="17px"
          src="https://media.discordapp.net/attachments/904027819103912006/904027885130625054/icons8-telephone-60.png"
        />
        081-922-4320 <br />
        <img
          height="20px"
          src="https://cdn.discordapp.com/attachments/741986644542095360/904029987064152094/icons8-round-pushpin-48.png"
        />
        สำนักงานตรวจเงินแผ่นดิน หน่วยงานที่ 5 ชั้น 4 ห้อง 2 ถนนพระรามที่ 6 แขวง
        สามเสนใน เขตพญาไท กรุงเทพมหานคร 10400 <br />
      </v-col>

       <v-col cols="3">
        <span class="font-weight-black"
          >ช่องทางการติดต่อขอรับบัญชีผู้ใช้
        </span>
        <br/>
        <span>- ผู้ใต้บังคับบัญชาของนาง จิตรา เมฆาพงศ์พันธุ์ สามารถขอรับบัญชีผู้ใช้ได้จากผู้บังคับบัญชาของตนเอง</span>
        
        
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn to="login" v-if="$store.state.token == ''">
      เข้าสู่ระบบ
      </v-btn>
    </v-row>

    <v-row style='margin-top: 20px' align="center" justify="center">
      <v-btn to="/admin" v-if="$store.state.user_data.role == 'ADMIN'">
        Admin
      </v-btn>
<v-col cols='1'></v-col>
      <v-btn to="/schedule" v-if="$store.state.user_data.role == 'ADMIN'">
        ปฏิทินนัดหมาย
      </v-btn>
    </v-row>

    <v-row align="center" justify="center">
      <v-btn large
        to="/booking_time"
        v-if="$store.state.user_data.role == 'EMPLOYEE'"
      >
        จองเวลา
      </v-btn>
<v-col cols='1'></v-col>
      <v-btn large to="/employee" v-if="$store.state.user_data.role == 'EMPLOYEE'">
        เข้าเมนูจัดการสำหรับพนักงาน
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.bg {
  width: 80%;
  height: 50%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("https://media.discordapp.net/attachments/875359570178998302/902974715457568801/Banner-E0B89EE0B8A3E0B8B0E0B8A3E0B8B2E0B88AE0B89EE0B8B4E0B898E0B8B5E0B89AE0B8A3E0B8A1E0B8A3E0B8B2E0B88AE0B8B2E0B8A0E0B8B4E0B980E0B8A9E0B881-E0B8A3.png?width=1165&height=631")
    no-repeat center center;
  background-size: cover;
  background-color: red;
  transform: scale(1.1);
}
</style>
