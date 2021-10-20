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

      <v-btn color="primary" class="mx-2" dark @click="dialog_addUser = true">
        <v-icon> mdi-plus </v-icon>
        เพิ่มผู้ใช้งานใหม่
      </v-btn>

      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="items" :search="search">
            <template v-slot:[`item.actions`]="{}">
              <v-icon small @click="dialog_editUser = true">
                mdi-pencil
              </v-icon>

              <v-icon small>
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <!-- ADD USER -->
      <div id="app">
        <v-app id="addUser">
          <v-dialog v-model="dialog_addUser" max-width="600px">
            <v-card>
              <v-form>
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
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          required
                          label="Username"
                          :rules="[(v) => !!v || 'โปรดใส่ Username']"
                          maxlength="20"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          required
                          label="Password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show1 ? 'text' : 'password'"
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          required
                          label="Confirm Password"
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
                    @click="dialog_addUser = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog_addUser = false"
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
            <v-form>
              <v-card>
                <v-card-title>
                  <span class="text-h5">แก้ไขผู้ใช้งาน</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-text-field
                        label="Name"
                        :rules="[(v) => !!v || 'โปรดใส่ชื่อผู้ใช้']"
                        >Name</v-text-field
                      >
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          label="Password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show1 ? 'text' : 'password'"
                          @click:append="show1 = !show1"
                          >Password</v-text-field
                        > </v-col
                      ><v-col cols="6">
                        <v-text-field
                          label="Confirm Password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show1 ? 'text' : 'password'"
                          @click:append="show1 = !show1"
                          >Password</v-text-field
                        >
                      </v-col>
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
                    @click="dialog_editUser = false"
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
export default {
  data() {
    return {
      search: "",
      dialog_addUser: false,
      dialog_editUser: false,
      show1: false,
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
      items: [
        {
          username: "user1",
          name: "ปุณยาพร",
          role: "Employee",
        },
        {
          username: "user2",
          name: "ควย",
          role: "Employee",
        },
        {
          username: "user3",
          name: "หิวข้าว",
          role: "Employee",
        },
        {
          username: "user4",
          name: "ไอสัด",
          role: "Employee",
        },
      ],
    };
  },
};
</script>

<style></style>
