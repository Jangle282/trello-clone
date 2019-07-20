 <template>
  <div>
    <TopBar />
    <div class="mainContainer">
      <div class="board">
        <List
          v-for="list in this.lists"
          :key="list.id"
          v-bind:cards="cards"
          v-bind:listIdforopenAddCard="listIdforopenAddCard"
          v-bind:slist="list"
          v-on:toggleAddCards="toggleAddCards"
          @newCardCreated="newCard"
        />

        <div class="list">
          <div v-if="listFormOpen" class="addListForm">
            <input v-model="newListData.name" type="text" name="title" id="title" />
            <button @click="fireCreateSlist">Add</button>
            <button @click="toggleListForm">X</button>
          </div>
          <div v-else class="addList">
            <p @click="toggleListForm">Add a List</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import TopBar from "./TopBar";
import Board from "./Board";
import List from "./List";

export default {
  name: "Trello",

  components: {
    TopBar,
    Board,
    List
  },

  data() {
    return {
      lists: null,
      cards: null,
      listIdforopenAddCard: null,
      listFormOpen: false,
      newListData: {
        name: ""
      }
    };
  },

  methods: {
    getCards() {
      axios.get("/cards").then(response => {
        this.cards = response.data;
      });
    },

    getLists() {
      axios.get("/slists").then(response => {
        this.lists = response.data;
      });
    },

    toggleAddCards(listId) {
      this.listIdforopenAddCard = listId;
    },

    toggleListForm() {
      this.listFormOpen = !this.listFormOpen;
    },

    fireCreateSlist() {
      axios
        .post("/slists", this.newListData)
        .then(response => {
          this.lists.push(this.newListData);
          this.newListData.name = "";
          this.getLists();
        })
        .catch(error => {
          console.log("error in when creating new list: ", error);
        });
      this.listFormOpen = false;
    },

    newCard(newCardData) {
      this.cards.push(newCardData);
      this.getCards();
    }
  },

  created() {
    this.getCards();
    this.getLists();
  }
};

//   in the controller - communicate with the databse - receive data objects the return a response after succeeding
//   user interactions for CRUD operations trigger emit events - passlisteners @listenername as prop down to child
//      emit the name of the listener fromt eh user interaction
//      listener triggers methods in teh main component
//      then use axios to make the AJAX calls (which go to the router then the controllers)
//        e.g. window.axios.get/post/deleteetc('list/delete').then(save the response to something or feedback success)
//
//
// create scroll boars
// wrap text on the list and card titles
// set up a dragging event and see if you can dynamically change the iD
//
</script>

<style lang="scss" scss>
@import "../../sass/app.scss";
</style>
