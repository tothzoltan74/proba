/* IBM Confidential‌ - OCO Source Materials‌ - (C) COPYRIGHT IBM CORP. 2017-2019 - The source code for this program is not published or otherwise‌ divested of its trade secrets, irrespective of what has been‌ deposited with the U.S. Copyright Office. */
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import "../triplat-routing/triplat-route.js";
var singleton = null;

export const TriroutesTaskList = Polymer({
	_template: html`
		<triplat-route id="inProgressRoute" name="inProgress" path="/inprogress" active="{{inProgressRouteActive}}" ></triplat-route>
		<triplat-route id="completedRoute" name="completed" path="/completed" active="{{completedRouteActive}}" ></triplat-route>
		<triplat-route id="draftRoute" name="draft" path="/draft" active="{{draftRouteActive}}" ></triplat-route>
		<triplat-route id="unassignedRoute" name="unassigned" path="/unassigned" active="{{unassignedRouteActive}}"></triplat-route>
		<triplat-route id="closedRoute" name="closed" path="/closed" active="{{closedRouteActive}}"></triplat-route>
		`,

	is: "triroutes-task-list",

	properties: {
		inProgressRouteActive: {
			type: Boolean,
			notify: true
		},

		completedRouteActive: {
			type: Boolean,
			notify: true
		},

		draftRouteActive: {
			type: Boolean,
			notify: true
		},

		unassignedRouteActive: {
			type: Boolean,
			notify: true
		},

		closedRouteActive: {
			type: Boolean,
			notify: true
		}
	},

	created: function () {
		if (!singleton) {
			singleton = this;
		} else {
			throw "Cannot instantiate more than one triroutes-task-list element";
		}
	},

});

TriroutesTaskList.getInstance = function () {
	return singleton;
};