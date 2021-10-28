<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>

      <v-toolbar-title>Tool Bar</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn to="/">
        Home
      </v-btn>
  
      <v-btn to="/admin">
        Admin
      </v-btn>

            <v-btn to="/employee">
        Employee
      </v-btn>

    <v-btn to="/booking_time">
        จองเวลา
      </v-btn>

          <v-btn to="/schedule">
        ปฏิทินนัดหมาย
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-app>
       <router-view />
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style >
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");

* {
  font-family: "Kanit", sans-serif;
}

</style>

