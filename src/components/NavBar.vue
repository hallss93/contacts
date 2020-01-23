<template>
  <div>
    <nav class="blue darken-2">
      <div class="nav-wrapper">
        <router-link :to="{ path: '/' }" class="brand-logo">
          <img src="@/assets/logo.png" alt="Logo" class="c-logo" />
        </router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <router-link :to="{ path: '/' }">Link</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="c-sub-navbar blue lighten-4"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
}
</script>