<template>
   <v-container>
    <v-row style="margin-top: 5px">
      <v-col cols="3">
        <span>ส่วนจัดการสำหรับแอดมิน</span>
        <h1 style="text-align: right; ">Admin</h1>

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
        <manageWorks v-if="current_component == 'manage_works'" />
        <manageAppointment v-else-if="current_component == 'manage_appointment'" />
        <manageUser v-else-if="current_component == 'manage_user'" />

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import manageWorks from "@/components/admin/manage_works.vue";
import manageAppointment from "@/components/admin/manage_appointment.vue"
import manageUser from "@/components/admin/manage_user.vue"

export default {
  components: { manageWorks, manageAppointment, manageUser },
  data() {
    return {
      current_component: "manage_works",
      lists_select: 0,
      list_compo: [
        {
          name: "manage_works",
          name_l: "จัดการงานทั้งหมด",
        },
        {
          name: "manage_appointment",
          name_l: "ตารางเวลานัดพบ",
        },
                {
          name: "manage_user",
          name_l: "จัดการผู้ใช้งาน/ลูกน้อง",
        },
      ],
    };
  },
};
</script>

<style scoped>
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
