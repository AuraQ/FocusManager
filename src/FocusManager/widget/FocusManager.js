/*global logger*/
/*
    Visibility Microflow
    ========================

    @file      : FocusManager.js
    @version   : 1.0.0
    @author    : Dragos Vrabie
    @date      : Mon, 14 Jun 2016 15:23:01 GMT
    @copyright : AuraQ Ltd
    @license   : Apache 2/MIT

    Documentation
    ========================
    Use to set visibility for elements by using a microflow.
*/

require([
    "dojo/_base/declare",
    "FocusManager/lib/jquery-1.11.2",
    "mxui/widget/_WidgetBase",
    "dojo/_base/lang"
], function (declare,_jQuery, _WidgetBase,lang) {
    "use strict";

    return declare("FocusManager.widget.FocusManager", [_WidgetBase], {

        //_handle: null,

        postCreate: function () {
            logger.level(logger.DEBUG);
            logger.debug(this.id + ".postCreate");  

        },        

        update: function (obj, callback) {
            logger.debug(this.id + '.update');

            var localguid= obj.getGuid();
            this._updateFocus(localguid);
            /* No longer needed - credit to jQuery.On
            if(obj && this.refreshEvents && this._handle==null)
            {

                logger.debug("Subscribing to obj with guid: " + localguid);

                this._handle= this.subscribe({
                    guid:localguid,
                    callback:lang.hitch(this,function(guid){
                        this._updateFocus(guid);
                    })
                });
            }*/

            callback();
        },

        _updateFocus: function(objGuid){
            logger.debug(this.id + '._updateFocus');
            var widget=this;

            _jQuery.each(this.focusEvents,function(idx,focusObj){                
                _jQuery(focusObj.evTarget).on(focusObj.event,function(args){
                    logger.debug('Object retrieved');
                    mx.data.get({
                        guid: objGuid,
                        callback: function(obj) {
                            if(focusObj.condition!="")
                            {
                                var finalCondition =widget._generateCondition(focusObj.condition,obj);                                
                                var result = eval(finalCondition);
                                
                                logger.debug("Final condition returned as: "+finalCondition+ " which evaluates as "+result+" with arguments "+args);

                                if(result)
                                {
                                    widget._focusItem(focusObj.focusTarget);
                                }
                            }
                            else
                            {
                                widget._focusItem(focusObj.focusTarget);
                            }
                        }
                    });
                });
            });
        },

        _generateCondition: function(condition,obj){   
            logger.debug(this.id + '._generateCondition');
            var startVar=condition.indexOf("[%");            

            if(startVar!=-1)
            {
                var endVar = condition.indexOf("%]")+2;
                var replaceString =condition.substring(startVar,endVar);

                logger.debug('Replacing string for start char '+startVar +" and end char "+endVar+ " which is "+replaceString);

                var newString = condition.replace(replaceString,"'"+obj.get(replaceString.substring(2,replaceString.length-2))+"'");

                logger.debug("Generated new condition: "+newString);

                condition = this._generateCondition(newString,obj);
            }

            return condition;
        },

        _focusItem: function(selector) {
            logger.debug(this.id + '._focusItem ' +selector);
            _jQuery(selector).focus();
        }
    });
});