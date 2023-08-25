<template>
    <Dialog :visible="isDialogVisible" modal header="Delete confirmation" :style="{ width: '30vw' }">
        <p>Are you sure you want to delete <strong>{{ name }}</strong>?</p>
        <template #footer>
            <Button label="No" icon="pi pi-times" @click="switchIsDialogVisible" />
            <Button label="Yes, delete" icon="pi pi-check" @click="onConfirm" />
        </template>
    </Dialog>
</template>

<script>
export default {
    props: {
        isDialogVisible: Boolean,
        name: String,
    },
    methods: {
        switchIsDialogVisible() {
            this.$emit('switchIsDialogVisible')
        },
        onConfirm() {
            this.$emit("onConfirm")
        }
    }
}
</script>

<style scoped></style>