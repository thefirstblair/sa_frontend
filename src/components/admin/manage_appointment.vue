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

    <!-- <v-btn @click="dialog_addAppointment = true">
      <v-icon>mdi-plus</v-icon>
      นัดหมายลูกน้อง
    </v-btn> -->

    <v-data-table
      :headers="headers"
      :items="appointment"
      :search="search"
      class="elevation-1"
    >
              <template v-slot:[`item.status`]="{item}">
            <v-chip :color="item.status == 'Confirmed' ? 'green' : 'red'" outlined> {{ item.status}}</v-chip>
          </template>
      <template v-slot:[`item.action`]="{ item, index }">

        <v-btn
          v-if="item.status == 'Waiting'"
          @click="
            dialog_changeStatus = true;
            editStatus.id = item.id;
            editStatus.name = item.name;
            editStatus.index = index;
          "
          >เลือกสถานะ</v-btn
        >
        <v-btn
          v-else-if="item.status == 'Confirmed' || item.status == 'Declined'"
          @click="
            dialog_showDetail = true;
            showItem = item;
          "
          >ดู Detail</v-btn
        >
      </template>
    </v-data-table>

    <!-- Dialog Add Appointment-->
    <!-- <div id="app">
      <v-app id="addAppointment">
        <v-dialog v-model="dialog_addAppointment" max-width="600px">
          <v-card>
            <v-form @submit.prevent="confirmed_addAppointment" v-model="addAppointmentValid">
              <v-card-title>
                <span class="text-h5">เพิ่มนัดหมายกับลูกน้อง</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        required
                        label="หัวข้อ"
                        :rules="[(v) => !!v || 'โปรดใส่หัวข้อ']"
                        v-model="addUser.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        required
                        label="Username"
                        :rules="[(v) => !!v || 'โปรดใส่ Username']"
                        maxlength="20"
                        v-model="addUser.username"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        required
                        label="Password"
                        v-model="addUser.password"
                        :rules="[rules.required, rules.min]"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="
                    dialog_addUser = false;
                    addUser.name = '';
                    addUser.username = '';
                    addUser.password = '';
                    show1 = false;
                  "
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  type="submit"
                  :disabled="!addUserValid"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-app>
    </div> -->

    <!-- Dialog Detail -->
    <v-dialog
      transition="dialog-bottom-transition"
      width="800px"
      v-model="dialog_showDetail"
    >
      <v-card>
        <v-toolbar color="primary" dark>รายละเอียดการนัดหมาย</v-toolbar>
        <v-col>
          <span class="font-weight-black">หัวข้อ: </span
          ><span class="data"> {{ showItem.title }}</span> <br />
          <span class="font-weight-black">รายละเอียด: </span
          ><span class="data">{{ showItem.detail }}</span> <br />
          <span class="font-weight-black"> วันนัดหมาย: </span
          ><span class="data">{{ showItem.booking_date }} </span
          ><span class="font-weight-black" 
            >เวลา: </span><span class="data">
            {{ showItem.booking_time }}
          </span><br/>
          <span class="font-weight-black"
            >ผู้นัดหมาย:</span><span class="data"> {{ showItem.name }}</span
          >
          <br/>

          <span class="font-weight-black">สถานะ:</span> <span class="data">{{ showItem.status }}</span>
        </v-col>
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
                  v-model="editStatus.status"
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
      editStatus: { sender: {} },
      showItem: {},
      headers: [
        {
          text: "วันที่",
          align: "start",
          sortable: false,
          value: "booking_date",
        },
        { text: "เวลา", value: "booking_time" },
        { text: "ผู้นัดหมาย", value: "sender.name" },
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
          "https://sabackend.herokuapp.com/api/appointment/" + this.editStatus.id,
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
            Swal.fire("ไม่สามารถแก้ไขได้ โปรดตรวจสอบอีกครั้ง", "", "error");
            console.log(response.data.error);
          }
        });
      this.editStatus.status = "";
      this.dialog_changeStatus = false;
      this.appointment.index;
    },
  },
  created() {
    const token = this.$store.state.token;
    this.$http
      .get("https://sabackend.herokuapp.com/api/appointment/all", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (response.data && response.data.status != "error") {
          console.log(response.data);
          this.appointment = response.data;
        } else {
          console.log(response.data.error);
        }
      });
  },
};
</script>

<style>
span{
  font-size: 120
}
</style>
