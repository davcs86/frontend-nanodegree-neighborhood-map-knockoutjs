/*eslint no-unused-vars: [2, { "args": "all", "argsIgnorePattern": "allBindings|viewModel|bindingContext", "varsIgnorePattern": "allBindings|viewModel|bindingContext" }]*/
/*global ko*/
ko.bindingHandlers.polymerBind = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
        // First get the latest data that we're bound to
        var value = valueAccessor();

        // Next, whether or not the supplied model property is observable, get its current value
        var valueUnwrapped = ko.unwrap(value);

        element.set(valueUnwrapped.property, valueUnwrapped.propertyValue());
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.
        // First get the latest data that we're bound to
        var value = valueAccessor();

        // Next, whether or not the supplied model property is observable, get its current value
        var valueUnwrapped = ko.unwrap(value);

        element.set(valueUnwrapped.property, valueUnwrapped.propertyValue());
    }
};
