<template>
  <div class="home">
    <!-- Modal Add -->
    <div id="modal-add" class="modal">
      <div class="modal-content">
        <h4>New Contact</h4>
        <p>Fill in the information and click Save</p>
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
        <a @click="addContact" class="waves-effect waves-light btn">Save</a>
      </div>
    </div>
    <!-- Modal Update -->
    <div id="modal-update" class="modal">
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
    <!-- Modal Delete -->
    <div id="modal-delete" class="modal">
      <div class="modal-content">
        <h4>Contact Delete</h4>
        <p>Are you sure you want to delete this contact?</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"
          >Cancel</a
        >
        <a @click="deleteContact" class="waves-effect waves-light btn red"
          >Delete</a
        >
      </div>
    </div>
    <NavBar />
    <div class="container c-card c-body-suspended">
      <h4 class="center">Contacts</h4>
      <div class="right">
        <a class="waves-effect waves-light btn" @click="openModalAdd"
          >New Contact</a
        >
      </div>
      <table id="example" class="display" style="width:100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(i, idx) in contacts"
            :key="idx"
            :class="{ 'blue lighten-4': i.SP }"
          >
            <td
              :class="{ 'blue lighten-4': i.SP }"
              class="pointer"
              @click="openModalUpdate(idx)"
            >
              {{ i.name }}
            </td>
            <td
              :class="{ 'blue lighten-4': i.SP }"
              class="pointer"
              @click="openModalUpdate(idx)"
            >
              {{ i.phone }}
            </td>
            <td :class="{ 'blue lighten-4': i.SP }" class="center">
              <i @click="openModalUpdate(idx)" class="icon material-icons"
                >open_in_new</i
              >
              <i @click="openModalDelete(idx)" class="icon material-icons"
                >delete</i
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
const contacts = require("./../../api/contacts").default;
import "jquery";
import { Component, Vue, Emit, Watch } from "vue-property-decorator";

const VueMask = require("v-mask").default;

Vue.use(VueMask);

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
    temp.map((e: any) => {
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
        this.initModal();
      });
    }
    this.tableGen();
  }

  initModal() {
    // initialize all modals
    let modals: any = $(".modal");
    modals.modal();
  }

  openModalUpdate(idx: any) {
    this.contactEdit = idx;
    this.$nextTick(() => {
      this.name = this.contacts[idx].name;
      this.phone = this.contacts[idx].phone;
    });

    // open modal from code
    let modal: any = $("#modal-update");
    modal.modal("open");
  }

  openModalDelete(idx: any) {
    this.contactEdit = idx;

    // open modal from code
    let modal: any = $("#modal-delete");
    modal.modal("open");
  }

  openModalAdd() {
    this.name = "";
    this.phone = "";

    // open modal from code
    let modal: any = $("#modal-add");
    modal.modal("open");
  }

  addContact() {
    if (this.validContact()) {
      this.contacts.push({
        name: this.name,
        phone: this.phone
      });

      // open modal from code
      let modal: any = $("#modal-add");
      modal.modal("close");
    }
  }

  validContact() {
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
    return true;
  }

  saveContact() {
    if (this.validContact()) {
      this.contacts[this.contactEdit].name = this.name;
      this.contacts[this.contactEdit].phone = this.phone;

      let modal: any = $("#modal-update");
      modal.modal("close");
      this.checkDDD();
    }
  }

  deleteContact() {
    this.contacts.splice(this.contactEdit, 1);

    let modal: any = $("#modal-delete");
    modal.modal("close");
    this.checkDDD();
  }

  created() {
    this.getAllContacts();
  }
}
</script>
