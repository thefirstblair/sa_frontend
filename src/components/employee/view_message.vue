<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>ดูข้อความที่ได้รับจากผู้บังคับบัญชา</h1>
      </v-col>
    </v-row>

    <v-row><v-divider></v-divider></v-row>
    <v-row
      style="overflow-y: auto; max-height: 600px"
      v-if="mymessages == 0"
    >
      <v-col cols="12" style="background: #f1f1f1; margin-top: 10px">
        <h3 style="text-align: center">ท่านยังไม่มีข้อความเข้า</h3>
      </v-col>
    </v-row>

    <v-row
      style="overflow-y: auto; max-height: 1500px"
      v-else-if="mymessages != []"
    >
      <v-col
        ref="vcol"
        v-for="(item, index) in mymessages"
        :key="index"
        cols="12"
      >
        <v-card color="#f1f1f1" style="margin: 10px">
          <v-card-title class="text-h6">
            <label>
              <h2>ข้อความจากผู้บังคับบัญชา</h2>
            </label>
          </v-card-title>
          <v-card-subtitle style="margin: 1px">
            <label>
              <span style="font-size:130%"
                >ข้อความ: {{ item.detail }}
                <br />
               </span
              >
                 <span style="font-size:100%"
                >ส่งเมื่อ: {{ item.created_at }}
                <br />
               </span
              >
            </label>
        
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
      mymessages: [],
    };
  },
  created() {
    const token = this.$store.state.token;
    this.$http
      .get("https://sabackend.herokuapp.com/api/message/", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (response.data && response.data.status != "error") {
          this.mymessages = response.data;
        } else {
          console.log(response.data.error);
        }
      });
  },
};
</script>

<style></style>
