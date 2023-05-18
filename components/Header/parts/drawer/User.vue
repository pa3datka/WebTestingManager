<script setup lang="ts">
import {useAuthStore} from "~/store/auth/auth";

const user = computed(() => useAuthStore().getUser);
const isAuth = computed(() => useAuthStore().isAuth);

</script>

<template>
    <client-only>
      <div class="user d-flex align-items-center" v-if="isAuth">
          <div class="avatar">
              <img class="img-avatar" src="/img/ava.jpeg" alt="Avatar">
          </div>
          <div class="user-name">
              <div class="firstname">{{ user.firstname }}</div>
              <div class="lastname">{{ user.lastname }}</div>
          </div>
      </div>
    </client-only>
</template>