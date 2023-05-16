<script setup lang="ts">
import { hideOnClickMenu } from "~/composables/shared/HideOnClickMenu";

const hide = hideOnClickMenu();

const signOut = () => {
    console.log('auth');
    hide.hideDrawerForcibly();
}

const links = [
    { link: '/', name: 'Message', auth: true, callback: hide.hideDrawerForcibly, count: true },
    { link: '/', name: 'Notifications', auth: true, callback: hide.hideDrawerForcibly, count: false },
    { link: '/', name: 'Settings', auth: true, callback: hide.hideDrawerForcibly },
    { link: '', name: 'Sign out', auth: true, callback: signOut },
    { link: '', name: 'Sign in', auth: false, callback: signOut },
    { link: '', name: 'Sign up', auth: false, callback: signOut },
];


</script>

<template>
  <div class="auth-menu">
      <ul class="auth-menu-list">
          <li
              v-for="(link, key) in links"
              :key="key"
              @click="link.callback"
              class="auth-menu-list-item d-flex align-items-center justify-space-between">
              <template v-if="link.auth && link.link">
                  <nuxt-link class="item-link" :to="link.link">{{ link.name }}</nuxt-link>
                  <div class="count-notify" v-if="link?.count">
                      <div>10</div>
                  </div>
              </template>
              <template v-if="link.auth && !link.link">
                  <div class="item-link">{{ link.name }}</div>
              </template>

          </li>
      </ul>
  </div>
</template>