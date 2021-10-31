<template>
  <v-container>
    <v-row style="margin-top: 5px">
      <v-col cols="3">
        <span>ส่วนเสริมของพนักงาน</span>
        <h1 style="text-align: right; ">Employee</h1>

        <div
          class="type_select_btn"
          v-for="(v, index) in list_compo"
          :key="index"
          :class="{ active: index == lists_select }"
          @click="
            current_component = v.name;
            lists_select = index;
          "
        >
          {{ v.name_l }}
        </div>
      </v-col>
      <v-col>
        <viewWorks v-if="current_component == 'view_works'" />
        <viewAppointments
          v-else-if="current_component == 'view_appointments'"
        />
        <viewMessage v-else-if="current_component == 'view_message'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import viewWorks from "@/components/employee/view_works.vue";
import viewAppointments from "@/components/employee/view_appointments.vue";
import viewMessage from "@/components/employee/view_message.vue";

export default {
  components: { viewWorks, viewAppointments, viewMessage },
  data() {
    return {
      current_component: "view_works",
      lists_select: 0,
      list_compo: [
        {
          name: "view_works",
          name_l: "งานที่ได้รับมอบหมาย",
        },
        {
          name: "view_appointments",
          name_l: "นัดหมาย",
        },
        {
          name: "view_message",
          name_l: "ข้อความที่ได้รับ",
        },
      ],
    };
  },
};
</script>

<style>
.type_select_btn {
  padding: 1vh;
  border-radius: 4px;
  margin-bottom: 5px;
  transition: 0.5s;
  cursor: pointer;
}

.type_select_btn:hover {
  background: #d8d8d8;
}

.active {
  background: #f1f1f1;
}
</style>
