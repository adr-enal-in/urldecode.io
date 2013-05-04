(function() {
  var MainView, app_router, main_view;

  window.App = {};

  App.Router = Backbone.Router.extend({
    routes: {
      "*method": "methodChange"
    }
  });

  app_router = new App.Router;

  app_router.on('route:methodChange', function(method) {
    return $("[role=io-view]").trigger("methodChange", [method]);
  });

  Backbone.history.start();

  MainView = Backbone.View.extend({
    inputField: null,
    outputField: null,
    method: null,
    events: {
      "input [role=input]": "renderOutput",
      "methodChange": "onMethodChange"
    },
    initialize: function() {
      this.method = "decode";
      this.input = $("[role=input]");
      return this.output = $("[role=output]");
    },
    renderOutput: function() {
      var parsedValue;

      parsedValue = this.method === "decode" ? Url.decode(this.input.val()) : Url.encode(this.input.val());
      return this.output.val(parsedValue);
    },
    onMethodChange: function(event, data) {
      this.method = data;
      return console.log("New method:" + this.method);
    }
  });

  main_view = new MainView({
    el: $("[role=io-view]")
  });

}).call(this);
