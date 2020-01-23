<template>
  <div class="home">
    <NavBar />
    <div class="container c-card c-body-suspended">
      <h4 class="center">Contacts</h4>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";

import { Component, Vue, Emit, Watch } from "vue-property-decorator";

@Component({
  components: { NavBar }
})
export default class Home extends Vue {}
</script>
