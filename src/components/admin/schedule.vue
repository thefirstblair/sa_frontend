<template>
  <v-container>
    <v-row style="margin-top:20px"> <h1>ปฏิทินนัดหมาย</h1>
    </v-row>
    <v-row>
    <v-divider></v-divider></v-row>
    <v-row>
      <v-col>
        <v-sheet height="700">
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            :events="events"
            color="primary"
            type="week"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      
      today: "2019-01-10",
      test_events: [],
      events: [ 
      ],
    };
  },
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
  },
  methods: {
    putInArray() {
      var i = 0;
      for (i = 0; i < this.test_events.length; i++) {
          this.events[i].name = this.test_events.title
          this.events[i].start = this.test_events.booking_date 
      }
      console.log(this.events)
      return this.events;
    },
    //   currentDate() {
    //   const current = new Date();
    //   const date = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;
    //   console.log(date);
    //   return date;
    // }
    },created() {

    const token = this.$store.state.token;
    this.$http
      .get("http://127.0.0.1:8000/api/appointment", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (response.data && response.data.status != "error") {
          this.test_events = response.data;
          console.log(this.test_events)
        } else {
          console.log(response.data.error);
        }
      });
  },

      
  

};
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
