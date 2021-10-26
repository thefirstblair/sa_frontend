<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>ตารางนัดหมาย</h1>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="appointment"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:[`item.action`]="{ item, index }">
        <v-btn
          v-if="item.status == 'Waiting'"
          @click="
            dialog_changeStatus = true;
            editStatus.id = item.id;
            editStatus.index = index;
          "
          >เลือกสถานะ</v-btn
        >
        <v-btn
          v-else-if="item.status == 'Confirmed' || item.status == 'Declined'"
          @click="dialog_showDetail = true"
          >ดู Detail</v-btn
        >
      </template>
    </v-data-table>

    <!-- Dialog Detail -->
    <v-dialog
      transition="dialog-bottom-transition"
      width="600px"
      height="1000px"
      v-model="dialog_showDetail"
    >
      <v-card>
        <v-toolbar color="primary" dark>รายละเอียดการนัดหมาย</v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12"></div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog_showDetail = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Change Status Dialog -->
    <div id="app">
      <v-app id="changeStatus">
        <v-dialog v-model="dialog_changeStatus" persistent max-width="600px">
          <v-form @submit.prevent="changeStatus" v-model="changeStatusValid">
            <v-card>
              <v-card-title>
                <span class="text-h4">เปลี่ยนสถานะ</span>
              </v-card-title>
              <v-divider />
              <v-col cols="12">
                <v-select
                  v-model="status"
                  :items="status_items"
                  label="เลือกสถานะ"
                  dense
                  style="margin:20px"
                ></v-select
              ></v-col>
              <v-card-text>
                <small>* หากเลือกไปแล้วจะไม่สามารถกลับมาแก้ไขได้อีก</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog_changeStatus = false"
                >
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text type="submit">
                  Save
                </v-btn>
              </v-card-actions></v-card
            >
          </v-form>
        </v-dialog>
      </v-app>
    </div>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      search: "",
      dialog_changeStatus: false,
      dialog_showDetail: false,
      changeStatusValid: false,
      editStatus:{},
      headers: [
        {
          text: "วันที่",
          align: "start",
          sortable: false,
          value: "booking_date",
        },
        { text: "เวลา", value: "booking_time" },
        { text: "ผู้นัดหมาย", value: "user.name" },
        { text: "หัวข้อ", value: "title" },
        { text: "สถานะ", value: "status" },
        { text: "กำหนดสถานะ", value: "action" },
      ],
      appointment: [],
      status_items: ["Confirmed", "Declined"],
    };
  },
  methods: {
    changeStatus() {
      const token = this.$store.state.token;
      this.$http
        .put(
          "http://127.0.0.1:8000/api/appointment/" + this.editStatus.id,
          this.editStatus,
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.appointment.splice(this.editStatus.index, 1, response.data);
            Swal.fire("แก้ไขเรียบร้อย", "", "success");
          } else {
            Swal.fire(
              "ไม่สามารถแก้ไขผู้ใช้งานได้ โปรดตรวจสอบอีกครั้ง",
              "",
              "error"
            );
            console.log(response.data.error);
          }
        });
      this.editUser.password = "";
      this.dialog_editUser = false;
    },
  },
  created() {
    const token = this.$store.state.token;
    this.$http
      .get("http://127.0.0.1:8000/api/appointment", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (response.data && response.data.status != "error") {
          this.appointment = response.data;
        } else {
          console.log(response.data.error);
        }
      });
  },
};
</script>

<style></style>
