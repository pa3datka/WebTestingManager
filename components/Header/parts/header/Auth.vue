<script setup lang="ts">
import { hideOnClickMenu } from "~/composables/shared/HideOnClickMenu";
import { useRouter } from "nuxt/app";

const router = useRouter();
const auth = false;

const data = reactive({
    isShow: false,
});

const showMenu = () => {
    data.isShow = !data.isShow;
};

onMounted(() => {
    hideOnClickMenu().hideUserMenu('user', 'user-container', 'show-menu', showMenu);
});
</script>

<template>
  <div class="auth">
      <div class="guest-group d-flex-md align-items-center" v-if="!auth">
          <div class="sign-in hover" >SIGN IN</div>
          <div class="sign-up hover" @click="router.push('/auth/sign-up')">SIGN UP</div>
      </div>
      <div class="user-group d-flex align-items-center" v-if="auth">
          <div class="notify d-flex align-items-center">
              <div class="hover d-flex align-items-center justify-content-center">
                  <svg-template class="cursor" name="notification" />
              </div>
              <div class="hover d-flex align-items-center justify-content-center">
                  <svg-template class="cursor" name="message" />
              </div>
          </div>
          <div
              :class="{ 'rotate-vector': data.isShow }"
              class="user d-flex-md align-items-center hover"
              @click="showMenu()"
          >
              <div class="name">Анастасия. Е</div>
              <div class="avatar">
                  <img class="img-avatar" src="/img/ava.jpeg" alt="Avatar">
              </div>
          </div>

          <div :class="{ 'show-menu': data.isShow }" class="user-container">
              <div class="user-menu" >
                  <div class="item d-flex align-items-center hover">
                      <svg-template name="settings"/>
                      <div>Settings</div>
                  </div>
                  <hr>
                  <div class="item d-flex align-items-center hover">
                      <svg-template name="sign-out"/>
                      <div>Sign out</div>
                  </div>
              </div>
          </div>

      </div>
  </div>
</template>
