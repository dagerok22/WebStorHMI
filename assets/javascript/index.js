var app = {};

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

app.Storeview = Backbone.View.extend({
    el: '#todo-list',
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this; // enable chained calls
    }
});

app.ItemsSet = Backbone.Collection.extend({
    model: app.Item,
    localStorage: new Store("backbone-store")
});
app.itemSet = new app.ItemsSet();

app.ItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item',
    template: _.template($('#item-template').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this; // enable chained calls
    },
    initialize: function () {
        this.render();
    },
});

var getTestData = function () {
    for (let i = 0; i < 10; i++) {
        let item = [];
        item.add(new app.Item({
            name: 'item ' + i,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, alias corporis ex explicabo incidunt ipsam labore minima rem veniam? Aliquam distinctio quia sed tempore velit! Ab maiores suscipit ullam velit?',
            category: 'face for',
            price: i * 100 + i * 12,
            number: i * 5 + i * 3
        }));
        return item;
    }
};

app.Login = Backbone.View.extend({
    el: '#main-section',
    template: _.template($('#login-page-template').html()),
    render: function () {
        this.$el.html(this.template());
        return this; // enable chained calls
    },
    initialize: function () {
        this.render();
    },
});

app.AppView = Backbone.View.extend({
    el: '#main-section',
    initialize: function () {
        // for (let i = 0; i < 10; i++) {
        //     var item = new app.Item({
        //         id:i,
        //         name: 'item ' + i,
        //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, alias corporis ex explicabo incidunt ipsam labore minima rem veniam? Aliquam distinctio quia sed tempore velit! Ab maiores suscipit ullam velit?',
        //         category: 'face for',
        //         price: i * 100 + i * 12,
        //         number: i * 5 + i * 3
        //     });
        //     app.itemSet.create(item)
        // }
        // var t;
        // while (t = app.itemSet.first())
        // t.destroy();
        $('#main-section').append('<ul id="item-list" class="list-group"></ul>')
        app.itemSet.on('add', this.addOne, this);
        app.itemSet.fetch(); // Loads list from local storage
    },
    events: {
        'click #addToBucket': 'addToBucket'
    },
    addToBucket: function (e) {
        console.log(e);
    },
    addOne: function (item) {
        var view = new app.ItemView({model: item});
        $('#item-list').append(view.render().el);
    },
    addAll: function () {
        this.$('#item-list').html(''); // clean the todo list
        app.todoList.each(this.addOne, this);
    },
});

function validateRegister() {
    registerNewUser();
}

function registerNewUser() {
    app.users = new app.Users();
    app.users.fetch();
    var similarUser = app.users.findWhere({name:document.forms["register-form"]["username"].value});
    if (similarUser != null || similarUser != undefined) {
        alert("Similar user exists");
        return false;
    }
    similarUser = app.users.findWhere({email:document.forms["register-form"]["email"].value});
    if (similarUser != null || similarUser != undefined) {
        alert("Similar user exists");
        return false;
    }
    console.log(similarUser);
    let user = new app.User({
        id: app.users.length,
        bucket: new app.Bucket(),
        name: document.forms["register-form"]["username"].value,
        password: document.forms["register-form"]["password"].value,
        email: document.forms["register-form"]["email"].value
    });
    app.users.create(user);
    return false;
}
function validateLogin() {
    app.users = new app.Users();
    app.users.fetch();
    var user = app.users.findWhere({name:document.forms["login-form"]["username"].value});

    if (user == null || user == undefined) {
        alert("Such user does not exist");
        return false;
    }
    if (user.get('password') == document.forms["login-form"]["password"].value) {
        loginUser();
    } else {
        alert("Wrong password or username");
    }
    return false;
}

var appView;
var loginView = new app.Login();
function loginUser() {

    alert("You are logged in");
    $('#main-section').html('');
    appView = new app.AppView()
}
// var appView = new app.AppView();
