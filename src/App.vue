<template>
  <div>
    <v-app>
      <v-app-bar dense dark class="flex-grow-0">
        <v-toolbar-title><a href="/" style="color:white; text-decoration:none;">SA Managament</a></v-toolbar-title>

        <v-spacer></v-spacer>
        <span v-if="$store.state.token != ''"> ยินดีต้อนรับ คุณ {{$store.state.user_data.name}}</span>
        
        <v-btn to='/login'>Login</v-btn>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
      <!-- ยังไม่เข้าระบบ -->
          <v-list>
            <v-list-item v-if="$store.state.token == ''" @click="$router.push('Login')">
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>

            <v-list-item @click="$router.push('/')">
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

             <v-list-item  v-if="$store.state.user_data.role == 'EMPLOYEE'" @click="$router.push('/employee')">
              <v-list-item-title>เมนูของพนักงาน</v-list-item-title>
            </v-list-item>
       
       <v-list-item  v-if="$store.state.user_data.role == 'ADMIN'" @click="$router.push('/admin')">
              <v-list-item-title>เมนูของแอดมิน</v-list-item-title>
            </v-list-item>

               <v-list-item  v-if="$store.state.user_data.role == 'ADMIN'" @click="$router.push('/schedule')">
              <v-list-item-title>ปฏิทินนัดหมาย</v-list-item-title>
            </v-list-item>
       <!-- Employee -->
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
