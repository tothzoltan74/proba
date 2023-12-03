/* IBM Confidential‌ - OCO Source Materials‌ - (C) COPYRIGHT IBM CORP. 2019-2021 - The source code for this program is not published or otherwise‌ divested of its trade secrets, irrespective of what has been‌ deposited with the U.S. Copyright Office. */

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

import "../triplat-ds/triplat-ds.js";
import "../triplat-query/triplat-query.js";
import { TriPlatViewBehavior } from "../triplat-view-behavior/triplat-view-behavior.js";

import { TriTaskSearchBehavior } from "./tribehav-task-search.js";
import { TriTaskServiceBehavior } from "./tribehav-task-service.js";

import "./triservice-work-task-base.js";

Polymer({
	_template: html`
		<template is="dom-if" if="[[_isRootInstance]]">
			<triservice-work-task-base id="workTaskBaseService"></triservice-work-task-base>

			 <triplat-ds id="myInProgressTasksRequestedLocationsDS" name="myInProgressTasksRequestedLocations" filtered-data="{{_myTasksRequestedLocations}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="address" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="city" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="country" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="building" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="floor" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank></triplat-query-filter>
				</triplat-query>
			</triplat-ds>
			<triplat-ds id="myInProgressTasksAllPrimaryLocationsDS" name="myInProgressTasksAllPrimaryLocations" filtered-data="{{_myTasksPrimaryLocations}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="address" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="city" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="country" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="building" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="floor" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank></triplat-query-filter>
				</triplat-query>
			</triplat-ds>

			 <triplat-ds id="myCompletedTasksRequestedLocationsDS" name="myCompletedTasksRequestedLocations" filtered-data="{{_myTasksRequestedLocations}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="address" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="city" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="country" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="building" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="floor" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank></triplat-query-filter>
				</triplat-query>
			</triplat-ds>
			<triplat-ds id="myCompletedTasksAllPrimaryLocationsDS" name="myCompletedTasksAllPrimaryLocations" filtered-data="{{_myTasksPrimaryLocations}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="address" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="city" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="country" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="building" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="floor" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank></triplat-query-filter>
				</triplat-query>
			</triplat-ds>

			<triplat-ds id="myDraftTasksRequestedLocationsDS" name="myDraftTasksRequestedLocations" filtered-data="{{_myTasksRequestedLocations}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="address" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="city" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="country" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="building" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="floor" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank></triplat-query-filter>
				</triplat-query>
			</triplat-ds>
			<triplat-ds id="myDraftTasksAllPrimaryLocationsDS" name="myDraftTasksAllPrimaryLocations" filtered-data="{{_myTasksPrimaryLocations}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="address" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="city" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="country" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="building" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="floor" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank></triplat-query-filter>
				</triplat-query>
			</triplat-ds>

			<triplat-ds id="myTeamUnassignedTasksRequestedLocationsDS" name="myTeamUnassignedTasksRequestedLocations" filtered-data="{{_myTasksRequestedLocations}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="address" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="city" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="country" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="building" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="floor" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank></triplat-query-filter>
				</triplat-query>
			</triplat-ds>
			<triplat-ds id="myTeamUnassignedTasksAllPrimaryLocationsDS" name="myTeamUnassignedTasksAllPrimaryLocations" filtered-data="{{_myTasksPrimaryLocations}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="address" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="city" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
	 				<triplat-query-filter name="country" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="building" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="floor" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank></triplat-query-filter>
				</triplat-query>
			</triplat-ds>

			<triplat-ds id="myClosedTasksRequestedLocationsDS" name="myClosedTasksRequestedLocations" filtered-data="{{_myTasksRequestedLocations}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="address" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="city" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="country" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="building" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="floor" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank></triplat-query-filter>
				</triplat-query>
			</triplat-ds>
			<triplat-ds id="myClosedTasksAllPrimaryLocationsDS" name="myClosedTasksAllPrimaryLocations" filtered-data="{{_myTasksPrimaryLocations}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="address" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="city" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="country" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="building" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="floor" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_locationSearch]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank></triplat-query-filter>
				</triplat-query>
			</triplat-ds>

			<triplat-ds id="myInProgressTasksDS" name="myTasksAssociatedToLocation" force-server-filtering manual>
				<triplat-ds-context name="myInProgressTasksRequestedLocations" context-id="[[selectedSearchItem._id]]"></triplat-ds-context>
				<triplat-query delay="0">
					<triplat-query-open-paren></triplat-query-open-paren>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Active" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="starts with" type="STRING_WITH_ID" value="Hold" ignore-if-blank></triplat-query-filter>
					<triplat-query-close-paren></triplat-query-close-paren>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
				</triplat-query>
			</triplat-ds>
			<triplat-ds id="myInProgressTasksAssociatedToPrimaryLocationDS" name="myTasksAssociatedToPrimaryLocation" force-server-filtering  data="[[_myInProgressTasksOfPrimaryAndRequested]]" filtered-data="{{myInProgressTasks}}" disable="[[disableMyInProgress]]" on-ds-get-complete="_handleMyInProgressTasksGet">
				<triplat-ds-context name="myInProgressTasksAllPrimaryLocations" context-id="[[selectedSearchItem._id]]"></triplat-ds-context>
				<triplat-query delay="300">
				<triplat-query-scroll-page id="myInProgressTasksQueryScroll" from="{{_inprogressFrom}}" scroller="[[inprogressLocationScroller]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
					<triplat-query-open-paren></triplat-query-open-paren>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Active" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="starts with" type="STRING_WITH_ID" value="Hold" ignore-if-blank></triplat-query-filter>
					<triplat-query-close-paren></triplat-query-close-paren>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
					<triplat-query-and></triplat-query-and>
					<triplat-query-open-paren></triplat-query-open-paren>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Active" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="starts with" type="STRING_WITH_ID" value="Hold" ignore-if-blank></triplat-query-filter>
					<triplat-query-close-paren></triplat-query-close-paren>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
				</triplat-query>
			</triplat-ds>
			
			<triplat-ds id="myCompletedTasksDS" name="myTasksAssociatedToLocation" force-server-filtering manual>
				<triplat-ds-context name="myCompletedTasksRequestedLocations" context-id="[[selectedSearchItem._id]]"></triplat-ds-context>
				<triplat-query delay="0">
					<triplat-query-open-paren></triplat-query-open-paren>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Completed"></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Routing In Progress"></triplat-query-filter>
					<triplat-query-close-paren></triplat-query-close-paren>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
				</triplat-query>
			</triplat-ds>

			<triplat-ds id="myCompletedTasksAssociatedToPrimaryLocationDS" name="myTasksAssociatedToPrimaryLocation" force-server-filtering data="[[_myCompletedTasksOfPrimaryAndRequested]]" filtered-data="{{myCompletedTasks}}" disable="[[disableMyCompleted]]" on-ds-get-complete="_handleMyCompletedTasksGet">
				<triplat-ds-context name="myCompletedTasksAllPrimaryLocations" context-id="[[selectedSearchItem._id]]"></triplat-ds-context>
				<triplat-query delay="300">
				<triplat-query-scroll-page id="myCompletedTasksQueryScroll" from="{{_completedFrom}}" scroller="[[completedLocationScroller]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
					<triplat-query-open-paren></triplat-query-open-paren>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Completed" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Routing In Progress" ignore-if-blank></triplat-query-filter>
					<triplat-query-close-paren></triplat-query-close-paren>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
                    <triplat-query-and></triplat-query-and>
					<triplat-query-open-paren></triplat-query-open-paren>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Completed"></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Routing In Progress"></triplat-query-filter>
					<triplat-query-close-paren></triplat-query-close-paren>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
				</triplat-query>
			</triplat-ds>

			<triplat-ds id="myDraftTasksDS" name="myTasksAssociatedToLocation" force-server-filtering manual>
				<triplat-ds-context name="myDraftTasksRequestedLocations" context-id="[[selectedSearchItem._id]]"></triplat-ds-context>
				<triplat-query delay="0">
					<triplat-query-open-paren></triplat-query-open-paren>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Draft"></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Review In Progress"></triplat-query-filter>
					<triplat-query-close-paren></triplat-query-close-paren>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
				</triplat-query>
			</triplat-ds>
			<triplat-ds id="myDraftTasksAssociatedToPrimaryLocationDS" name="myTasksAssociatedToPrimaryLocation" force-server-filtering filtered-data="{{myDraftTasks}}" disable="[[disableMyDraft]]" on-ds-get-complete="_handleMyDraftTasksGet">
				<triplat-ds-context name="myDraftTasksAllPrimaryLocations" context-id="[[selectedSearchItem._id]]"></triplat-ds-context>
				<triplat-query delay="300">
				<triplat-query-scroll-page id="myDraftTasksQueryScroll" from="{{_draftFrom}}" scroller="[[draftLocationScroller]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
					<triplat-query-open-paren></triplat-query-open-paren>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Draft" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Routing In Progress" ignore-if-blank></triplat-query-filter>
					<triplat-query-close-paren></triplat-query-close-paren>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
                    <triplat-query-and></triplat-query-and>
					<triplat-query-open-paren></triplat-query-open-paren>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Draft" ignore-if-blank></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Routing In Progress" ignore-if-blank></triplat-query-filter>
					<triplat-query-close-paren></triplat-query-close-paren>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
				</triplat-query>
			</triplat-ds>

			<triplat-ds id="unassignedTaskListDS" name="myTeamUnassignedTasksAssociatedToLocation" force-server-filtering manual>
				<triplat-ds-context name="myTeamUnassignedTasksRequestedLocations" context-id="[[selectedSearchItem._id]]"></triplat-ds-context>
				<triplat-query delay="0">
					<triplat-query-open-paren></triplat-query-open-paren>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="assignmentStatusENUS" operator="equals" value="Unassigned"></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-close-paren></triplat-query-close-paren>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
				</triplat-query>
			</triplat-ds>
			<triplat-ds id="unassignedTasksAssociatedToPrimaryLocationDS" name="myTeamUnassignedTasksAssociatedToPrimaryLocation" data="[[_unassignedTasksOfPrimaryAndRequested]]" filtered-data="{{unassignedTasks}}" force-server-filtering disable="[[disableUnassigned]]"  on-ds-get-complete="_handleUnassignedTasksGet" >
				<triplat-ds-context name="myTeamUnassignedTasksAllPrimaryLocations" context-id="[[selectedSearchItem._id]]"></triplat-ds-context>
				<triplat-query delay="300">
				<triplat-query-scroll-page id="myUnassignedTasksQueryScroll" from="{{_unassignedFrom}}" scroller="[[unassignedLocationScroller]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="assignmentStatusENUS" operator="equals" value="Unassigned"></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="assignmentStatusENUS" operator="equals" value="Unassigned"></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
				</triplat-query>
			</triplat-ds>
			
			

			<triplat-ds id="myClosedTasksDS" name="myTasksAssociatedToLocation" force-server-filtering manual>
				<triplat-ds-context name="myClosedTasksRequestedLocations" context-id="[[selectedSearchItem._id]]"></triplat-ds-context>
				<triplat-query delay="0">
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Closed"></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
				</triplat-query>
			</triplat-ds>
			<triplat-ds id="myClosedTasksAssociatedToPrimaryLocationDS" name="myTasksAssociatedToPrimaryLocation" data="[[_myClosedTasksOfPrimaryAndRequested]]" filtered-data="{{myClosedTasks}}" force-server-filtering disable="[[disableMyClosed]]" on-ds-get-complete="_handleMyClosedTasksGet">
				<triplat-ds-context name="myClosedTasksAllPrimaryLocations" context-id="[[selectedSearchItem._id]]"></triplat-ds-context>
				<triplat-query delay="300">
				<triplat-query-scroll-page id="myClosedTasksQueryScroll" from="{{_closedFrom}}" scroller="[[closedLocationScroller]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Closed"></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Closed"></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
				</triplat-query>
			</triplat-ds>
			
		</template>
	`,

	is: "triservice-work-task-search-by-location",

	behaviors: [
		TriPlatViewBehavior,
		TriTaskSearchBehavior,
		TriTaskServiceBehavior
	],

	properties: {

		_currentUserId: String,

		scannedData: {
			type: String,
			notify: true
		},

		disableMyInProgress: {
			type: Boolean,
			notify: true,
			value: true,
			observer: "_observeDisableMyInprogress"
		},

		disableMyCompleted: {
			type: Boolean,
			notify: true,
			value: true,
			observer: "_observeDisableMyCompleted"
		},

		disableMyDraft: {
			type: Boolean,
			notify: true,
			value: true,
			observer: "_observeDisableMyDraft"
		},

		disableUnassigned: {
			type: Boolean,
			notify: true,
			value: true,
			observer: "_observeDisableMyUnassigned"
		},

		disableMyClosed: {
			type: Boolean,
			notify: true,
			value: true,
			observer: "_observeDisableMyClosed"
		},

		_selectedTaskType: String,

		taskFilter: {
			type: String,
			notify: true,
			value: "all"
		},

		sortField: {
			type: String,
			notify: true,
			value: "plannedStart"
		},

		sortDesc: {
			type: Boolean,
			notify: true,
			value: false
		},

		sortType: {
			type: String,
			notify: true,
			value: "DATE_TIME"
		},

		_myTasksRequestedLocations: Array,
		_myTasksPrimaryLocations: Array,
		_myTasksRequestedLocationsWithPrimary: Array,

		myTasksRequestedLocationsWithPrimary: {
			type: Array,
			notify: true
		},

		locationsSearch: {
			type: String,
			notify: true,
			value: ""
		},

		_locationSearch: String,

		selectedSearchItem:  {
			type: Object,
			notify: true
		},

		loadingTasks: {
			type: Boolean,
			value: false,
			notify: true
		},

		_loadingLocations: {
			type: Boolean,
			value: false
		},

		_loadingPrimaryTasks: {
			type: Boolean,
			value: false
		},

		_loadingRequestedTasks: {
			type: Boolean,
			value: false
		},

		_loadingPrimaryAndRequestedTasks: {
			type: Boolean,
			value: false
		},

		_tasksOfPrimaryLocation: Array,
		_tasksOfRequestedLocation: Array,
		_tasksOfPrimaryAndRequestedLocation: Array,

		_myInProgressTasksOfPrimaryAndRequested: Array,
		_myCompletedTasksOfPrimaryAndRequested: Array,
		_unassignedTasksOfPrimaryAndRequested: Array,
		_myClosedTasksOfPrimaryAndRequested: Array,

		myInProgressTasks: {
			type: Array,
			notify: true
		},

		myCompletedTasks: {
			type: Array,
			notify: true
		},

		myDraftTasks: {
			type: Array,
			notify: true
		},

		unassignedTasks: {
			type: Array,
			notify: true
		},

		myClosedTasks: {
			type: Array,
			notify: true
		},

		closedLocationScroller: {
			type: Object,
			notify: true
		},

		unassignedLocationScroller: {
			type: Object,
			notify: true
		},

		inprogressLocationScroller: {
			type: Object,
			notify: true
		},

		completedLocationScroller: {
			type: Object,
			notify: true
		},

		draftLocationScroller: {
			type: Object,
			notify: true
		},

		_unassignedFrom:{
			type: Number,
			notify: true,
			observer: "_unassignedFromChanged"
		},

		_closedFrom:{
			type: Number,
			notify: true,
			observer: "_closedFromChanged"
		},

		_inprogressFrom:{
			type: Number,
			notify: true,
			observer: "_inprogressFromChanged"
		},

		_completedFrom:{
			type: Number,
			notify: true,
			observer: "_completedFromChanged"
		},

		_draftFrom:{
			type: Number,
			notify: true,
			observer: "_draftFromChanged"
		},

	},

	observers: [
		"_computeLoadingTasks(_loadingLocations, _loadingRequestedTasks, _loadingPrimaryTasks, _loadingPrimaryAndRequestedTasks)",
		"_handleLocationsSearchChanged(locationsSearch, _serviceReady)",
		"_handleTaskFilterChanged(taskFilter, _serviceReady)",
		"_onSearchTaskLocations(_locationSearch, disableMyInProgress, disableMyCompleted, disableMyDraft, disableUnassigned, disableMyClosed)",
		"_onFilterTasksByLocations(selectedSearchItem, disableMyInProgress, disableMyCompleted, disableMyDraft, disableUnassigned, disableMyClosed)"
	],

	get baseService() {
		return this.$$("#workTaskBaseService");
	},

	get currentUser() {
		return this.baseService.currentUser;
	},


	_onSearchTaskLocations: function(locationSearch, disableMyInProgress, disableMyCompleted, disableMyDraft, disableUnassigned, disableMyClosed) {
		if (this._isRootInstance) {
			this.debounce("_debounceRefreshLocations", function() {
				this.set('_unassignedFrom', 0);
				this.set('_closedFrom', 0);
				this.set('_draftFrom', 0);
				this.set('_inprogressFrom', 0);
				this.set('_completedFrom', 0);
				if(locationSearch && !this.selectedSearchItem) {
					if (!disableMyInProgress) {
						this._refreshTaskLocations("#myInProgressTasksRequestedLocationsDS", "#myInProgressTasksAllPrimaryLocationsDS");
					} else if(!disableMyCompleted) {
						this._refreshTaskLocations("#myCompletedTasksRequestedLocationsDS", "#myCompletedTasksAllPrimaryLocationsDS");
					} else if(!disableMyDraft) {
						this._refreshTaskLocations("#myDraftTasksRequestedLocationsDS", "#myDraftTasksAllPrimaryLocationsDS");
					} else if(!disableUnassigned) {
						this._refreshTaskLocations("#myTeamUnassignedTasksRequestedLocationsDS", "#myTeamUnassignedTasksAllPrimaryLocationsDS");
					} else {
						this._refreshTaskLocations("#myClosedTasksRequestedLocationsDS", "#myClosedTasksAllPrimaryLocationsDS");
					}
				}
			}.bind(this), 300);
		}
	},

	_refreshTaskLocations: function(requestedlocationDS, primarylocationDS) {
		if (this._isRootInstance) {
			this._loadingLocations = true;
			return this.$$(requestedlocationDS).refresh()
				.then(this._refreshTaskPrimaryLocations.bind(this, primarylocationDS))
				.then(this._addPrimaryLocationToLocations.bind(this))
				.then(() => {
					this._loadingLocations = false;
				})
				.catch(function(error) {
					return Promise.reject(error);
				}.bind(this));
		}
	},

	_refreshTaskPrimaryLocations: function(primarylocationDS) {
		if (this._isRootInstance) {
			return this.$$(primarylocationDS).refresh();
		}
	},

	_addPrimaryLocationToLocations: function() {
		if (this._isRootInstance) {
			let locations, primaryLocations;
			locations = this._myTasksRequestedLocations;
			primaryLocations = this._myTasksPrimaryLocations;

			if (primaryLocations && primaryLocations.length > 0) {
				for (let i = 0; i < primaryLocations.length; i++) {
					let index = locations.map(e => e._id).indexOf(primaryLocations[i]._id);
					if (index == -1) {
						primaryLocations[i].isPrimaryLocation = true;
						locations.push(primaryLocations[i]);
					} else {
						locations[index].isPrimaryAndRequestedLocation = true;
					}
				}
			}
			return new Promise((resolve) => {
				this.set("myTasksRequestedLocationsWithPrimary", this._computeLocationsWithFloorRoomAddress(locations));
				setTimeout(resolve, 1);
			});
		}
	},

	_computeLocationsWithFloorRoomAddress: function(locationList) {
		if (this._isRootInstance && locationList) {
			for (var i = 0; i < locationList.length; i++) {
				let locationPath = locationList[i].hierarchyPath;
				let type = locationList[i].typeENUS;
				let location = [];
				let computedLocation = [];
				let address, city, country, barCode;

				if (locationPath && locationPath !== "" && type !== null && type !== "") {
					let locationString = locationPath;
					let locationArray = locationString.trim().split("\\");
					location = this._computeLocationPath(locationArray, type);
				}

				computedLocation = location.join(", ");
				address = locationList[i].address ? ", " + locationList[i].address : "";
				city = locationList[i].city ? ", " + locationList[i].city : "";
				country = locationList[i].country ? ", " + locationList[i].country : "";
				barCode = locationList[i].barCode ? ", " + locationList[i].barCode : "";
				locationList[i].computedLocation = computedLocation + address + city + country + barCode;
			}
		}
		return locationList;
	},

	_onFilterTasksByLocations: function(selectedSearchItem, disableMyInProgress, disableMyCompleted, disableMyDraft, disableUnassigned, disableMyClosed) {
		if (this._isRootInstance) {
			if (!(disableMyInProgress && disableMyCompleted && disableMyDraft && disableUnassigned && disableMyClosed) && selectedSearchItem && selectedSearchItem._id && selectedSearchItem._id != "") {
				this.refreshTasks(selectedSearchItem);
			}
		}
	},

	refreshTasks: function(selectedSearchItem) {
		if (this._isRootInstance) {
			if(selectedSearchItem) {
				if (selectedSearchItem.isPrimaryAndRequestedLocation) {
					this._handleRefreshTasksOfPrimaryAndRequested(!this.disableMyInProgress, !this.disableMyCompleted, !this.disableMyDraft, !this.disableUnassigned, !this.disableMyClosed);
				} else if (selectedSearchItem.isPrimaryLocation) {
					this._handleRefreshTasksOfPrimary(!this.disableMyInProgress, !this.disableMyCompleted, !this.disableMyDraft, !this.disableUnassigned, !this.disableMyClosed);
				} else {
					this._handleRefreshTasksOfRequested(!this.disableMyInProgress, !this.disableMyCompleted, !this.disableMyDraft, !this.disableUnassigned, !this.disableMyClosed);
				}
			}
		} else {
			this._rootInstance.refreshTasks(selectedSearchItem);
		}
	},

	_handleRefreshTasksOfPrimary: function(inProgressRouteActive, completedRouteActive, draftRouteActive, unassignedRouteActive, closedRouteActive) {
		if (this._isRootInstance) {
			if(inProgressRouteActive)
				this._refreshTasksOfPrimary("#myInProgressTasksAssociatedToPrimaryLocationDS");
			else if(completedRouteActive)
				this._refreshTasksOfPrimary("#myCompletedTasksAssociatedToPrimaryLocationDS");
			else if(draftRouteActive)
				this._refreshTasksOfPrimary("#myDraftTasksAssociatedToPrimaryLocationDS");
			else if(unassignedRouteActive)
				this._refreshTasksOfPrimary("#unassignedTasksAssociatedToPrimaryLocationDS");
			else if(closedRouteActive)
				this._refreshTasksOfPrimary("#myClosedTasksAssociatedToPrimaryLocationDS");
		}
	},

	_handleRefreshTasksOfRequested: function(inProgressRouteActive, completedRouteActive, draftRouteActive, unassignedRouteActive, closedRouteActive) {
		if (this._isRootInstance) {
			if(inProgressRouteActive)
				this._refreshTasksOfRequested("#myInProgressTasksDS");
			else if(completedRouteActive)
				this._refreshTasksOfRequested("#myCompletedTasksDS");
			else if(draftRouteActive)
				this._refreshTasksOfRequested("#myDraftTasksDS");
			else if(unassignedRouteActive)
				this._refreshTasksOfRequested("#unassignedTaskListDS");
			else if(closedRouteActive)
				this._refreshTasksOfRequested("#myClosedTasksDS");
		}
	},

	_handleRefreshTasksOfPrimaryAndRequested: function(inProgressRouteActive, completedRouteActive, draftRouteActive, unassignedRouteActive, closedRouteActive) {
		if (this._isRootInstance) {
			if(inProgressRouteActive)
				this._refreshTasksOfPrimaryAndRequested("#myInProgressTasksAssociatedToPrimaryLocationDS", "#myInProgressTasksDS");
			else if(completedRouteActive)
				this._refreshTasksOfPrimaryAndRequested("#myCompletedTasksAssociatedToPrimaryLocationDS", "#myCompletedTasksDS");
			else if(draftRouteActive)
				this._refreshTasksOfPrimaryAndRequested("#myDraftTasksAssociatedToPrimaryLocationDS", "#myDraftTasksDS");
			else if(unassignedRouteActive)
				this._refreshTasksOfPrimaryAndRequested("#unassignedTasksAssociatedToPrimaryLocationDS", "#unassignedTaskListDS");
			else if(closedRouteActive)
				this._refreshTasksOfPrimaryAndRequested("#myClosedTasksAssociatedToPrimaryLocationDS", "#myClosedTasksDS");
		}
	},

	_refreshTasksOfPrimary: function(primarylocationDS) {
		if (this._isRootInstance) {
			this._loadingPrimaryTasks = true;
			return this.$$(primarylocationDS).refresh()
					.then(function() {
						let tasksOfPrimaryLocation = this.$$(primarylocationDS).filteredData;
						this.set("_tasksOfPrimaryLocation", tasksOfPrimaryLocation);
						this._setTasksIfEitherPrimaryOrRequested(this.selectedSearchItem);
					}.bind(this))
					.then(() => {
						this._loadingPrimaryTasks = false;
					})
					.catch(function(error) {
						return Promise.reject(error);
					}.bind(this));
		}
	},

	_refreshTasksOfRequested: function(requestedlocationDS) {
		if (this._isRootInstance) {
			this._loadingRequestedTasks = true;
			return this.$$(requestedlocationDS).refresh()
					.then(function() {
						let tasksOfRequestedLocation = this.$$(requestedlocationDS).filteredData;
						this.set("_tasksOfRequestedLocation", tasksOfRequestedLocation);
						this._setTasksIfEitherPrimaryOrRequested(this.selectedSearchItem);
					}.bind(this))
					.then(() => {
						this._loadingRequestedTasks = false;
					})
					.catch(function(error) {
						return Promise.reject(error);
					}.bind(this));
		}
	},

	_setTasksIfEitherPrimaryOrRequested: function(selectedSearchItem) {
		if (this._isRootInstance && selectedSearchItem) {
			if(!selectedSearchItem.isPrimaryAndRequestedLocation) {
				if(selectedSearchItem.isPrimaryLocation)
					this._setTasks(this._tasksOfPrimaryLocation);
				else
					this._setTasks(this._tasksOfRequestedLocation);
			}
		}
	},

	_setTasks: function(tasks) {
		if(this._isRootInstance && tasks) {
			this._modifyNoPriorityAndAddLocationToTasks(tasks);
			if(!this.disableMyInProgress)
				this._myInProgressTasksOfPrimaryAndRequested = tasks;
			else if(!this.disableMyCompleted)
				this._myCompletedTasksOfPrimaryAndRequested = tasks;
			else if(!this.disableMyDraft)
				this.myDraftTasks = tasks;
			else if(!this.disableUnassigned)
				this._unassignedTasksOfPrimaryAndRequested = tasks;
			else if(!this.disableMyClosed)
				this._myClosedTasksOfPrimaryAndRequested = tasks;
		}
	},

	_refreshTasksOfPrimaryAndRequested: function(primarylocationDS, requestedlocationDS) {
		if (this._isRootInstance) {
			if (this._tasksOfPrimaryAndRequestedLocation == null || this.selectedSearchItem._id != "") {
				this._loadingPrimaryAndRequestedTasks = true;
				return this._refreshTasksOfRequested(requestedlocationDS)
					.then(this._refreshTasksOfPrimary.bind(this, primarylocationDS))
					.then(this._addTasksOfPrimaryLocationAndRequestedLocations.bind(this))
					.then(function() {
						this._setTasks(this._tasksOfPrimaryAndRequestedLocation);
						return this._tasksOfPrimaryAndRequestedLocation;
					}.bind(this))
					.then(() => {
						this._loadingPrimaryAndRequestedTasks = false;
					})
					.catch(function(error) {
						return Promise.reject(error);
					}.bind(this));
			} else {
				return Promise.resolve(this._tasksOfPrimaryAndRequestedLocation);
			}
		} else {
			return this._rootInstance._refreshTasksOfPrimaryAndRequested();
		}
	},

	_addTasksOfPrimaryLocationAndRequestedLocations: function() {
		if (this._isRootInstance) {
			let tasks, primaryTasks;
			this._tasksOfPrimaryAndRequestedLocation = [];
			tasks = this._tasksOfRequestedLocation;
			primaryTasks = this._tasksOfPrimaryLocation;

			if (primaryTasks && primaryTasks.length > 0) {
				for (let i = 0; i < primaryTasks.length; i++) {
					let index = tasks.map(e => e._id).indexOf(primaryTasks[i]._id);
					if (index == -1) {
						tasks.push(primaryTasks[i]);
					}
				}
			}

			return new Promise((resolve) => {
				this.set("_tasksOfPrimaryAndRequestedLocation", tasks);
				setTimeout(resolve, 1);
			});
		}
	},

	_handleLocationsSearchChanged: function(locationsSearch, serviceReady) {
		if (!assertParametersAreDefined(arguments)) {
			return;
		}

		if (!this._isRootInstance || !serviceReady) {
			return;
		}

		this.debounce("_debounceLocationsSearch", function() {
			this._locationSearch = locationsSearch;
		}.bind(this));
	},

	_computeLoadingTasks: function(loadingLocations, loadingRequestedTasks, loadingPrimaryTasks, loadingPrimaryAndRequestedTasks) {
		if (this._isRootInstance) {
			if (!assertParametersAreDefined(arguments)) {
				return;
			}

			this.loadingTasks = loadingLocations || loadingRequestedTasks || loadingPrimaryTasks || loadingPrimaryAndRequestedTasks;
		}
	},

	_modifyNoPriorityAndAddLocationToTasks: function(tasks) {
		if (this._isRootInstance) {
			this._modifyNoPriorityForSorting(tasks);
			this._addLocationToTasks(tasks);
		}
	},

	_observeDisableMyClosed: function(disable) {
		if (this._isRootInstance) {
			if (disable) {
				this.myClosedTasksQueryScroll.reset();
			}
		}
	},

	_observeDisableMyUnassigned: function(disable) {
		if (this._isRootInstance) {
			if (disable) {
				this.myUnassignedTasksQueryScroll.reset();
				
			}
		}
	},

	_observeDisableMyDraft: function(disable) {
		if (this._isRootInstance) {
			if (disable) {
				this.myDraftTasksQueryScroll.reset();
			}
		}
	},

	_observeDisableMyInprogress: function(disable) {
		if (this._isRootInstance) {
			if (disable) {
				this.myInProgressTasksQueryScroll.reset();
			}
		}
	},

	_observeDisableMyCompleted: function(disable) {
		if (this._isRootInstance) {
			if (disable) {
				this.myCompletedTasksQueryScroll.reset();
			}
		}
	},

	_closedFromChanged: function(curFrom, prevFrom){
		if(curFrom > prevFrom){
			this._closedPrevFrom = curFrom;	
		} else if(this._closedPrevFrom > curFrom && !this.locationsSearch ){
			this.myClosedTasksQueryScroll.set('from',this._closedPrevFrom);
		}
	},

	_unassignedFromChanged:function(curFrom, prevFrom,){	
		if(curFrom > prevFrom){
			this._unassignedPrevFrom = curFrom;
		} else if(this._unassignedPrevFrom > curFrom && !this.locationsSearch ){
			this.myUnassignedTasksQueryScroll.set('from',this._unassignedPrevFrom);
		 }
	
	},

	_draftFromChanged: function(curFrom, prevFrom){
		if(curFrom > prevFrom){
			this._draftPrevFrom = curFrom;
		} else if(this._draftPrevFrom > curFrom &&  !this.locationsSearch ){
				this.myDraftTasksQueryScroll.set('from',this._draftPrevFrom);				
		} 
	},

	_completedFromChanged: function(curFrom, prevFrom){
		if(curFrom > prevFrom){
			this._completedPrevFrom = curFrom;
		}  else if(this._completedPrevFrom > curFrom  &&  !this.locationsSearch ){
			this.myCompletedTasksQueryScroll.set('from',this._completedPrevFrom);				
			
	    }
	},

	_inprogressFromChanged: function(curFrom, prevFrom){
		if(curFrom > prevFrom){
			this._inProgressPrevFrom = curFrom;
		} else if(this._inProgressPrevFrom > curFrom  &&  !this.locationsSearch ){
			this.myInProgressTasksQueryScroll.set('from',this._inProgressPrevFrom);				
			
	    }
	},

	_handleMyClosedTasksGet: function() {
		this._modifyNoPriorityForSorting(this.myClosedTasks);
	},

	_handleUnassignedTasksGet: function() {
		this._modifyNoPriorityForSorting(this.unassignedTasks);
	},

	_handleMyInprogressTasksGet: function() {
		this._modifyNoPriorityForSorting(this.myInProgressTasks);
	},

	_handleMyCompletedTasksGet: function() {
		this._modifyNoPriorityForSorting(this.myCompletedTasks);
	},

	_handleMyDraftTasksGet: function() {
		this._modifyNoPriorityForSorting(this.myDraftTasks);
	},

	get myClosedTasksQueryScroll() {
		return this._isRootInstance ? this.$$("#myClosedTasksQueryScroll") : this._rootInstance.myClosedTasksQueryScroll;
	},

	get myUnassignedTasksQueryScroll() {
		return this._isRootInstance ? this.$$("#myUnassignedTasksQueryScroll") : this._rootInstance.myUnassignedTasksQueryScroll;
	},

	get myInProgressTasksQueryScroll() {
		return this._isRootInstance ? this.$$("#myInProgressTasksQueryScroll") : this._rootInstance.myInProgressTasksQueryScroll;
	},

	get myCompletedTasksQueryScroll() {
		return this._isRootInstance ? this.$$("#myCompletedTasksQueryScroll") : this._rootInstance.myCompletedTasksQueryScroll;
	},

	get myDraftTasksQueryScroll() {
		return this._isRootInstance ? this.$$("#myDraftTasksQueryScroll") : this._rootInstance.myDraftTasksQueryScroll;
	}

});