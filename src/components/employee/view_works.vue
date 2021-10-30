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
        <v-data-table :headers="headers" :items="myworks" class="elevation-1">
          <!-- click เปิดรายละเอียดที่หัวหน้า create มาได้ -->
          <template v-slot:[`item.action`]="{ item, index }">
            <v-btn
              v-if="item.status == 'รอดำเนินการ'"
              @click="
                dialog_result = true;
                itemSummary = item;
                itemSummary.index = index;
                itemSummary.work_id = item.id;
              "
              >ส่งรายงาน</v-btn
            >
            <v-btn v-if="item.status == 'รอดำเนินการ'" @click="dialog_showDetail = true; showDetail = item;">ดูรายละเอียด</v-btn>
            <v-btn v-else-if="item.status == 'เห็นชอบ' || item.status == 'ไม่เห็นชอบ'" @click="dialog_showSummary = true; showSummary = item;">ดูสรุปผล</v-btn>
          </template>
        </v-data-table>
      </v-col></v-row
    >
    <!-- Dialog Detail-->
    <v-dialog v-model="dialog_showDetail" width="600px">
      <v-card>
        <v-card-title>
          <h2>รายละเอียดงาน</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>ชื่อหัวข้อ: {{ showDetail.title }}</p>
          <p>ชื่อหน่วยงานที่ร้องเรียน: {{ showDetail.accused_name }}</p>
          <p>ชื่อผู้ร้องเรียน: {{ showDetail.complainer_name }}</p>
          <p>ประเภทการร้องเรียน: {{ showDetail.type }}</p>
          <p>รายละเอียด: {{ showDetail.detail }}</p>
          <p>ไฟล์ pdf:</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog_showDetail = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog ส่งรายงานผล -->
    <v-dialog v-model="dialog_result" max-width="600px">
      <v-card>
        <v-form
          @submit.prevent="confirmed_addSummary"
          v-model="addSummaryValid"
        >
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
                    v-model="itemSummary.title"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    required
                    v-model="itemSummary.accused_name"
                    label="ชื่อหน่วยงานที่ร้องเรียน"
                    disabled
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    outlined
                    required
                    label="สรุปผล"
                    v-model="itemSummary.summary_detail"
                  ></v-textarea>
                </v-col>

                <v-col cols="6">
                  <v-select
                    :items="status"
                    dense
                    v-model="itemSummary.conclusion"
                  ></v-select>
                </v-col>

                <v-col><v-text-field label="pdf file"> </v-text-field></v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog_result = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text type="submit">
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    
    <!-- Dialog แสดงสรุปผล-->
      <v-dialog v-model="dialog_showSummary" width="600px">
      <v-card>
        <v-card-title>
          <h2>สรุปผลการร้องเรียน</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>ชื่อหัวข้อ: {{ showSummary.title }}</p>
          <p>ชื่อหน่วยงานที่ร้องเรียน: {{ showSummary.accused_name }}</p>
          <p>ชื่อผู้ร้องเรียน: {{ showSummary.complainer_name }}</p>
          <p>ประเภทการร้องเรียน: {{ showSummary.type }}</p>
          <p>รายละเอียด: {{ showSummary.detail }}</p>
          <p>ไฟล์ pdf:</p>
          <v-divider></v-divider>
          <v-spacer></v-spacer>
          <h3>สรุปผลจากผู้ใต้บังคับบัญชา {{ showSummary.user.name }}</h3>
          <p>ผู้ตรวจสอบ: {{ showSummary.user.name }}</p>
          <p>
            รายละเอียดการสรุปผล:
            {{ showSummary.summary && showSummary.summary.summary_detail }}
          </p>
          <p>
            สถานะงาน:
            {{ showSummary.summary && showSummary.summary.conclusion }}
          </p>
          <p>
            ไฟล์ผลการตรวจสอบที่แนบมาด้วย:
            {{ showSummary.summary && showSummary.summary.file }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog_showSummary = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      dialog_showSummary:false,
      showSummary:{user: {}},
      dialog_showDetail:false,
      showDetail: {},
      itemSummary: {},
      myworks: [],
      addSummaryValid: false,
      dialog_result: false,
      status: ["เห็นชอบ", "ไม่เห็นชอบ"],
      headers: [
        {
          text: "หัวข้องานร้องเรียน",
          align: "start",
          sortable: false,
          value: "title",
        },

        { text: "สถานะงาน", value: "status" },
        { text: "วันเวลาที่มอบหมายงาน", value: "updated_at" },
        { text: "การกระทำ", value: "action" },
      ],
    };
  },
  methods: {
    confirmed_addSummary() {
      const token = this.$store.state.token;
      this.$http
        .post("http://127.0.0.1:8000/api/summary/", this.itemSummary, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            Swal.fire("ทำรายงานสรุปสำเร็จ", "", "success");

            this.myworks.splice(this.itemSummary.index, 1, response.data);
            this.dialog_result = false;
            this.itemSummary = {};
          } else {
            Swal.fire("ไม่สามารถทำรายงานสรุปได้", "", "error");
            console.log(response.data.error);
          }
        });
    },
  },
  created() {
    const token = this.$store.state.token;
    this.$http
      .get("http://127.0.0.1:8000/api/employee", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (response.data && response.data.status != "error") {
          this.myworks = response.data;
        } else {
          console.log(response.data.error);
        }
      });
  },
};
</script>

<style></style>
