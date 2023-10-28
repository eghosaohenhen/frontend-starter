
import LoginFormVue from '../Login/LoginForm.vue';


<script setup lang="ts">
import { computed, ref,onBeforeMount } from "vue";
import { fetchy } from "../../utils/fetchy";


const props = defineProps(["post_id"]);

const name = ref("");
const emit = defineEmits(["refreshCollages"]);


const isSubmitDisabled = computed(() => {
      // You can set your own validation logic here.
      return !name.value;
});
const createCollage = async () => {
  try {
    //EGGO TODO front & back endpoints dont match 
    await fetchy(`/api/collages`, "POST", {
      body: {name:name.value},
    });
  } catch (_) {
    console.log('errror');
    return;
  }
  emit("refreshCollages");
  emptyForm();
};

const emptyForm = () => {
  name.value = "";
};



</script>

<template>
  <div class="container">
    <h4 class="sidebar">
        Create a Collage
    </h4> 
  <form class="span1" @submit.prevent="createCollage()" >
    <div class="inside">
    <label for="content" class="default">Collage Name</label>
    
    <textarea id="caption" v-model="name" placeholder="Name Your Collage"> </textarea>

    <button type="submit" :disabled="isSubmitDisabled" id= "btn" class="pure-button">Create Collage</button>
  </div>
  </form>
</div>
</template>

<style scoped>
.pure-button {
  width: fit-content;
  align-self:center;
}
.icon{
  height:50px;
  width:50px;
  
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  
  
}
#caption{
  border-radius: 1em;
  border-color: var(--muted-blue);

}
#btn{
  font-family: 'Fredoka', sans-serif;
  color:var(--near-black);
  background: var(--light-pink);
}
.default{
  display:flex; 
  flex-direction: row;
  justify-content:center;
}
.container {
  max-width:770px;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  
}
form {
  background-color: var(--muted-lavender);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}
.inside {
  background: #ffffff;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}
.flex-column{
  padding: 0.5em;
  align-items: center;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
