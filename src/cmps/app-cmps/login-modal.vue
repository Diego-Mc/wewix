<template>
    <section class="login-modal">
        <div v-if="isLogin">
            <h3>login</h3>
            <div class="login-input-container">
                <label for="">username</label>
                <input v-model="loginCred.username" type="text">
            </div>
            <div class="login-input-container">
                <label for="">password</label>
                <input v-model="loginCred.password" type="text">
            </div>

            <button @click="onLogin">login</button>
            don't have a user? <button @click="(isLogin = !isLogin)">signup</button>
        </div>
        <div v-else>
            <h3>sign up</h3>
            <div class="login-input-container">
                <label for="">full name</label>
                <input v-model="signupCred.username" type="text">
            </div>
            <div class="login-input-container">
                <label for="">username</label>
                <input v-model="signupCred.username" type="text">
            </div>
            <div class="login-input-container">
                <label for="">password</label>
                <input v-model="signupCred.password" type="text">
                <label for="">confirm password</label>
                <input v-model="confirmedPassword" type="text">
            </div>

            <button @click="onSignup()">signup</button>
            <button @click="(isLogin = !isLogin)">back to login</button>
        </div>

    </section>
</template>

<script>
import { userService } from '../../services/user.service';

export default {
    data() {
        return {
            isLogin: true,
            loginCred: { username: 'user1', password: '123' },
            signupCred: { username: '', password: '', fullname: '', imgUrl: '' },
            confirmedPassword: null
        }
    },
    created() {
        this.loginCred.username = 'puki'
        this.loginCred.password = '123'
        this.onLogin(this.userCred)
    },
    methods: {
        async onLogin() {
            try {
                const userCred = await userService.login(this.loginCred)
                console.log(userCred);
                this.$store.dispatch({ type: 'login', userCred })
            } catch (err) {
                console.log('oops couldnet signin', err);
            }
        },
        async onSignup() {
            if (this.confirmedPassword !== this.userCred.password) {
                //TODO: nofity user
                return console.log('passwords not matching');
            }
            try {
                const userCred = await userService.signup(this.signupCred)
                this.$store.dispatch({ type: 'signup', userCred })
            } catch (err) {
                console.log('oops couldnet sign up', err);
            }
        }
    }
}
</script>

<style>
/* TODO: delete style*/
.login-modal {
    background-color: antiquewhite;
    margin: 20px;
}

.login-modal button {
    background-color: aqua;
}

.login-input-container {
    display: flex;
    flex-direction: column;
}
</style>