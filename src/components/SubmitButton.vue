<template>
    <div>
        <button class="btn btn-success" @click="submit()">Submit</button>
    </div>
</template>

<script>    
    export default {
        methods: {
            submit() {
                this.$firestore.storeData(null)
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>