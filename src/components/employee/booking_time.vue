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
        <v-form>
          <v-col cols="6">
            <span>ชื่อหัวข้อ</span>
            <v-text-field label="กรอกชื่อหัวข้อ" outlined></v-text-field>
          </v-col>

          <v-col cols="12">
            <span>รายละเอียด</span>
            <v-textarea label="กรอกรายละเอียด" outlined></v-textarea>
          </v-col>

          <v-col cols="12">
            <div>
              <v-app>
                <v-row>
                  <v-col cols="4">
                    <v-date-picker v-model="dates" multiple></v-date-picker>
                  </v-col>
                  <v-row>
                    <v-col cols="7">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="dates"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-combobox
                            v-model="dates"
                            multiple
                            chips
                            small-chips
                            label="เลือกวันเวลานัดหมาย"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-combobox>
                        </template>

                        <v-combobox
                          v-model="select"
                          :items="time"
                          label="เลือกเวลานัดหมาย"
                          multiple
                        ></v-combobox>

                        <v-date-picker
                          v-model="dates"
                          multiple
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(dates)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-select
                      :items="items"
                      label="Outlined style"
                      outlined
                    ></v-select>
                  </v-row>
                </v-row>
              </v-app>
            </div>
          </v-col>

          <v-col></v-col>
          <v-btn large text type="submit">
            ส่งคำขอคำปรึกษา
          </v-btn>
        </v-form></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dates: ["2018-09-15", "2018-09-20"],
    menu: false,
    items: ["test1", "test2"],
    times: ['12.00', '13.00','14.00'],
  }),
};
</script>

<style></style>
