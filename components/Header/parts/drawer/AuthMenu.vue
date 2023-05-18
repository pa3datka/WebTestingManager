<script setup lang="ts">
import { hideOnClickMenu } from "~/composables/shared/HideOnClickMenu";
import { useAuthStore } from "~/store/auth/auth";
import { useAuth } from "~/composables/auth/useAuth";
import { useRouter } from "nuxt/app";

const router = useRouter();
const isAuth = computed(() => useAuthStore().isAuth);
const hide = hideOnClickMenu();
const { logout } = useAuth();

const signOut = () => {
    hide.hideDrawerForcibly();
    logout();
    router.push('/');
}

interface LinkMenu {
    link: string,
    name: string,
    auth: boolean,
    callback: any,
    count?: boolean
};

const links = <LinkMenu[]> [
    { link: '/', name: 'Message', auth: true, callback: hide.hideDrawerForcibly, count: true },
    { link: '/', name: 'Notifications', auth: true, callback: hide.hideDrawerForcibly, count: false },
    { link: '/', name: 'Settings', auth: true, callback: hide.hideDrawerForcibly },
    { link: '', name: 'Sign out', auth: true, callback: signOut },
    { link: '/auth/sign-in', name: 'Sign in', auth: false, callback: hide.hideDrawerForcibly },
    { link: '/auth/sign-up', name: 'Sign up', auth: false, callback: hide.hideDrawerForcibly },
];


</script>

<template>
  <client-only>
      <div class="auth-menu">
          <ul class="auth-menu-list">
              <li
                  v-for="(link, key) in links"
                  :key="key"
                  @click="link.callback"
                  class="auth-menu-list-item d-flex align-items-center justify-space-between">
                  <template v-if="link.auth === isAuth && link.link">
                      <nuxt-link class="item-link" :to="link.link">{{ link.name }}</nuxt-link>
                      <div class="count-notify" v-if="link?.count">
                          <div>10</div>
                      </div>
                  </template>
                  <template v-if="link.auth === isAuth && !link.link">
                      <div class="item-link hover">{{ link.name }}</div>
                  </template>

              </li>
          </ul>
      </div>
  </client-only>
</template>