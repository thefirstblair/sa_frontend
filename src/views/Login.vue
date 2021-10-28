<template>
  <v-container fill-height fill-width>
    <v-row class="signin;" >
      <v-col cols="6" class="left " > <h1>Login Page</h1></v-col
      ><v-col cols="6" class="right"> 
        <h1 class="text-center display-2 teal--text text--accent-3">
          เข้าสู่ระบบ
        </h1>
        <h4 class="text-center mt-4">
          หากยังไม่มีบัญชีผู้ใช้ โปรดติดต่อที่ผู้บัญชาการของท่านก่อน
        </h4>
        <v-col>
          <v-form>
            <v-text-field
              label="Username"
              name="username"
              prepend-icon="mdi-email"
              type="text"
              color="teal accent-3"
            />
            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              color="teal accent-3"
            />
            <div class="text-xs-center">
              <v-btn rounded color="teal accent-3" dark type="submit"
                >เข้าสู่ระบบ</v-btn
              >
            </div>
          </v-form>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>

.left{
    background-color:#f9f9f9
}</style>
