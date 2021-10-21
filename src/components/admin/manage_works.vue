<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>ส่วนจัดการงานทั้งหมด</h1>
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

    <v-btn @click="dialog_addWork = true">
      <v-icon>mdi-plus</v-icon>
      เพิ่มเรื่องร้องเรียนการทุจริตใหม่
    </v-btn>
    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          v-if="item.status == 'รอแจกจ่ายงาน'"
          @click="dialog_selectEmployee = true"
          >เลือกพนักงาน</v-btn
        >

        <v-btn v-else-if="item.status == 'เห็นชอบ' || item.status == 'ไม่เห็นชอบ'"
          >ดูรายละเอียดรายงาน</v-btn
        >
        <h1 v-else></h1>

      </template>
    </v-data-table>
    <!-- Dialog Add Work -->
    <div id="app">
      <v-app id="addWork">
        <v-dialog v-model="dialog_addWork" persistent max-width="800px">
          <v-card>
            <v-card-title>
              <span class="text-h4">เพิ่มเรื่องร้องเรียนใหม่</span>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="หัวข้อ*" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="ชื่อหน่วยงานที่ร้องเรียน*"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field label="ชื่อผู้ร้องเรียน*"></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      label="รายละเอียด*"
                      auto-grow
                      outlined
                      rows="3"
                      row-height="15"
                    ></v-textarea>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['ร้องเรียนเกี่ยวกับการตรวจสอบ']"
                      label="ประเภทการร้องเรียน*"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['กรุงเทพมหานคร']"
                      label="จังหวัด*"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>* indicates required field</small>
              <v-file-input
                accept="image/*"
                label="อัพโหลดเอกสารเพิ่มเติม"
              ></v-file-input>
              <v-col> </v-col>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog_addWork = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog_addWork = false">
                Save
              </v-btn>
            </v-card-actions></v-card
          >
        </v-dialog>
      </v-app>
    </div>

    <!-- Dialog Select Employee -->
    <div id="app">
      <v-app id="selectEmployee">
        <v-dialog v-model="dialog_selectEmployee" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h4">มอบหมายงาน</span>
            </v-card-title>
            <v-divider />
            <v-col cols="12">
              <v-select
                :items="employee"
                label="เลือกพนักงาน"
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
                @click="dialog_selectEmployee = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog_selectEmployee = false"
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
      dialog_addWork: false,
      dialog_selectEmployee: false,
      headers: [
        {
          text: "หัวข้องานร้องเรียน",
          align: "start",
          sortable: false,
          value: "title",
        },

        { text: "สถานะงาน", value: "status" },
        { text: "ผู้รับผิดชอบงาน", value: "employee" },
        { text: "มอบหมายงาน", value: "action" },
      ],
      items: [
        { title: "test1", status: "เห็นชอบ", employee: "ณิชติตรา" },
        { title: "test2", status: "ไม่เห็นชอบ", employee: "ปุณยาพร" },
        { title: "test3", status: "รอการประเมิน", employee: "ธันยธรณ์" },
        { title: "test4", status: "รอแจกจ่ายงาน", employee: "-" },
      ],
      employee: ["ณิชติตรา", "ปุณยาพร", "ธันยธรณ์"],
    };
  },
};
</script>

<style></style>
