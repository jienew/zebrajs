/**
 *  @todo   Needs to be written!
 */
this.offset = function() {

    var i = collection[0].getBoundingClientRect();

    return {
        top: i.top + window.pageYOffset - document.documentElement.clientTop,
        left: i.left + window.pageXOffset - document.documentElement.clientLeft
    }

}
