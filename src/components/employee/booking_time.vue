<template>
  <v-container>
    <v-row style="margin-top:20px">
      <h1>ระบบจองเวลา นัดคุย ปรึกษา</h1>
    </v-row>
    <v-row style="margin-top:20px">
      <h3>แบบฟอร์มนัดเวลาปรึกษากับผู้บังคับบัญชา</h3>
    </v-row>

    <v-row style="margin-top:20px">
      <v-col cols="12">
        <v-form
          @submit.prevent="confirm_addAppointment"
          v-model="addAppointmentValid"
        >
          <v-col cols="6">
            <span>ชื่อหัวข้อ</span>
            <v-text-field
              label="กรอกชื่อหัวข้อ"
              outlined
              v-model="addAppointment.title"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <span>รายละเอียด</span>
            <v-textarea
              label="กรอกรายละเอียด"
              outlined
              v-model="addAppointment.detail"
            ></v-textarea>
          </v-col>
          <div data-app>
            <v-row>
              <v-col cols="2">
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="addAppointment.booking_date"
                      label="เลือกวันที่"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    header-color="green lighten-1"
                    v-model="addAppointment.booking_date"
                    @input="
                      selected_date();
                      menu = false;
                    "
                  ></v-date-picker
                ></v-menu>
              </v-col>

              <v-col cols="2" v-if="time != undefined">
                <v-select
                  :items="time"
                  label="เลือกเวลานัด"
                  v-model="addAppointment.booking_time"
                ></v-select>
              </v-col>
            </v-row>
          </div>
          <v-btn
            large
           dark
            
            type="submit"
            :disabled="!addAppointmentValid"
          >
            ส่งคำขอคำปรึกษา
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      date: null,
      addAppointment: {},
      addAppointmentValid: false,
      menu: false,
      time: null,
    };
  },
  methods: {
    selected_date() {
      this.$http
        .get(
          "https://sabackend.herokuapp.com/api/appointment/time/" +
            this.addAppointment.booking_date,
          {
            headers: { Authorization: `${this.$store.state.token}` },
          }
        )
        .then((response) => {
          if (response.data && response.data.length > 0) {
            this.time = response.data;
          }
        });
    },
    async reload() {
      location.reload();
    },
    confirm_addAppointment() {
      const token = this.$store.state.token;
      this.$http
        .post("https://sabackend.herokuapp.com/api/appointment", this.addAppointment, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            Swal.fire(
              "ทำการนัดหมายหัวหน้าเรียบร้อย โปรดรอหัวหน้ายืนยัน",
              "",
              "success"
            );
            this.addAppointment = { 
              title : '', detail : '', booking_date :'', booking_time :''};
           
          } else {
            Swal.fire("ไม่สามารถนัดหมายได้", "", "error");
            console.log(response.data.error);
          }
        });
    },
  },
};
</script>

<style></style>
