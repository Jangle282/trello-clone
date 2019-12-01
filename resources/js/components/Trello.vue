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
          @cardDeleted="deleteCard"
          @listDeleted="deleteList"
          @updateCards="getCards"
        />

        <div class="list">
          <div v-if="listFormOpen" class="addListForm">
            <input
              v-model="newListData.name"
              type="text"
              name="title"
              id="title"
              ref="listTitle"
              @keyup.enter="fireCreateSlist"
            />
            <div @click="fireCreateSlist">Add</div>
            <div @click="toggleListForm">X</div>
          </div>
          <div v-else class="list-header">
            <div @click="toggleListForm" class="list-title-container">
              <h6>Add a List</h6>
            </div>
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

  created() {
    this.getCards();
    this.getLists();
  },

  methods: {
    // AXIOS methods
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

    fireCreateSlist() {
      const newList = this.newListData;
      this.lists.push(newList);
      this.clearAddListForm();
      axios
        .post("/slists", newList)
        .then(response => {
          this.getLists();
        })
        .catch(error => {
          console.log("error in when creating new list");
        });
      this.listFormOpen = false;
    },

    // state management
    toggleAddCards(listId) {
      this.listIdforopenAddCard = listId;
    },

    toggleListForm() {
      this.listFormOpen = !this.listFormOpen;
      this.$nextTick(() => {
        this.$refs.listTitle.focus();
      });
    },

    newCard(newCardData) {
      this.cards.push(newCardData);
      // this.getCards();
    },

    clearAddListForm() {
      this.newListData = {
        name: ""
      };
    },

    deleteCard(data) {
      this.cards = this.cards.filter(card => {
        return card.id !== data.id;
      });
    },

    deleteList(listId) {
      this.lists = this.lists.filter(list => {
        return list.id !== listId;
      });
    }
  }
};
</script>

<style lang="scss" scss>
@import "../../sass/app.scss";
</style>
