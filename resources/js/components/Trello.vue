 <template>
  <div class="mainContainer">
    <TopBar/>
    <div class="board">
      <List v-bind:cards="cards" v-for="list in this.lists" :key="list.id" v-bind:slist="list"/>
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
      cards: null
    };
  },

  method: {},

  computed: {},

  mounted() {
    console.log("Mounted", this.lists, this.cards);
  },

  created() {
    window.axios.get("/slists").then(response => {
      this.lists = response.data;
    });
    window.axios.get("/cards").then(response => {
      this.cards = response.data;
      console.log("cards be here", this.cards);
    });
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


