/****************************************************************************
    leaflet-bugfix.js, 

    (c) 2020, FCOO

    https://github.com/FCOO/leaflet-bugfix
    https://github.com/FCOO

****************************************************************************/
(function (L/*, window, document, undefined*/) {
    "use strict";

    //Fix bug intruduced in Leaflet 1.5
    L.Path.prototype.setStyle = function (original_setStyle) {
        return function(){
            var save_updateBounds = this._updateBounds;
            this._updateBounds = this._project;

            var result = original_setStyle.apply(this, arguments);

            this._updateBounds = save_updateBounds;

            return result;

        };
    }(L.Path.prototype.setStyle);

}(L, this, document));



