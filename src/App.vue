<template>
  <div>
    <v-app>
      <v-app-bar dense dark>
        <v-toolbar-title>Tool Bar</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn to="/">
          Home
        </v-btn>

        <v-btn to="/admin" v-if="$store.state.user_data.role == 'ADMIN'">
          Admin
        </v-btn>

        <v-btn to="/employee" v-if="$store.state.user_data.role == 'EMPLOYEE'">
          Employee
        </v-btn>

        <v-btn
          to="/booking_time"
          v-if="$store.state.user_data.role == 'EMPLOYEE'"
        >
          จองเวลา
        </v-btn>

        <v-btn to="/schedule" v-if="$store.state.user_data.role == 'ADMIN'">
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
            <v-list-item
              v-if="$store.state.token != ''"
              @click="
                $store.commit('logout');
                $router.push('Login');
              "
            >
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <router-view />
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");

* {
  font-family: "Kanit", sans-serif;
}
</style>
