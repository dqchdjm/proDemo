<template>
    <a :href="to" v-if="isUrl">
        <slot></slot>
    </a>
    <router-link
        v-else
        v-bind="$props"
    >
        <slot></slot>
    </router-link>
</template>

<script>
const urlReg = new RegExp(/[a-zA-z]+:(\/\/)*[^\s]*/)
export default {
    name: 'linker',
    data () {
        return {}
    },
    props: {
        to: {
            type: String,
            default: '',
            required: true
        },
        replace: {
            type: Boolean,
            default: false
        },
        append: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'a'
        }
    },
    computed: {
        isUrl () {
            return urlReg.test(this.to)
        }
    }
}
</script>

<style scoped>

</style>
