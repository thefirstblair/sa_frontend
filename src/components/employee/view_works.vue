<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>ดูงานที่ได้รับมอบหมาย</h1>
      </v-col>
    </v-row>

    <v-divider />
    <v-row style="margin-top:20px"
      ><v-col>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          class="elevation-1"
        >
              <template v-slot:[`item.action`]="{ item }">
        <v-btn
          v-if="item.status == 'รอการประเมิน'"
          
          >ส่งรายงาน</v-btn
        >
      </template>
        </v-data-table> </v-col
    ></v-row>
  </v-container>

  <!-- Dialog ส่งรายงานผล -->
  
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "หัวข้องานร้องเรียน",
          align: "start",
          sortable: false,
          value: "title",
        },

        { text: "สถานะงาน", value: "status" },
        { text: "Action", value: "action" },
      ],
      items: [
        { title: "อีนี้มันทุจริตเงินภาคค่า", status: "รอการประเมิน"},
        { title: "ลักลอกเอาเงินภาคไปใช้", status: "ประเมินเรียบร้อย"},
        { title: "เงินภาคหาย", status: "รอการประเมิน"},
        { title: "ตรวจสอบเงินภายในภาคเป", status: "รอการประเมิน"},
      ],
    };
  },
};
</script>

<style></style>
