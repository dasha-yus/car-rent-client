<template>
    <div class="wrapper">
        <div class="block">
            <img src="/images/404/undraw_page_not_found_re_e9o6.svg" alt="404" height="400" />
            <div class="text">
                <h1>Page not found</h1>
                <h4 class="subtext">The page you were looking for does not exist</h4>
                <Button label="Go home" class="btn" @click="redirectToHomePage" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        redirectToHomePage() {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.wrapper {
    height: calc(100vh - 66px);
    position: relative;
}

.block {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.text {
    margin-top: 30px;
    text-align: center;
}

.subtext {
    margin-top: 10px;
}

.btn {
    margin-top: 30px;
    text-transform: uppercase;
}
</style>