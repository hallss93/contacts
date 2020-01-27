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
            placeholder="Placeholder"
            id="name"
            type="text"
            v-model="first_name"
            class="validate"
          />
          <label for="name" class="active">Name</label>
        </div>
        <div class="input-field col s6">
          <input
            placeholder="Placeholder"
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
            <td :class="{ 'blue lighten-4': i.SP }">
              {{ i.first_name }} {{ i.last_name }}
            </td>
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
/* interface JQuery {
  DataTable(): void;
} */
@Component({
  components: { NavBar }
})
export default class Home extends Vue {
  contacts: any = [];
  contactEdit = 0;
  first_name = "";
  phone = "";
  @Emit()
  tableGen() {
    $(document).ready(function() {
      const table: any = $("#example");
      console.log(table);
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
        this.first_name = data.data.first_name;
        this.phone = data.data.phone;
        this.contacts = data.data;
        this.checkDDD();
      });
    }
    this.tableGen();
  }

  openModal(idx: any) {
    this.$nextTick(() => {
      this.first_name = this.contacts[idx].first_name;
      this.phone = this.contacts[idx].phone;
    });
    // initialize all modals
    $(".modal").modal();

    // open modal from code
    $("#modal1").modal("open");
  }

  saveContact() {
    this.contacts[this.contactEdit].first_name = this.first_name;
    this.contacts[this.contactEdit].phone = this.phone;
    $("#modal1").modal("close");
    this.checkDDD();
  }
  created() {
    this.getAllContacts();
  }
}
</script>
