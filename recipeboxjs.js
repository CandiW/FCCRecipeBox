"use strict";

// recipe content
var recipes = [{ id: 0, title: "Epic Grilled Ham and Cheese Sandwich", ingredients: "2 slices whole grain bread, 1 tbls. butter, 3-4 slices ham, 1 slice Tillamook Sharp Cheddar cheese, 1 slice Tillamook Pepper Jack cheese, 1 tbls. mayo, 1 tbls. Grey Poupon Mustard, 1 slice red onion, A few slices of red bell pepper", directions: "On the bread, spread mayo and Grey Poupon mustard. Top with ham, cheeses, onion, red pepper, and other slice of bread.  In a small frying pan, melt half the tablespoon of butter. Once melted, place sandwich in the pan. Cover with a lid. Grill the sandwich for 3-5 minutes per side, watching closely. Enjoy with a steaming hot bowl of roasted red pepper and tomato soup :)" }, { id: 1, title: "Beef and Vegetable Crock Pot Stew", ingredients: "1 large beef pot roast, 6 diced red potatoes, 1 diced red onion, 1 head chopped celery, 8 sliced carrots, 1 bag frozen peas, 1 quart beef broth, Salt and pepper, Seasoning to taste", directions: "Rub roast with adequate salt and pepper. Place in large crock pot. Add all vegetables and any other seasonings to taste. Add beef broth over the top. Turn crock pot on 'high' for 6-7 hours." }, { id: 2, title: "Chunky Breakfast Cookies", ingredients: "1 cup (2 sticks) softened butter, 1-1/2 cups packed brown sugar, 2 eggs, 1 tsp. baking soda, 1 tsp. vanilla extract, 2 cups whole wheat flour, 2 cups chocolate chips, 3 cups rolled oats, 1-1/2 cup chopped pecan halves, 1-1/2 cups raisins", directions: "Preheat oven to 375*. In a large mixing bowl, beat butter and sugar together until creamy. Add eggs, vanilla and baking soda. Mix until combined. Add flour, chocolate chips, oats, pecans, and raisins...mixing after each addition. Spoon by the tablespoonful onto an ungreased cookie sheet. Bake for 8-10 minutes. Enjoy with a tall glass of milk :)" }];

// set recipes to local storage, get from local storage (global variable to use later)
var getRecipes;
if (localStorage.getItem('_CandiW_recipes') === null) {
  localStorage.setItem('_CandiW_recipes', JSON.stringify(recipes));
} else {
  getRecipes = JSON.parse(localStorage.getItem('_CandiW_recipes'));
}

// Recipe component - how each recipe will render on the page, accepts props

var Recipe = React.createClass({
  displayName: "Recipe",

  getInitialState: function getInitialState() {
    return {
      id: this.props.id
    };
  },
  deleteRecipe: function deleteRecipe() {
    this.props.trash(this.state.id);
  },
  openModal: function openModal() {
    $('#' + this.state.id).show();
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "container-fluid custom-background" },
        React.createElement("i", { className: "fa fa-caret-right fa-lg" }),
        " ",
        React.createElement(
          "a",
          { id: "title-click", "data-toggle": "collapse", href: "#" + this.props.title.replace(/\s+/g, '') + this.state.id, "aria-expanded": "false", "aria-controls": this.props.title.replace(/\s+/g, '') + this.state.id },
          this.props.t
        ),
        React.createElement(
          "div",
          { className: "collapse", id: this.props.title.replace(/\s+/g, '') + this.state.id },
          React.createElement(
            "a",
            { className: "pull-right", "data-toggle": "collapse", href: "#" + this.props.title.replace(/\s+/g, '') + this.state.id, "aria-expanded": "false", "aria-controls": this.props.title.replace(/\s+/g, '') + this.state.id },
            React.createElement("i", { id: "close-recipe", className: "fa fa-times" })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "h4",
              null,
              "Ingredients:"
            ),
            React.createElement(
              "ul",
              null,
              this.props.ingredients
            ),
            React.createElement(
              "h4",
              { id: "directions" },
              "Directions:"
            ),
            React.createElement(
              "p",
              null,
              this.props.directions
            )
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "a",
              { id: "trash", type: "button", className: "btn pull-right", "data-toggle": "collapse", href: "#" + this.props.title.replace(/\s+/g, '') + this.state.id, "aria-expanded": "false", "aria-controls": this.props.title.replace(/\s+/g, '') + this.state.id, onClick: this.deleteRecipe },
              React.createElement("i", { className: "fa fa-trash-o fa-lg" })
            ),
            React.createElement(
              "a",
              { id: "edit", type: "button", className: "btn pull-right", href: "#" + this.state.id },
              React.createElement("i", { className: "fa fa-pencil fa-lg" })
            )
          )
        )
      )
    );
  }
});

// Modal for recipes - handles add/edit, sets state, show/hide modal, accepts props

var RecipeModal = React.createClass({
  displayName: "RecipeModal",

  getInitialState: function getInitialState() {
    return {
      r: this.props.r,
      id: this.props.id,
      t: this.props.t,
      ings: this.props.ings,
      dir: this.props.dir
    };
  },
  addTitle: function addTitle(e) {
    this.setState({ t: e.target.value });
  },
  addIngs: function addIngs(e) {
    this.setState({ ings: e.target.value });
  },
  addDir: function addDir(e) {
    this.setState({ dir: e.target.value });
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ id: nextProps.id, t: nextProps.t, ings: nextProps.ings, dir: nextProps.dir });
  },
  handleAdd: function handleAdd() {
    var id = this.props.r.length;
    function getId(id) {
      return id++;
    }
    var recipe = [{
      id: getId(id),
      title: this.state.t,
      ingredients: this.state.ings,
      directions: this.state.dir
    }];
    this.props.add(recipe);
  },
  handleEdit: function handleEdit() {
    var recipe = {
      id: this.state.id,
      title: this.state.t,
      ingredients: this.state.ings,
      directions: this.state.dir
    };
    this.props.edit(recipe, this.state.id);
  },
  handleClick: function handleClick() {
    if (this.state.id !== "modal") {
      this.handleEdit();
      $('#' + this.state.id).hide();
    } else {
      this.handleAdd();
      $('#' + this.state.id).hide();
    }
  },
  render: function render() {
    $('#' + this.state.id).show();
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { id: this.state.id, className: "container-fluid modal-box" },
        React.createElement(
          "span",
          null,
          React.createElement(
            "a",
            { type: "button", href: "#close", title: "Close", className: "close" },
            React.createElement("i", { className: "fa fa-times fa-lg" })
          )
        ),
        React.createElement(
          "div",
          { id: "modal-content" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "form",
              { onSubmit: this.handleSubmit },
              React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                  "label",
                  { htmlFor: "recipe-title" },
                  "Title"
                ),
                React.createElement("input", { type: "text", className: "form-control", rows: "1", placeholder: "Recipe Title", value: this.state.t, onChange: this.addTitle })
              ),
              React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                  "label",
                  { htmlFor: "ingredients-list" },
                  "Ingredients"
                ),
                React.createElement("textarea", { type: "text", className: "form-control", rows: "2", placeholder: "Ingredients seperated by commas", value: this.state.ings, onChange: this.addIngs })
              ),
              React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                  "label",
                  { htmlFor: "directions-text" },
                  "Directions"
                ),
                React.createElement("textarea", { type: "text", className: "form-control", rows: "4", placeholder: "Directions here :)", value: this.state.dir, onChange: this.addDir })
              )
            )
          ),
          React.createElement(
            "a",
            { id: "save", type: "button", className: "btn pull-right", href: "#close" },
            React.createElement("i", { className: "fa fa-floppy-o fa-lg", onClick: this.handleClick })
          )
        )
      )
    );
  }

});

// parent component, the whole recipe box - get initial recipes from local storage, add/edit/trash functions, rendering of recipes

var RecipeBox = React.createClass({
  displayName: "RecipeBox",

  getInitialState: function getInitialState() {
    return {
      r: this.props.r,
      t: this.props.t,
      ings: this.props.ings,
      dir: this.props.dir
    };
  },
  add: function add(recipe) {
    var addRecipe = this.state.r.concat(recipe);
    this.setState({ r: addRecipe });
    localStorage.setItem('_CandiW_recipes', JSON.stringify(addRecipe));
  },
  edit: function edit(recipe, index) {
    var editRecipe = this.state.r.slice();
    editRecipe[index] = recipe;
    this.setState({ r: editRecipe });
    localStorage.setItem('_CandiW_recipes', JSON.stringify(editRecipe));
  },
  trash: function trash(index) {
    var recipes = this.state.r;
    recipes.filter(function (item, i) {
      if (i === index) {
        recipes.splice(i, 1);
      }
      localStorage.removeItem(item);
      return item.id !== index;
    });
    this.setState({ r: this.state.r });
    localStorage.setItem('_CandiW_recipes', JSON.stringify(this.state.r));
  },
  getRecipes: function getRecipes() {
    var add = this.add;
    var edit = this.edit;
    var trash = this.trash;
    var r = JSON.parse(localStorage.getItem('_CandiW_recipes'));
    var key = 1;
    var key2 = 100;
    var key3 = 1000;

    return r.map(function (item, index) {
      function each() {
        var ings = item.ingredients.split(',');
        return ings.map(function (el, i) {
          return React.createElement(
            "li",
            { key: i },
            el
          );
        });
      }
      return React.createElement(
        "div",
        { key: key2++ },
        React.createElement(Recipe, { key: key++, title: item.title, ingredients: each(), directions: item.directions, id: index, r: r, t: item.title, trash: trash }),
        React.createElement(RecipeModal, { key: key3++, t: item.title, ings: item.ingredients, id: index, dir: item.directions, r: r, edit: edit, add: add })
      );
    });
  },
  render: function render() {
    var recipes = this.getRecipes() || [];
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "well" },
        React.createElement(
          "div",
          { className: "container-fluid" },
          recipes
        )
      ),
      React.createElement(
        "div",
        { className: "col-xs-4 col-sm-4 col-md-4 col-lg-4 center-block" },
        React.createElement(
          "a",
          { id: "new-recipe-button", type: "button", className: "btn btn-lg", href: "#modal" },
          "Add New Recipe"
        )
      ),
      React.createElement(RecipeModal, { id: "modal", r: this.state.r, t: "", ings: "", dir: "", add: this.add })
    );
  }
});

ReactDOM.render(React.createElement(RecipeBox, { r: getRecipes }), document.getElementById("recipe-box"));
