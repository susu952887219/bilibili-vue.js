<template>
    <div @click="editClick" class="edit-item">
        <div>
            <slot name="left"></slot>
        </div>
        <div>
            <slot name="center"></slot>
        </div>
        <div>
            <slot name="right"></slot>
        </div>
    </div>
  
</template>

<script>
export default {
    methods: {
        editClick(){
            this.$emit('editClick')
        }
    }

}
</script>

<style  scoped>
.edit-item {
    background-color: #fff;
    padding: 15px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #333;
    flex: 1;

}

</style>