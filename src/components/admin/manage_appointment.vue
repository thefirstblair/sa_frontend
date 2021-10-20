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
      :items="items"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          v-if="item.status == 'wait'"
          @click="dialog_changeStatus = true"
          >เลือกสถานะ</v-btn
        >
      </template>
    </v-data-table>

<!-- Change Status Dialog -->
    <div id="app">
      <v-app id="changeStatus">
        <v-dialog v-model="dialog_changeStatus" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h4">เปลี่ยนสถานะ</span>
            </v-card-title>
            <v-divider />
   <v-col cols="12"> 
            <v-select :items="status_items" label="เลือกสถานะ" dense style="margin:20px"></v-select></v-col>
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
              <v-btn
                color="blue darken-1"
                text
                @click="dialog_changeStatus = false"
              >
                Save
              </v-btn>
            </v-card-actions></v-card
          >
        </v-dialog>
      </v-app>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
        search: "",
        dialog_changeStatus:false,
      headers: [
        {
          text: "วัน/เวลา",
          align: "start",
          sortable: false,
          value: "date",
        },

        { text: "ผู้นัดหมาย", value: "name" },
        { text: "รายละเอียด", value: "detail" },
        { text: "สถานะ", value: "status" },
         { text: "กำหนดสถานะ", value: "action" },
      ],
      items: [
        {
          date: "2021-01-01 14.00",
          name: "ปุณยาพร",
          detail: "นัดคุยเรื่องหัวข้อที่ได้",
          status: "ยืนยัน",
        },
        {
          date: "2021-01-03 11.00",
          name: "ณิชทิตรา",
          detail: "ปรึกษาและสอบถาม",
          status: "ปฏิเสธ",
        },
                {
          date: "2021-01-12 09.00",
          name: "ณิชทิตรา",
          detail: "เกิดข้อสงสัย",
          status: "wait",
        },
      ],
      status_items: ['ยืนยัน','ปฏิเสธ']
    };
  },
};
</script>

<style></style>
