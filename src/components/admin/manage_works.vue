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
      :items="works"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:[`item.action`]="{ item, index }">
        <v-btn
          v-if="item.status == 'รอดำเนินการ' && item.user == null"
          @click="
            dialog_selectEmployee = true;
            select_current.id = item.id;
            select_current.index = index;
          "
          >เลือกพนักงาน</v-btn
        >
        <v-btn
          v-else-if="item.status == 'เห็นชอบ' || item.status == 'ไม่เห็นชอบ'"
          @click="
            dialog_showSummary = true;
            showSummary = item;
          "
          >ดูสรุปผล</v-btn
        >
        <v-btn
          v-if="item.status != 'เห็นชอบ' && item.status != 'ไม่เห็นชอบ'"
          @click="
            dialog_showDetail = true;
            showDetail = item;
          "
          >ดูรายละเอียด</v-btn
        >
      </template>
      <template v-slot:[`item.delete`]="{ item, index }">
        <v-icon
          small
          v-if="item.status != 'รอดำเนินการ'"
          @click="confirmed_delete(item.id, index)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <!-- Dialog สรุปงาน -->
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
          <p>
            ไฟล์:
            <a v-if="showSummary.file != null" @click.prevent="openWindow(showSummary.file)"
              >ดูไฟล์งาน</a
            >
            <span v-else> ไม่มีไฟล์งาน </span>
          </p>
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
            ไฟล์:
            <a v-if="showSummary.summary != null" @click.prevent="openWindow(showSummary.summary.file)"
              >ดูไฟล์งาน</a
            >
            <span v-else> ไม่มีไฟล์งาน </span>
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
          <p>
            ไฟล์:
            <a v-if="showDetail.file != null" @click.prevent ="openWindow(showDetail.file)"
              >ดูไฟล์งาน</a
            >
            <span v-else> ไม่มีไฟล์งาน </span>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog_showDetail = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog Add Work -->

    <v-dialog v-model="dialog_addWork" persistent max-width="800px">
      <v-card>
        <v-form @submit.prevent="confirmed_addWork" v-model="addWorkValid">
          <v-card-title>
            <span class="text-h4">เพิ่มเรื่องร้องเรียนใหม่</span>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="หัวข้อ*"
                    v-model="addWork.title"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="addWork.accused_name"
                    required
                    label="ชื่อหน่วยงานที่ร้องเรียน*"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="ชื่อผู้ร้องเรียน*"
                    v-model="addWork.complainer_name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="addWork.detail"
                    required
                    label="รายละเอียด*"
                    auto-grow
                    outlined
                    rows="3"
                    row-height="15"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="addWork.type"
                    :items="['ร้องเรียนเกี่ยวกับการตรวจสอบ']"
                    label="ประเภทการร้องเรียน*"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="addWork.province"
                    :items="province"
                    label="จังหวัด*"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>* indicates required field</small>
            <v-col>
              <v-file-input
                v-model="addWork.file"
                accept=".doc,.docx,.txt, .pdf"
                label="อัพโหลดเอกสารเพิ่มเติม"
              ></v-file-input>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="
                dialog_addWork = false;
                addWork.file = '';
                addWork.province = '';
                addWork.title = '';
                addWork.detail = '';
                addWork.accused_name = '';
                addWork.complainer_name = '';
                addWork.type = '';
              "
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              type="submit"
              :disabled="!addWorkValid"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Dialog Select Employee  -->

    <v-dialog v-model="dialog_selectEmployee" persistent max-width="600px">
      <v-form @submit.prevent="confirmed_selectEmployee">
        <v-card>
          <v-card-title>
            <span class="text-h4">มอบหมายงาน</span>
          </v-card-title>
          <v-divider />
          <v-col cols="12">
            <v-select
              :items="employees"
              item-text="name"
              label="เลือกพนักงาน"
              dense
              v-model="select_current.employee"
              return-object
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
              type="submit"
              :disabled="!select_current.employee.name"
            >
              Save
            </v-btn>
          </v-card-actions></v-card
        ></v-form
      >
    </v-dialog>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      dialog_showDetail: false,
      showDetail: {},
      showSummary: { user: {} },
      select_current: { employee: {} },
      search: "",
      addWorkValid: false,
      addWork: {
        title: "",
        accused_name: "",
        complainer_name: "",
        detail: "",
        type: "",
        province: "",
        file: null,
      },
      province: [
        "กำแพงเพชร",
        "ชัยนาท",
        "นครนายก",
        "นครสวรรค์",
        "นครปฐม",
        "นนทบุรี",
        "ปทุมธานี",
        "พระนครศรีอยุธยา",
        "พิจิตร",
        "พิษณุโลก",
        "เพชรบูรณ์",
        "ลพบุรี",
        "สมุทรปราการ",
        "สระบุรี",
        "สุโขทัย",
        "สุพรรณบุรี",
        "อ่างทอง",
        "อุทัยธานี",
      ],
      dialog_showSummary: false,
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
        { text: "ผู้รับผิดชอบงาน", value: "user.name" },
        { text: "การกระทำ", value: "action" },
        { text: "ลบ", value: "delete" },
      ],
      works: [],
      employees: [],
    };
  },
  methods: {
    openWindow(link) {
      window.open(link);
    },
    confirmed_delete(id, index) {
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
          this.$http
            .delete("https://sabackend.herokuapp.com/api/work/" + id, {
              headers: { Authorization: `${token}` },
            })
            .then((response) => {
              if (response.data && response.data.status != "error") {
                Swal.fire("ลบงานนี้เรียบร้อย", "", "success");
                this.works.splice(index, 1);
              } else {
                Swal.fire("ไม่สามารถลบงานนี้ได้", "", "error");
                console.log(response.data.error);
              }
            });
        }
      });
    },

    confirmed_selectEmployee() {
      const token = this.$store.state.token;
      console.log(this.select_current.index);
      this.select_current.user_id = this.select_current.employee.id;

      this.$http
        .put(
          "https://sabackend.herokuapp.com/api/work/selectEmployee/" +
            this.select_current.id,
          this.select_current,
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.dialog_selectEmployee = false;
            console.log(response.data);
            Swal.fire("เพิ่มพนักงานเรียบร้อย", "", "success");
            this.works.splice(this.select_current.index, 1, response.data);
          } else {
            Swal.fire(
              "ไม่สามารถเพิ่มพนักงานได้ โปรดตรวจสอบอีกครั้ง",
              "",
              "error"
            );
            console.log(response.data.error);
          }
        });
    },
    confirmed_addWork() {
      let formData = new FormData();
      formData.append("title", this.addWork.title);
      formData.append("accused_name", this.addWork.accused_name);
      formData.append("complainer_name", this.addWork.complainer_name);
      formData.append("detail", this.addWork.detail);
      formData.append("type", this.addWork.type);
      formData.append("province", this.addWork.province);

      if (this.addWork.file) {
        formData.append("file", this.addWork.file);
        this.addWork.file = null;
      }

      const token = this.$store.state.token;
      this.$http
        .post("https://sabackend.herokuapp.com/api/work/", formData, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.dialog_addWork = false;
            Swal.fire("เพิ่มเรื่องร้องเรียนใหม่เรียบร้อย", "", "success");
            this.works.push(response.data);
            console.log(response.data);
            console.log(this.works);
            this.addWork = {};
          } else {
            Swal.fire(
              "ไม่สามารถเพิ่มเรื่องร้องเรียนใหม่ได้ โปรดตรวจสอบอีกครั้ง",
              "",
              "error"
            );
            console.log(response.data.error);
          }
        });
    },
  },
  created() {
    const token = this.$store.state.token;
    this.$http
      .get("https://sabackend.herokuapp.com/api/work", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (response.data && response.data.status != "error") {
          this.works = response.data.works;
          this.employees = response.data.employees;
          console.log(this.works);
        } else {
          console.log(response.data.error);
        }
      });
  },
};
</script>

<style></style>
