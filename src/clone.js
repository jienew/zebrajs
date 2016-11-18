/**
 *  Creates a deep copy of the set of matched elements.
 *
 *  This method performs a deep copy of the set of matched elements meaning that it copies the matched elements as well
 *  as all of their descendant elements and text nodes.
 *
 *  Normally, any event handlers bound to the original element are not copied to the clone. Setting the `with_data_and_events`
 *  argument to `true` will copy the event handlers and element data bound to the original element.
 *
 *  > This method may lead to duplicate element IDs in a document. Where possible, it is recommended to avoid cloning
 *  elements with this attribute or using class attributes as identifiers instead.
 *
 *  @param  {boolean}   with_data_and_events        Setting this argument to `true` will instruct the method to also copy
 *                                                  event handlers and element data along with the elements.
 *
 *  @param  {boolean}   deep_with_data_and_events   Setting this argument to `true` will instruct the method to also copy
 *                                                  event handlers and data for all children of the cloned element.
 *
 *  @return {$}         Returns the cloned elements, as a ZebraJS object.
 */
this.clone = function(with_data_and_events, deep_with_data_and_events) {

    var result = [];

    // iterate over the set of matched elements
    elements.forEach(function(element) {

        // clone the element (together with its children)
        var clone = element.cloneNode(true);

        // add to array
        result.push(clone);

        // if events and data needs to be cloned too
        if (with_data_and_events)

            // iterate over all the existing event listeners
            Object.keys(event_listeners).forEach(function(event_type) {

                // iterate over the events of current type
                event_listeners[event_type].forEach(function(properties) {

                    // if this is an event attached to element we've just cloned
                    if (with_data_and_events && properties[0] === element)

                        // also add the event to the clone element
                        $(clone).on(event_type + (properties[2] ? '.' + properties[2] : ''), properties[1]);

                });

            });

        // if event handlers and data for all children of the cloned element should be also copied
        if (deep_with_data_and_events) $this._clone_data_and_events(element, clone);

    });

    // return the clone elements
    return $(result);

}
