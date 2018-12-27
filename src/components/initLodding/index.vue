<!-- Created by jianchun.dai on 2018/12/26. -->

<template>
  <div class="init" v-if="show">
    <div class="initLodding">
      <div class="icon">
        <img src="~@/assets/images/icon/lodding.png" alt>
      </div>
      <p v-html="text"></p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'initLodding',
    data () {
        return {}
    },
    props: {
        show: {
            type: Boolean,
            default: true
        },
        text: {
            type: String,
            default () {
                return '加载中!!!'
            }
            // required: true,
        }
    },
    computed: {},
    watch: {},
    methods: {},
    created () {},
    mounted () {}
}
</script>

<style lang="scss"  >
.init {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  .initLodding {
    padding: 0.2rem;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 0.15rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    z-index: 999;
    max-width: 55%;
    text-align: center;
    .icon {
      width: 100px;
      height: 100px;
      overflow: hidden;
      position: relative;
      img {
        position: absolute;
        width: 30px;
        height: 30px;

        animation: mymove 1.5s infinite;
        -webkit-animation: mymove 1.5s infinite;
      }
    }

    p {
      color: #fff;
    }
    @keyframes mymove {
      from {
        top: 2.5rem;
        left: 2.5rem;
        // transform: rotate(0deg);
      }
      to {
        // transform: rotate(-360deg);
        top: -1rem;
        left: -1rem;
      }
    }

    @-webkit-keyframes mymove {
      from {
        top: 2.5rem;
        left: 2.5rem;
        // transform: rotate(0deg);
      }
      to {
        // transform: rotate(-360deg);
        top: -1rem;
        left: -1rem;
      }
    }
  }
}
</style>
