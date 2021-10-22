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
        <v-data-table :headers="headers" :items="items" class="elevation-1">
          <!-- click เปิดรายละเอียดที่หัวหน้า create มาได้ -->
          <template v-slot:[`item.action`]="{ item }">
            <v-btn
              v-if="item.status == 'รอการประเมิน'"
              @click="dialog_result = true"
              >ส่งรายงาน</v-btn
            >
          </template>
        </v-data-table>
      </v-col></v-row
    >

    <div id="app">
      <v-app id="resultForm">
        <v-dialog v-model="dialog_result" max-width="600px">
          <v-card>
            <v-form>
              <v-card-title>
                <span class="text-h5">รายงานสรุป</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <!-- show data same as ที่หัวหน้าส่งมา-->
                    <v-col cols="12">
                      <v-text-field
                        required
                        label="หัวข้อ"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        required
                        label="ชื่อหน่วยงานที่ร้องเรียน"
                        disabled
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12">
                      <v-textarea outlined required label="สรุปผล"></v-textarea>
                    </v-col>

                    <v-col cols="6">
                      <v-select
                        :items="status"
                        dense
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog_result = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog_result = false"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-app>
    </div>
  </v-container>

  <!-- Dialog ส่งรายงานผล -->
</template>

<script>
export default {
  data() {
    return {
      dialog_result: false,
      status: ['เห็นชอบ', 'ไม่เห็นชอบ'],
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
        { title: "อีนี้มันทุจริตเงินภาคค่า", status: "รอการประเมิน" },
        { title: "ลักลอกเอาเงินภาคไปใช้", status: "ประเมินเรียบร้อย" },
        { title: "เงินภาคหาย", status: "รอการประเมิน" },
        { title: "ตรวจสอบเงินภายในภาคเป", status: "รอการประเมิน" },
      ],
    };
  },
};
</script>

<style></style>
