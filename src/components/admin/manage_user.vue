<template>
  <v-row>
    <v-col>
      <h1>จัดการผู้ใช้งาน/ลูกน้องทั้งหมด</h1>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-btn class="mx-2" @click="dialog_addUser = true">
        <v-icon> mdi-plus </v-icon>
        เพิ่มผู้ใช้งานใหม่
      </v-btn>



      <v-btn class="mx-2" @click="dialog_message = true">
        <v-icon> mdi-message-text-outline </v-icon>
        ส่งข้อความหาพนักงาน
      </v-btn>

      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="user" :search="search">
            <template v-slot:[`item.actions`]="{ item, index }">
        
              <v-icon
                small
                @click="
                  dialog_editUser = true;
                  editUser.id = item.id;
                  editUser.name = item.name;
                  editUser.Username = item.username;
                  editUser.index = index;
                "
              >
                mdi-pencil
              </v-icon>

              <v-icon small @click="deleteUser(item.id, index)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <!-- Sent Message -->
      <v-dialog v-model="dialog_message" max-width="600px">
        <v-card>
          <v-form
            @submit.prevent="confirmed_selectEmployee"
            v-model="messageValid"
          >
            <v-card-title>
              <span class="text-h5">ส่งข้อความหาพนักงาน</span>
            </v-card-title>

            <v-divider />
            <v-col cols="12">
              <v-select
                :items="employees"
                item-text="name"
                label="เลือกผู้ที่จะส่งข้อความหา"
                dense
                v-model="message.employee"
                return-object
                style="margin:20px"
              ></v-select
            ></v-col>

            <v-col cols="12">
              <v-textarea height="100px"
                v-model="message.detail"
                required
                label="ข้อความที่จะส่ง"
                auto-grow
                outlined
              ></v-textarea>
            </v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog_message = false; message.employee ='', message.detail =''">
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                type="submit"
                :disabled="!messageValid"
              >
                ส่งข้อความ
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <!-- ADD USER -->
      <div id="app">
        <v-app id="addUser">
          <v-dialog v-model="dialog_addUser" max-width="600px">
            <v-card>
              <v-form
                @submit.prevent="confirmed_addUser"
                v-model="addUserValid"
              >
                <v-card-title>
                  <span class="text-h5">เพิ่มผู้ใช้</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          required
                          label="Name"
                          :rules="[(v) => !!v || 'โปรดใส่ชื่อผู้ใช้']"
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
      </div>

      <!-- EDIT USER -->
      <div id="app">
        <v-app id="editUser">
          <v-dialog v-model="dialog_editUser" max-width="600px">
            <v-form
              ref="editinfo"
              @submit.prevent="updateUser"
              v-model="editUserValid"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">แก้ไขผู้ใช้งาน</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Name"
                          v-model="editUser.name"
                          :rules="[(v) => !!v || 'โปรดใส่ชื่อผู้ใช้']"
                          >Name</v-text-field
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Password"
                          v-model="editUser.password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show1 ? 'text' : 'password'"
                          @click:append="show1 = !show1"
                          >Password</v-text-field
                        >
                      </v-col>

                      <!-- <v-col cols="6">
                        <v-text-field
                          label="Confirm Password"
                          v-model="editUser.confirm_password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show1 ? 'text' : 'password'"
                          @click:append="show1 = !show1"
                          >Confirm Password</v-text-field
                        >
                      </v-col> -->
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog_editUser = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    :disabled="!editUserValid"
                    type="submit"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-app>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      employees: [],
      message: {},
      search: "",
      messageValid: false,
      dialog_message: false,
      dialog_addUser: false,
      dialog_editUser: false,
      addUserValid: false,
      editUserValid: false,
      show1: false,
      addUser: { name: "", username: "", password: "", role: "EMPLOYEE" },
      editUser: {},
      rules: {
        required: (value) => !!value || "Required Password.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },
      user: [],
      headers: [
        {
          text: "Username",
          align: "start",
          sortable: false,
          value: "username",
        },

        { text: "Name", value: "name" },
        { text: "Permission", value: "role" },
        { text: "", value: "actions" },
      ],
    };
  },
  methods: {
    // Message
    confirmed_selectEmployee(){
       const token = this.$store.state.token;
       console.log(this.message.employee.id);
       this.message.receiver_id = this.message.employee.id;
      this.$http
        .post("http://127.0.0.1:8000/api/message/", this.message, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.dialog_message = false;
            Swal.fire("ส่งข้อความไปเรียบร้อย", "", "success");
            console.log(response.data);
            this.message = {
             detail: '',
            };
          } else {
            Swal.fire(
              "ไม่สามารถส่งข้อความได้ โปรดตรวจสอบอีกครั้ง",
              "",
              "error"
            );
            console.log(response.data.error);
          }
        });
    },
    // Add
    confirmed_addUser() {
      const token = this.$store.state.token;
      this.$http
        .post("http://127.0.0.1:8000/api/user/", this.addUser, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.dialog_addUser = false;
            Swal.fire("เพิ่มผู้ใช้งานเรียบร้อย", "", "success");
            this.user.push(response.data.data);
            this.employees.push(response.data.data)
            console.log(response.data.data);
            console.log(this.user);
            this.addUser = {
              name: "",
              username: "",
              password: "",
            };
          } else {
            Swal.fire(
              "ไม่สามารถเพิ่มผู้ใช้งานได้ โปรดตรวจสอบ Username กับ Password ของท่านอีกครั้ง",
              "",
              "error"
            );
            console.log(response.data.error);
          }
        });
    },
    // Update
    updateUser() {
      console.log(this.$refs.editinfo);
      if (this.$refs.editinfo.validate()) {
        const token = this.$store.state.token;
        this.$http
          .put(
            "http://127.0.0.1:8000/api/user/" + this.editUser.id,
            this.editUser,
            {
              headers: { Authorization: `${token}` },
            }
          )
          .then((response) => {
            if (response.data && response.data.status != "error") {
              this.user.splice(this.editUser.index, 1, response.data);
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
      }
    },

    // Delete
    deleteUser(id, index) {
      Swal.fire({
        title: "คุณแน่ใจว่าจะลบ?",
        text: "การลบจะไม่สามารถคืนสิ่งที่ลบได้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
      }).then((result) => {
        if (result.isConfirmed) {
          const token = this.$store.state.token;
          console.log(id);
          console.log(index);
          this.$http
            .delete("http://127.0.0.1:8000/api/user/" + id, {
              headers: { Authorization: `${token}` },
            })
            .then((response) => {
              if (response.data && response.data.status != "error") {
                Swal.fire("ลบผู้ใช้นี้เรียบร้อย", "", "success");
                this.user.splice(index, 1);
              } else {
                Swal.fire("ไม่สามารถลบผู้ใช้งานได้", "", "error");
                console.log(response.data.error);
              }
            });
        }
      });
    },
  },

  computed: {
    getUser() {
      return this.user;
    },
  },
  created() {
    const token = this.$store.state.token;
    this.$http
      .get("https://sabackend.herokuapp.com/api/user", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (response.data && response.data.status != "error") {
          this.user = response.data;
          console.log(response.data.employees);
        } else {
          console.log(response.data.error);
        }
      });

      this.$http
      .get("https://sabackend.herokuapp.com/api/user/employees", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (response.data && response.data.status != "error") {
          this.employees = response.data;
       
        } else {
          console.log(response.data.error);
        }
      });
  },
};
</script>

<style></style>
