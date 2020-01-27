<template>
  <div class="home">
    <div id="modal1" class="modal">
      <div class="modal-content">
        <h4>Contact Edit</h4>
        <p>Change the information and click Save</p>
      </div>

      <div class="row">
        <div class="input-field col s6">
          <input
            placeholder="Name"
            id="name"
            type="text"
            v-model="name"
            class="validate"
          />
          <label for="name" class="active">Name</label>
        </div>
        <div class="input-field col s6">
          <input
            placeholder="(00) 00000-0000"
            id="phone"
            type="text"
            v-mask="'(##) #####-####'"
            v-model="phone"
            class="validate"
          />
          <label for="phone" class="active">Phone</label>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"
          >Cancel</a
        >
        <a @click="saveContact" class="waves-effect waves-light btn">Save</a>
      </div>
    </div>
    <NavBar />
    <div class="container c-card c-body-suspended">
      <h4 class="center">Contacts</h4>
      <table id="example" class="display" style="width:100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(i, idx) in contacts"
            :key="idx"
            @click="openModal(idx)"
            :class="{ 'blue lighten-4': i.SP }"
          >
            <td :class="{ 'blue lighten-4': i.SP }">{{ i.name }}</td>
            <td>{{ i.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";

import contacts from "./../../api/contacts";

import { Component, Vue, Emit, Watch } from "vue-property-decorator";
import VueMask from "v-mask";

Vue.use(VueMask);
/* interface JQuery {
  DataTable(): void;
} */
@Component({
  components: { NavBar }
})
export default class Home extends Vue {
  contacts: any = [];
  contactEdit = 0;
  name = "";
  phone = "";
  @Emit()
  tableGen() {
    $(document).ready(function() {
      const table: any = $("#example");
      table.DataTable();
      setTimeout(() => {}, 2000);
    });
  }

  checkDDD() {
    let temp = this.contacts;
    this.contacts = [];
    temp.map(e => {
      e.SP =
        e.phone
          .match(/\d+/g)
          .join("")
          .indexOf(11) == 0;
    });
    this.contacts = temp;
  }

  async getAllContacts() {
    const { data, status } = await contacts.getContacts();
    if (status === 200) {
      this.contacts = {};
      this.$nextTick(() => {
        this.name = data.data.name;
        this.phone = data.data.phone;
        this.contacts = data.data;
        this.checkDDD();
      });
    }
    this.tableGen();
  }

  openModal(idx: any) {
    this.$nextTick(() => {
      this.name = this.contacts[idx].name;
      this.phone = this.contacts[idx].phone;
    });
    // initialize all modals
    $(".modal").modal();

    // open modal from code
    $("#modal1").modal("open");
  }

  saveContact() {
    if (this.phone.length < 15) {
      alert("The phone is incorrect!");
      return false;
    }
    const names = this.name.split(" ");
    if (names.length < 2) {
      alert("The name must contain two words!");
      return false;
    }
    if (names[0].length < 3 || names[1].length < 3) {
      alert("The name must be longer!");
      return false;
    }
    this.contacts[this.contactEdit].name = this.name;
    this.contacts[this.contactEdit].phone = this.phone;
    $("#modal1").modal("close");
    this.checkDDD();
  }
  created() {
    this.getAllContacts();
  }
}
</script>
