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

          <v-row>
            <v-col cols="3">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="เลือกวันที่"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="3">
              <v-select :items="items" label="เลือกเวลานัด"></v-select>
            </v-col>
          </v-row>

          <v-btn large text color="primary" type="submit">
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
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu2: false,
    items: ["12.00", "13.00", "14.00"],
  }),
};
</script>

<style></style>
