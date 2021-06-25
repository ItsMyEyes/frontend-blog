<template>
    <div>
        <div class="fixed-top" :class="(jenis == 'biasa') ? 'bg-biasa' : 'bg-medium-yellow' " id="local" >
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <router-link class="navbar-brand" to="/"><h1><u>Random</u></h1></router-link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <router-link active-class="active" class="nav-link" to="/">Our Story <span class="sr-only">(current)</span></router-link>
                            </li>
                            <li class="nav-item active">
                                <router-link active-class="active" class="nav-link" to="/me/write">Write</router-link>
                            </li>
                            <template v-if="!auth">
                                <li class="nav-item active">
                                    <router-link active-class="active" class="nav-link" to="/sign-in">Sign In</router-link>
                                </li>
                                <li class="nav-item active ml-3">
                                    <router-link active-class="active" class="btn btn-dark rounded-pill" to="/sign-in">Get Started</router-link>
                                </li>
                            </template>
                            <template v-if="auth">
                                <li class="nav-item active ml-3">
                                    <a active-class="active" :class="(jenis == 'biasa') ? 'btn-green text-green' : 'btn-dark'" class="btn rounded-pill" @click="logout()">@{{ username }}</a>
                                </li>
                            </template>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import $ from 'jquery'

export default {
    data() {
        return {
            username: null,
            auth: false
        }
    },
    props: {
        jenis: String,
        boxshadow: Boolean,
    },
    mounted() {
        if (this.$store.state.user.auth) {
            this.auth = true
            this.username = this.$store.state.user.user.username || ''
        } 
    },
    methods: {
        ...mapActions({
            signout: 'user/logout'
        }),

        logout() {
            $('#app').addClass('blur')
            this.signout().then(() => {
                $('#app').removeClass('blur')
                window.location.reload()
            })
        }
    }

}
</script>
<style>

</style>/