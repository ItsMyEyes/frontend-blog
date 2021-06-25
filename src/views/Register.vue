<template>
  <div class="home">
    <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <img src="../assets/image/undraw_remotely_2j6y.svg" alt="Image" class="img-fluid">
        </div>
        <div class="col-md-6 contents">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="mb-4">
              <h3>Sign In</h3>
              <p class="mb-4">You are not have some account?? <router-link to="/sign-up">register here</router-link></p>
            </div>
            <form @submit.prevent="login()" method="post">
              <div class="form-group first">
                <label for="email">Name</label>
                <input type="text" class="form-control" id="email" v-model="form.name">
              </div>
              <div class="form-group first">
                <label for="email">username</label>
                <input type="text" class="form-control" id="email" v-model="form.username">
              </div>
              <div class="form-group first">
                <label for="email">email</label>
                <input type="Email" class="form-control" id="email" v-model="form.email">
              </div>
              <div class="form-group first">
                <label for="email">Password</label>
                <input type="password" class="form-control" id="email" v-model="form.password">
              </div>
              <div class="form-group last mb-4">
                <label for="email">Retype Password</label>
                <input type="password" class="form-control" id="email" v-model="password_retype">
                
              </div>
              
              <div class="d-flex mb-5 align-items-center">
                <label class="control control--checkbox mb-0"><span class="caption">Accept terms</span>
                  <input type="checkbox" required/>
                  <div class="control__indicator"></div>
                </label>
              </div>

              <button type="submit" class="btn btn-block btn-primary"><i v-if="loading" class="fa fa-circle-o-notch fa-spin" style="font-size:24px; color: white"></i> Log In</button>

              <span class="d-block text-left my-4 text-muted text-center">&mdash; or login with &mdash;</span>
              
              <div class="social-login text-center">
                <a href="#" class="facebook m-2">
                  <span class="icon-facebook mr-3"></span> 
                </a>
                <a href="#" class="twitter m-2">
                  <span class="icon-twitter mr-3"></span> 
                </a>
                <a href="#" class="google m-2">
                  <span class="icon-google mr-3"></span> 
                </a>
                <a href="#" class="github m-2">
                  <span class="icon-github mr-3"></span> 
                </a>
              </div>
            </form>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import $ from 'jquery'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      loading: false,
      form: {
        name: null,
        username: null,
        email: null,
        password: null,
      },
      password_retype: null,
    }
  },
  components: {

  },
  mounted() {
    $('.form-control').on('input', function() {
      var $field = $(this).closest('.form-group');
      if (this.value) {
        $field.addClass('field--not-empty');
      } else {
        $field.removeClass('field--not-empty');
      }
    });
  },
  methods: {
    ...mapActions({
      auth: 'user/register'
    }),
    login() {
      if (this.form.password != this.password_retype)
          return this.$toasted.show("Password not same", { 
            theme: "outline", 
            position: "top-center", 
            duration : 5000
          });

      this.loading = true
      $('.btn-block').attr('disabled','disabled')
      $('#app').addClass('blur')

      this.form.profile_photo = 'https://www.insoft.co.id/wp-content/uploads/2014/05/default-user-image.png'

      this.auth(this.form).then((res) => {
        this.$toasted.show(res.message, { 
          theme: "outline", 
          position: "top-center", 
          duration : 5000
        });
        setTimeout(() => {
          this.$router.push('/')
        }, 1000); 
      }).catch(err => {
        console.log(err)
        const error = (err.details) ? err.details.body[0].message : err.message
        this.$toasted.show(error, { 
          theme: "outline", 
          position: "top-center", 
          duration : 5000
        });
      }).finally(() => {
        this.loading = false
        $('.btn-block').removeAttr('disabled','')
        $('#app').removeClass('blur')
      })

    }
    
  }
}
</script>
<style scoped>
@import url('../assets/login.css');
body:before {
    content: "";
    background: url(https://gambolthemes.net/html-items/cursus_demo_f12/images/sign.svg) no-repeat center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    pointer-events: none;
    background-size: cover;
    opacity: 0.04;
}
</style>
