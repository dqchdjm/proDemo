<!-- Created by henian.xu on 2018/2/2. -->

<template>
    <transition name="bounce">
        <div :class="['popup',{'tips':$type==='tips'}]"
             v-show="show"
             @click.self="handleAction('cancel')"
        >
            <div class="inner" v-if="$type==='tips'">
                <div class="body">{{message}}</div>
            </div>
            <div class="inner" v-else>
                <div class="header" v-if="title">
                    <div class="label">{{title}}</div>
                </div>
                <div :class="['body',{'flex':$type==='alert'||$type==='confirm'}]"
                     v-html="message"
                >
                    <x-input v-if="showInput"
                             v-model="inputValue"
                             type="textarea"
                             placeholder="请输入"
                             :autoSize="{maxRows:4}"

                    ></x-input>
                </div>
                <div class="footer">
                    <div :class="['btn fill',cancelBtnCls]"
                         v-if="showCancelBtn"
                         @click="handleAction('cancel')"
                         @keydown.enter="handleAction('cancel')"
                    >{{cancelBtnText}}
                    </div>
                    <div :class="['btn fill',confirmBtnCls]"
                         v-if="showConfirmBtn"
                         @click="handleAction('confirm')"
                         @keydown.enter="handleAction('confirm')"
                    >{{confirmBtnText}}{{delayConfirm>0?`(${delayConfirm})`:''}}
                    </div>
                </div>
                <div class="close-btn"
                     @click="handleAction('close')"
                ><i class="f-icon">&#xf022;</i></div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'messageBox',
    data () {
        return {
            show: false,
            showCancelBtn: false,
            cancelBtnText: '取消',
            showConfirmBtn: true,
            confirmBtnText: '确认',

            showInput: false,
            inputValue: '',

            closeTime: 2000,
            closeTimer: 0,

            delayConfirm: 0,
            delayConfirmTimer: 0,

            action: '',
            showCloseBtn: false,
            callback: null
        }
    },
    computed: {
        cancelBtnCls () {
            return 'btn-second'
        },
        confirmBtnCls () {
            if (this.delayConfirm) {
                return 'btn-g5'
            }
            return 'btn-main'
        }
    },
    watch: {
        show (val, oldVal) {
            if (this.$type === 'tips') {
                if (val) {
                    this.closeTimer = setTimeout(() => {
                        this.doClose()
                    }, this.closeTime)
                } else {
                    clearTimeout(this.closeTimer)
                    this.closeTimer = 0
                }
            } else if (this.delayConfirm > 0) {
                if (val) {
                    this.delayConfirmTimer = setInterval(() => {
                        this.delayConfirm--
                        if (this.delayConfirm <= 0) {
                            clearInterval(this.delayConfirmTimer)
                            this.delayConfirmTimer = 0
                        }
                    }, 1000)
                } else {
                    clearInterval(this.delayConfirmTimer)
                    this.delayConfirmTimer = 0
                }
            }
        }
    },
    methods: {
        handleAction (action) {
            if (action === 'confirm' && this.delayConfirm > 0) return
            this.action = action
            this.doClose()
        },
        doClose () {
            this.show = false
            this.callback(this.action, this)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "~@as/_index.scss";

    .popup {
        .inner {
            position: relative;
            min-width: 60%;
            max-width: 90%;
            min-height: 3rem;
            max-height: 80%;
            width: auto;
            background-color: #fff;
            border-radius: .05rem;
            overflow: hidden;

            > .body.flex {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: $padding-big * 1.5;
            }
            > .close-btn {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                position: absolute;
                top: .25rem;
                right: .25rem;

                width: .5rem;
                height: .5rem;
                font-size: .3rem;
            }
        }

        &.tips {
            background-color: rgba(0, 0, 0, 0);
            > .inner {
                width: auto;
                min-width: 50vw;
                max-width: 70vw;
                min-height: auto;
                background-color: rgba(0, 0, 0, .7);
                color: #fff;
                > .body {
                    text-align: center;
                }
            }
        }
    }
</style>
