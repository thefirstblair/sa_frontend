<template>
  <v-container>
    <v-row style="margin-top:20px"> <h1>ปฏิทินนัดหมาย</h1></v-row>
    <v-row>
      <v-col>
        <v-sheet tile height="54" class="d-flex">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
        <v-sheet height="400">
          <v-calendar
            ref="calendar"
            :events="events"
            v-model="value"
            color="primary"
            type="week"
          >
            <template v-slot:event="{ event }">
              <div style="height:100%; text-align:center; margin-top:2%;">
                {{ event.time }} - {{ event.endtime }} <b>{{ event.name }}</b><br>
                ผู้นัดหมาย : {{ event.sender.name }}
              </div>
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      events: [],
    };
  },
  created() {
    this.$http
      .get("http://127.0.0.1:8000/api/appointment/calender", {
        headers: { Authorization: `${this.$store.state.token}` },
      })
      .then((response) => {
        if (response.data && response.data.status != "error") {
          this.events = response.data;
          if(response.data && response.data.length > 0) {
            this.$refs.calendar.scrollToTime(response.data[0].time);
          }
        } else {
          console.log(response.data.error);
        }
      });
  },
};
</script>

<style scoped>
</style>
