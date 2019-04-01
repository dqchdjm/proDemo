<template>
  <div v-title="pageData.title" class="page">
    <linker :to="`/login`">
      <h2>Essential Links</h2>
    </linker>
    <!-- <initLodding /> -->
  </div>
</template>

<script>
import ut from "@u/comm";
import mixinBase from "@m/base";
import { mapMutations, mapState } from "vuex";

export default {
  name: "index",
  mixins: [mixinBase],
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["sessionId", "sessionName"])
  },
  methods: {
    ...mapMutations("user", ["setSessionId"])
  },
  created() {
    console.log(this.pageData);
  },
  mounted() {
    console.log(this.$route);
    console.log(ut);
    console.log(this.sessionName);
  
    // this.setSessionId(1);
    // this.$messageBox.tips('请选择收货地址')

    // this.$utils.comm.alert()
    // ut.alert()

    // Home.postHome({ id: "7"}).then(d => {
    //   console.log(d);
    // });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.hello {
  background: url("~@/assets/logo.png");
  h1,
  h2 {
    font-weight: normal;
    font-size: 32px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
}
.icon {
  &:before {
    content: "\e611";
  }
}
.icon1 {
  &:before {
    content: "\eabe";
  }
}
</style>
