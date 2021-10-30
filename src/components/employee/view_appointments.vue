<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>นัดหมายที่ยืนยันแล้ว</h1>
      </v-col>
    </v-row>

    <v-row><v-divider></v-divider></v-row>
    <v-row
      style="overflow-y: auto; max-height: 600px"
      v-if="myappointments == 0"
    >
      <v-col cols="12" style="background: #f1f1f1; margin-top: 10px">
        <h3 style="text-align: center">ท่านยังไม่มีรายการนัดหมาย</h3>
      </v-col>
    </v-row>

    <v-row
      style="overflow-y: auto; max-height: 1500px"
      v-else-if="myappointments != []"
    >
      <v-col
        ref="vcol"
        v-for="(item, index) in myappointments"
        :key="index"
        cols="12"
      >
        <v-card color="#f1f1f1" style="margin: 10px">
          <v-card-title class="text-h6">
            <label>
              <h3>หัวข้อ: {{ item.title }}</h3>
            </label>
          </v-card-title>
          <v-card-subtitle>
            <label>
              <td>รายละเอียด: {{ item.detail }}</td>
              <br />
              วันที่จองนัดหมาย: {{ item.booking_date }}
            </label>

            <label>
              เวลา:
              {{ item.booking_time }}
            </label>

            <br />
            <label> สถานะ: {{ item.status }} </label>
          </v-card-subtitle>

       
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      myappointments: [],
    };
  },
  created() {
    const token = this.$store.state.token;
    this.$http
      .get("http://127.0.0.1:8000/api/appointment/user", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (response.data && response.data.status != "error") {
          this.myappointments = response.data;
        } else {
          console.log(response.data.error);
        }
      });
  },
};
</script>

<style></style>
