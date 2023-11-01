<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
</script>

<template>
  <div class ="front">
    <main class="column">
      <img class = "title" src="@/assets/images/picture.png" />
      <h2>Please login or register!</h2>
      <div class = "row">
        <LoginForm />
        <RegisterForm />

      </div>
    </main>
  </div>
</template>
<style>
.front{
  background: linear-gradient(217deg, var(--light-pink), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, var(--light-yellow), rgba(0,255,0,0) 70.71%),
            linear-gradient(336deg, var(--muted-lavender), rgba(0,0,255,0) 70.71%);
  height:100vmax; 
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
.title{
  height: 250px;
  padding: 50px;
}
</style>
