<template>
    <div>
        <div class="fixed-top">
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <router-link class="navbar-brand" to="/"><h1><u>Random</u></h1></router-link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <router-link active-class="active" class="nav-link" to="/me/write">Save draft</router-link>
                            </li>
                            <template v-if="auth">
                                <li class="nav-item active ml-3">
                                    <a active-class="active" class="btn btn-green text-green rounded-pill" @click="publish()">Publish</a>
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
        boxshadow: Boolean
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
<style scoped>
.fixed-top {
    position: absolute !important;
    border-bottom: 1px solid black;
}

</style>