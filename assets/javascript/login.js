$(function () {

    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});

var app = {};


app.Item = Backbone.Model.extend({
    defaults: {
        id: 0,
        name: '',
        description: '',
        category: '',
        price: '',
        number: '',
    },
});

app.Bucket = Backbone.Collection.extend({
    model: app.Item,
    localStorage: new Store("bucket")
});

app.User = Backbone.Model.extend({
    defaults: {
        id: 0,
        name: '',
        password: '',
        email: '',
        bucket: undefined,
    }
});

app.Users = Backbone.Collection.extend({
    model: app.User,
    localStorage: new Store("user")
});

function validateRegister() {
    registerNewUser();
}

function registerNewUser() {
    app.users = new app.Users();
    app.users.fetch();
    var similarUser = _.find(app.users, (user) => {
        user.name == document.forms["register-form"]["username"].value ||
        user.email == document.forms["register-form"]["email"].value
    });
    console.log(similarUser);
    if (similarUser != null || similarUser != undefined) {
        alert("Similar user exists");
        return;
    }
    let user = new app.User({
        id: app.users.length,
        bucket: new app.Bucket(),
        name: document.forms["register-form"]["username"].value,
        password: document.forms["register-form"]["password"].value,
        email: document.forms["register-form"]["email"].value
    });
    app.users.create(user);
}

function loginUser() {
    alert("You are logged in");
}

function validateLogin() {
    app.users = new app.Users();
    app.users.fetch();
    var user = app.users.findWhere({name:document.forms["login-form"]["username"].value});

    if (user == null || user == undefined) {
        alert("Such user does not exist");
        return;
    }
    if (user.get('password') == document.forms["login-form"]["password"].value) {
        loginUser();
    } else {
        alert("Wrong password or username");
    }
}