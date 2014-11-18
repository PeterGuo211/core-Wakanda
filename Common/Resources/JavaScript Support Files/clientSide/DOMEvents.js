/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/
/**
 * DOM2Events
 *
 * @module DOM2Events
 * @requires DOM2Core, DOM2Views
 * @see http://www.w3.org/TR/DOM-Level-2-Events/
 */

/**
 * Event operations may throw an EventException as specified in their method descriptions.
 *
 * @class EventException
 */
EventException = function EventException () {

    /**
     * An integer indicating the type of error generated.
     * 
     * @property code
     * @type Number
     **/
    this.code = 0;

    /**
     * If the Event's type was not specified by initializing the event before the method was called. 
     * Specification of the Event's type as null or an empty string will also trigger this exception.
     * 
     * @property UNSPECIFIED_EVENT_TYPE_ERR
     * @type Number
     * @default 0
     **/
    this.UNSPECIFIED_EVENT_TYPE_ERR = 0;
};


/**
 * The Event interface is used to provide contextual information about an event to the handler 
 * processing the event. An object which implements the Event interface is generally passed as 
 * the first parameter to an event handler. More specific context information is passed to event 
 * handlers by deriving additional interfaces from Event which contain information directly 
 * relating to the type of event they accompany. These derived interfaces are also implemented 
 * by the object passed to the event listener.
 *
 * @class Event
 */
Event = function Event () {

    /**
     * Constant meaning: "The current event phase is the capturing phase."
     *
     * @property CAPTURING_PHASE
     * @type Number
     * @default 1
     */
    this.CAPTURING_PHASE = 1;

    /**
     * Constant meaning: "The event is currently being evaluated at the target EventTarget."
     *
     * @property AT_TARGET
     * @type Number
     * @default 2
     */
    this.AT_TARGET = 2;

    /**
     * Constant meaning: "The current event phase is the bubbling phase."
     *
     * @property BUBBLING_PHASE
     * @type Number
     * @default 3
     */
    this.BUBBLING_PHASE = 3;

    /**
     * The name of the event (case-insensitive). The name must be an XML name.
     * (ex: "mousemove")
     *
     * @property type
     * @type String
     */
    this.type = '';

    /**
     * Used to indicate the EventTarget to which the event was originally dispatched.
     *
     * @property target
     * @type EventTarget
     */
    this.target = new EventTarget();

    /**
     * Used to indicate the EventTarget whose EventListeners are currently being processed. 
     * This is particularly useful during capturing and bubbling.
     *
     * @property currentTarget
     * @type EventTarget
     */
    this.currentTarget = new EventTarget();

    /**
     * Used to indicate which phase of event flow is currently being evaluated.
     *
     * @property eventPhase
     * @type Number
     */
    this.eventPhase = 0;

    /**
     * Used to indicate whether or not an event is a bubbling event. 
     * If the event can bubble the value is true, else the value is false.
     *
     * @property bubbles
     * @type Boolean
     */
    this.bubbles = false;

    /**
     * Used to indicate whether or not an event can have its default action prevented. 
     * If the default action can be prevented the value is true, else the value is false.
     *
     * @property cancelable
     * @type Boolean
     */
    this.cancelable = false;

    /**
     * Used to specify the time (in milliseconds relative to the epoch) at which the event 
     * was created. Due to the fact that some systems may not provide this information the 
     * value of timeStamp may be not available for all events. When not available, a value 
     * of 0 will be returned. 
     * Examples of epoch time are the time of the system start or 0:0:0 UTC 1st January 1970.
     *
     * @property timestamp
     * @type Date
     */
    this.timestamp = new Date();
};

/**
 * The stopPropagation method is used prevent further propagation of an event during event flow. 
 * If this method is called by any EventListener the event will cease propagating through the 
 * tree. The event will complete dispatch to all listeners on the current EventTarget before 
 * event flow stops. This method may be used during any stage of event flow.
 *
 * @method stopPropagation
 */
Event.prototype.stopPropagation = function stopPropagation() {};

/**
 * If an event is cancelable, the preventDefault method is used to signify that the event 
 * is to be canceled, meaning any default action normally taken by the implementation as 
 * a result of the event will not occur. If, during any stage of event flow, the preventDefault 
 * method is called the event is canceled. Any default action associated with the event will 
 * not occur. Calling this method for a non-cancelable event has no effect. Once preventDefault 
 * has been called it will remain in effect throughout the remainder of the event's propagation. 
 * This method may be used during any stage of event flow.
 *
 * @method preventDefault
 */
Event.prototype.preventDefault = function preventDefault() {};

/**
 * The initEvent method is used to initialize the value of an Event created through the 
 * DocumentEvent interface. This method may only be called before the Event has been 
 * dispatched via the dispatchEvent method, though it may be called multiple times during 
 * that phase if necessary. If called multiple times the final invocation takes precedence. 
 * If called from a subclass of Event interface only the values specified in the initEvent 
 * method are modified, all other attributes are left unchanged.
 *
 * @method initEvent
 * @param {String} eventTypeArg Specifies the event type. This type may be any event type 
 * currently defined in this specification or a new event type.. The string must be an 
 * XML name.<br>
 * Any new event type must not begin with any upper, lower, or mixed case version of the 
 * string "DOM". This prefix is reserved for future DOM event sets. It is also strongly 
 * recommended that third parties adding their own events use their own prefix to avoid 
 * confusion and lessen the probability of conflicts with other new events.
 * @param {Boolean} canBubbleArg Specifies whether or not the event can bubble.
 * @param {Boolean} cancelableArg Specifies whether or not the event's default action can 
 * be prevented.
 */
Event.prototype.initEvent = function (eventTypeArg, canBubbleArg, cancelableArg) {};


/**
 * EventTarget
 *
 * @class EventTarget
 *
 * @constructor
 * @throw {EventException}
 */
EventTarget = function EventTarget () {
    throw new EventException();
};

/**
 * <p>This method allows the registration of event listeners on the event target. If an <code>EventListener</code>
 * is added to an <code>EventTarget</code> while it is processing an event, it will not be triggered by the current 
 * actions but may be triggered during a later stage of event flow, such as the bubbling phase.<br/>
 * If multiple identical <code>EventListeners</code> are registered on the same <code>EventTarget</code> with the same parameters 
 * the duplicate instances are discarded. They do not cause the <code>EventListener</code> to be called twice and 
 * since they are discarded they do not need to be removed with the <code>removeEventListener</code> method.</p>
 *
 * @method addEventListener
 * @param {String} type The event type for which the user is registering
 * @param {EventListener} The listener parameter takes an interface implemented by the user which contains the 
 * methods to be called when the event occurs.
 * @param {Boolean} useCapture If true, useCapture indicates that the user wishes to initiate capture. After 
 * initiating capture, all events of the specified type will be dispatched to the registered EventListener before 
 * being dispatched to any EventTargets beneath them in the tree. Events which are bubbling upward through the 
 * tree will not trigger an EventListener designated to use capture.
 */
EventTarget.prototype.addEventListener = function addEventListener(type, listener, useCapture) {};

/**
 * <p>This method allows the removal of event listeners from the event target. If an EventListener is removed from an 
 * <code>EventTarget</code> while it is processing an event, it will not be triggered by the current actions. 
 * EventListeners can never be invoked after being removed.<br>
 * Calling <code>removeEventListener</code> with arguments which do not identify any currently registered 
 * <code>EventListener</code> on the <code>EventTarget</code> has no effect.</p>
 *
 * @method removeEventListener
 * @param {String} type Specifies the event type of the <code>EventListener</code> being removed.
 * @param {EventListener} listener The EventListener parameter indicates the <code>EventListener</code> to be removed.
 * @param {Boolean} useCapture Specifies whether the EventListener being removed was registered as a capturing listener 
 * or not. If a listener was registered twice, one with capture and one without, each must be removed separately. 
 * Removal of a capturing listener does not affect a non-capturing version of the same listener, and vice versa.
 */
EventTarget.prototype.removeEventListener = function removeEventListener(type, listener, useCapture) {};

/**
 * This method allows the dispatch of events into the implementations event model. Events dispatched in this 
 * manner will have the same capturing and bubbling behavior as events dispatched directly by the implementation. 
 * The target of the event is the EventTarget on which dispatchEvent is called.
 *
 * @method dispatchEvent
 * @throw {EventException} UNSPECIFIED_EVENT_TYPE_ERR: Raised if the Event's type was not specified by initializing 
 * the event before dispatchEvent was called. Specification of the Event's type as null or an empty string will also 
 * trigger this exception.
 * @param {Event} evt Specifies the event type, behavior, and contextual information to be used in processing the event.
 * @return {Boolean} The return value of <code>dispatchEvent</code> indicates whether any of the listeners which 
 * handled the event called <code>preventDefault</code>. If <code>preventDefault</code> was called the value is false, 
 * else the value is true.
 */
EventTarget.prototype.dispatchEvent = function dispatchEvent(evt) {
    return true;
};



/**
 * <p>The EventListener interface is the primary method for handling events. Users implement the EventListener 
 * interface and register their listener on an EventTarget using the AddEventListener method. The users should 
 * also remove their EventListener from its EventTarget after they have completed using the listener.</p>
 *
 * <p>When a Node is copied using the cloneNode method the EventListeners attached to the source Node are not 
 * attached to the copied Node. If the user wishes the same EventListeners to be added to the newly created copy 
 * the user must add them manually.</p>
 *
 * @class EventListener
 */
EventListener = function EventListener () {};

/**
 * This method is called whenever an event occurs of the type for which the EventListener interface was registered.
 *
 * @method handleEvent
 * @param {Event} evt The Event contains contextual information about the event. It also contains the stopPropagation 
 * and preventDefault methods which are used in determining the event's flow and default action.
 */
EventListener.prototype.handleEvent = function handleEvent(evt) {};



/**
 * The DocumentEvent interface provides a mechanism by which the user can create an Event of a type supported by 
 * the implementation. It is expected that the DocumentEvent interface will be implemented on the same object 
 * which implements the Document interface in an implementation which supports the Event model.
 *
 * @class DocumentEvent
 * @extends Event
 */
DocumentEvent = function DocumentEvent () {
    throw new DOMException();
};

/**
 * createEvent
 *
 * @method createEvent
 * @throw {DOMException} NOT_SUPPORTED_ERR: Raised if the implementation does not support the type of Event 
 * interface requested
 * @param {String} eventType The eventType parameter specifies the type of Event interface to be created. 
 * If the Event interface specified is supported by the implementation this method will return a new Event 
 * of the interface type requested. If the Event is to be dispatched via the dispatchEvent method the appropriate 
 * event init method must be called after creation in order to initialize the Event's values. As an example, a user 
 * wishing to synthesize some kind of UIEvent would call createEvent with the parameter "UIEvents". The initUIEvent 
 * method could then be called on the newly created UIEvent to set the specific type of UIEvent to be dispatched 
 * and set its context information.<br>
 * The createEvent method is used in creating Events when it is either inconvenient or unnecessary for the user 
 * to create an Event themselves. In cases where the implementation provided Event is insufficient, users may 
 * supply their own Event implementations for use with the dispatchEvent method.
 * @return {DocumentEvent} The newly created Event
 */
DocumentEvent.prototype.createEvent = function createEvent(eventType) {
    return new DocumentEvent();
};



/**
 * User interface events. These events are generated by user interaction
 * through an external device (mouse, keyboard, etc.)
 *
 * @class UIEvent
 * @extends Event
 */
UIEvent = function UIEvent () {

    /**
     * Specifies some detail information about the Event, depending on the type of event.
     *
     * @property detail
     * @type Number
     */
    this.detail = 0;

    /**
     * The view attribute identifies the AbstractView from which the event was generated.
     *
     * @property view
     * @type AbstractView
     */
    this.view = new AbstractView();
};

/**
 * The initUIEvent method is used to initialize the value of a UIEvent created through the DocumentEvent 
 * interface. This method may only be called before the UIEvent has been dispatched via the dispatchEvent 
 * method, though it may be called multiple times during that phase if necessary. If called multiple times, 
 * the final invocation takes precedence.
 *
 * @method initUIEvent
 * @param {String} typeArg Specifies the event type.
 * @param {Boolean} canBubbleArg Specifies whether or not the event can bubble.
 * @param {Boolean} cancelableArg Specifies whether or not the event's default action can be prevented.
 * @param {AbstractView} viewArg Specifies the Event's AbstractView.
 * @param {Number} detailArg Specifies the Event's detail.
 */
UIEvent.prototype.initUIEvent = function initUIEvent(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg) {};



/**
 * <p>The MouseEvent interface provides specific contextual information associated with Mouse events.</p>
 * 
 * <p>The detail attribute inherited from UIEvent indicates the number of times a mouse button has been 
 * pressed and released over the same screen location during a user action. The attribute value is 1 when
 * the user begins this action and increments by 1 for each full sequence of pressing and releasing. If 
 * the user moves the mouse between the mousedown and mouseup the value will be set to 0, indicating that
 * no click is occurring.</p>
 *
 * <p>In the case of nested elements mouse events are always targeted at the most deeply nested element.
 * Ancestors of the targeted element may use bubbling to obtain notification of mouse events which occur
 * within its descendent elements.</p>
 *
 * @class MouseEvent
 * @extends UIEvent
 */
MouseEvent = function MouseEvent () {

    /**
     * The horizontal coordinate at which the event occurred relative to the origin of the screen coordinate system.
     *
     * @property screenX
     * @type Number
     */
    this.screenX = 0;

    /**
     * The vertical coordinate at which the event occurred relative to the origin of the screen coordinate system.
     *
     * @property screenY
     * @type Number
     */
    this.screenY = 0;

    /**
     * The horizontal coordinate at which the event occurred relative to the DOM implementation's client area.
     *
     * @property clientX
     * @type Number
     */
    this.clientX = 0;

    /**
     * The vertical coordinate at which the event occurred relative to the DOM implementation's client area.
     *
     * @property clientY
     * @type Number
     */
    this.clientY = 0;

    /**
     * Used to indicate whether the 'ctrl' key was depressed during the firing of the event.
     *
     * @property ctrlKey
     * @type Boolean
     */
    this.ctrlKey = false;

    /**
     * Used to indicate whether the 'shift' key was depressed during the firing of the event.
     *
     * @property shiftKey
     * @type Boolean
     */
    this.shiftKey = false;

    /**
     * Used to indicate whether the 'alt' key was depressed during the firing of the event. 
     * On some platforms this key may map to an alternative key name.
     *
     * @property altKey
     * @type Boolean
     */
    this.altKey = false;

    /**
     * Used to indicate whether the 'meta' key was depressed during the firing of the event. 
     * On some platforms this key may map to an alternative key name.
     *
     * @property metaKey
     * @type Boolean
     */
    this.metaKey = false;

    /**
     * During mouse events caused by the depression or release of a mouse button, button is used to 
     * indicate which mouse button changed state. The values for button range from zero to indicate 
     * the left button of the mouse, one to indicate the middle button if present, and two to 
     * indicate the right button. For mice configured for left handed use in which the button actions 
     * are reversed the values are instead read from right to left.
     *
     * @property button
     * @type Number
     */
    this.button = 0;

    /**
     * Used to identify a secondary EventTarget related to a UI event. Currently this attribute is 
     * used with the mouseover event to indicate the EventTarget which the pointing device exited
     * and with the mouseout event to indicate the EventTarget which the pointing device entered.
     *
     * @property relatedTarget
     * @type EventTarget
     */
    this.relatedTarget = new EventTarget();
};

/**
 * The initMouseEvent method is used to initialize the value of a MouseEvent created through the 
 * DocumentEvent interface. This method may only be called before the MouseEvent has been dispatched
 * via the dispatchEvent method, though it may be called multiple times during that phase if necessary.
 * If called multiple times, the final invocation takes precedence.
 *
 * @method initMouseEvent
 * @param {String} typeArg Specifies the event type.
 * @param {Boolean} canBubbleArg Specifies whether or not the event can bubble.
 * @param {Boolean} cancelableArg Specifies whether or not the event's default action can be prevented.
 * @param {AbstractView} viewArg Specifies the Event's AbstractView.
 * @param {Number} detailArg Specifies the Event's mouse click count.
 * @param {Number} screenXArg Specifies the Event's screen x coordinate
 * @param {Number} screenYArg Specifies the Event's screen y coordinate
 * @param {Number} clientXArg Specifies the Event's client x coordinate
 * @param {Number} clientYArg Specifies the Event's client y coordinate
 * @param {Boolean} ctrlKeyArg Specifies whether or not control key was depressed during the Event.
 * @param {Boolean} altKeyArg Specifies whether or not alt key was depressed during the Event.
 * @param {Boolean} shiftKeyArg Specifies whether or not shift key was depressed during the Event.
 * @param {Boolean} metaKeyArg Specifies whether or not meta key was depressed during the Event.
 * @param {Number} buttonArg Specifies the Event's mouse button.
 * @param {EventTarget} relatedTargetArg Specifies the Event's related EventTarget.
 */
MouseEvent.prototype.initMouseEvent = function initMouseEvent(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, screenXArg, screenYArg, clientXArg, clientYArg, ctrlKeyArg, altKeyArg, shiftKeyArg, metaKeyArg, buttonArg, relatedTargetArg) {};



/**
 * <p>The mutation event module is designed to allow notification of any changes to the structure of a document,
 * including attr and text modifications. It may be noted that none of the mutation events listed are designated
 * as cancelable. This stems from the fact that it is very difficult to make use of existing DOM interfaces
 * which cause document modifications if any change to the document might or might not take place due to
 * cancelation of the related event. Although this is still a desired capability, it was decided that it would
 * be better left until the addition of transactions into the DOM.</p>
 *
 * <p>Many single modifications of the tree can cause multiple mutation events to be fired. Rather than attempt
 * to specify the ordering of mutation events due to every possible modification of the tree, the ordering of
 * these events is left to the implementation.</p>
 *
 * <p>A DOM application may use the hasFeature(feature, version) method of the DOMImplementation interface with
 * parameter values "MutationEvents" and "2.0" (respectively) to determine whether or not the Mutation event
 * module is supported by the implementation. In order to fully support this module, an implementation must also
 * support the "Events" feature defined in this specification. Please, refer to additional information about
 * conformance in the DOM Level 2 Core specification [DOM Level 2 Core].</p>
 *
 * @class MutationEvent
 * @extends DocumentEvent
 */
MutationEvent = function MutationEvent () {

    /**
     * An integer indicating in which way the Attr was changed.
     * The Attr was modified in place.
     *
     * @property MODIFICATION
     * @type Number
     * @default 1
     */
    this.MODIFICATION = 1;

    /**
     * An integer indicating in which way the Attr was changed.
     * The Attr was just added.
     *
     * @property ADDITION
     * @type Number
     * @default 2
     */
    this.ADDITION = 2;

    /**
     * An integer indicating in which way the Attr was changed.
     * The Attr was just removed.
     *
     * @property REMOVAL
     * @type Number
     * @default 3
     */
    this.REMOVAL = 3;

    /**
     * relatedNode is used to identify a secondary node related to a mutation event. For example, if a mutation
     * event is dispatched to a node indicating that its parent has changed, the relatedNode is the changed
     * parent. If an event is instead dispatched to a subtree indicating a node was changed within it, the
     * relatedNode is the changed node. In the case of the DOMAttrModified event it indicates the Attr node which
     * was modified, added, or removed.
     *
     * @property relatedNode
     * @type Node
     */
    this.relatedNode = new Node();

    /**
     * prevValue indicates the previous value of the Attr node in DOMAttrModified events,
     * and of the CharacterData node in DOMCharDataModified events.
     *
     * @property prevValue
     * @type String
     */
    this.prevValue = '';

    /**
     * newValue indicates the new value of the Attr node in DOMAttrModified events, and of the
     * CharacterData node in DOMCharDataModified events.
     *
     * @property newValue
     * @type String
     */
    this.newValue = '';

    /**
     * attrName indicates the name of the changed Attr node in a DOMAttrModified event.
     *
     * @property attrName
     * @type String
     */
    this.attrName = '';

    /**
     * attrChange indicates the type of change which triggered the DOMAttrModified event.
     * The values can be MODIFICATION, ADDITION, or REMOVAL.
     *
     * @property attrChange
     * @type Number
     */
    this.attrChange = 0;
};

/**
 * The initMutationEvent method is used to initialize the value of a MutationEvent created through the
 * DocumentEvent interface. This method may only be called before the MutationEvent has been dispatched
 * via the dispatchEvent method, though it may be called multiple times during that phase if necessary.
 * If called multiple times, the final invocation takes precedence.
 *
 * @method initMutationEvent
 * @param {String} typeArg Specifies the event type.
 * @param {Boolean} canBubbleArg Specifies whether or not the event can bubble.
 * @param {Boolean} cancelableArg Specifies whether or not the event's default action can be prevented.
 * @param {Node} relatedNodeArg Specifies the Event's related Node.
 * @param {String} prevValueArg Specifies the Event's prevValue attribute. This value may be null.
 * @param {String} newValueArg Specifies the Event's newValue attribute. This value may be null.
 * @param {String} attrNameArg Specifies the Event's attrName attribute. This value may be null.
 * @param {Number} attrChangeArg Specifies the Event's attrChange attribute
 */
MutationEvent.prototype.initMutationEvent = function initMutationEvent(typeArg, canBubbleArg, cancelableArg, relatedNodeArg, prevValueArg, newValueArg, attrNameArg, attrChangeArg) {};