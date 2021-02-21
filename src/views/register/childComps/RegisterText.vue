<template>
    <div class="field">
        <!-- text动态绑定输入框的内容 -->
        <van-field v-model="text" 
                    :label="label"
                    :placeholder="placeholder"
                    :type="type"
                    :rule="rule" />
    </div>
</template>

<script>
export default {
    props: [
        'label',
        'placeholder',
        'type',
        'rule',
    ],
    data (){
        return {
            text: '',
        }
    },
    //watch可以对data里面的数据进行监听
    watch: {
        text (){//输入框的内容一旦发生改变则调用函数判断正则表达式
            this.handlerule();
        }

    },
    methods: {
        handlerule() {
            const rue = new RegExp(this.rule);
            //test()方法，用于检测字符是否匹配某个模式，有则返回true，否则返回false。
            if(rue.test(this.text)) {
                this.$emit('inputChange',this.text);
            }
        }
    }

}
</script>

<style>

</style>
