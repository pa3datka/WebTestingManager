<script setup lang="ts">
import {hideOnClickMenu} from "~/composables/shared/HideOnClickMenu";
import {useRouter} from "nuxt/app";
import {useAuthStore} from "~/store/auth/auth";
import {useAuth} from "~/composables/auth/useAuth";

const {logout} = useAuth();
const router = useRouter();
const user = computed(() => useAuthStore().getUser);
const isAuth = computed(() => useAuthStore().isAuth);

const data = reactive({
  isShow: false,
});

const showMenu = () => {
  data.isShow = !data.isShow;
};

const goTo = (routName: string) => {
  showMenu();
  router.push({ name: 'profile'});
};

const logOut = () => {
  logout();
  return router.push('/');
}

onMounted(() => {
  hideOnClickMenu().hideUserMenu('user', 'user-container', 'show-menu', showMenu);
});
</script>

<template>
  <div class="auth">
    <client-only>
      <div class="guest-group d-flex-md align-items-center" v-if="!isAuth">
        <div class="sign-in hover" @click="router.push('/auth/sign-in')">SIGN IN</div>
        <div class="sign-up hover" @click="router.push('/auth/sign-up')">SIGN UP</div>
      </div>
    </client-only>

    <div class="user-group d-flex align-items-center" v-if="isAuth">
      <div class="notify d-flex align-items-center">
        <div class="hover d-flex align-items-center justify-content-center">
          <svg-template class="cursor" name="notification"/>
        </div>
        <div class="hover d-flex align-items-center justify-content-center">
          <svg-template class="cursor" name="message"/>
        </div>
      </div>
      <client-only>
        <div
            :class="{ 'rotate-vector': data.isShow }"
            class="user d-flex-md align-items-center hover"
            @click="showMenu()"
        >
          <div class="name">{{ user.firstname + (user.lastname ? '. ' + user.lastname[0] : '') }}</div>
          <div class="avatar">
            <img class="img-avatar" src="/img/ava.jpeg" alt="Avatar">
          </div>
        </div>
      </client-only>

      <div :class="{ 'show-menu': data.isShow }" class="user-container">
        <div class="user-menu">
          <div class="item d-flex align-items-center hover" @click="goTo('profile')">
            <svg-template name="home"/>
            <div>Home</div>
          </div>
          <hr>
          <div class="item d-flex align-items-center hover">
            <svg-template name="settings"/>
            <div>Settings</div>
          </div>
          <hr>
          <div class="item d-flex align-items-center hover">
            <svg-template name="sign-out"/>
            <div @click="logOut">Sign out</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
