<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
</script>

<template>
  <main class="column">
    <img src="@/assets/images/picture.png" />
    <h2>Please login or register!</h2>
    <div class = "row">
      <LoginForm />
      <RegisterForm />

    </div>
  </main>
</template>
<style>
template,body{
  background: linear-gradient(217deg, var(--light-pink), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, var(--light-yellow), rgba(0,255,0,0) 70.71%),
            linear-gradient(336deg, var(--muted-lavender), rgba(0,0,255,0) 70.71%);
}
h2{
  font-family: 'Starborn';
  font-size: medium;
}
.row{
  display:flex;
  flex-direction: row;
  justify-content: space-evenly;
}
img{
  height: 250px;
  padding: 50px;
}
</style>
