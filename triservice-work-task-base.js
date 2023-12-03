/* IBM Confidential‌ - OCO Source Materials‌ - (C) COPYRIGHT IBM CORP. 2017-2021 - The source code for this program is not published or otherwise‌ divested of its trade secrets, irrespective of what has been‌ deposited with the U.S. Copyright Office. */

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

import { TriPlatDs } from "../triplat-ds/triplat-ds.js";
import { TriplatQuery } from "../triplat-query/triplat-query.js";
import "../triplat-offline-manager/triplat-ds-offline.js";
import { TriDateUtilities } from "../triplat-date-utilities/triplat-date-utilities.js";
import { TriPlatViewBehaviorImpl, TriPlatViewBehavior } from "../triplat-view-behavior/triplat-view-behavior.js";

import "../triblock-responsive-layout/triblock-responsive-layout.js";

import { TriTaskSearchBehavior } from "./tribehav-task-search.js";
import { TriTaskServiceBehavior } from "./tribehav-task-service.js";

Polymer({
	_template: html`
		<template is="dom-if" if="[[_isRootInstance]]">
			<triplat-ds id="currentUser" name="currentUser" data="{{currentUser}}">
				<triplat-ds-offline mode="AUTOMATIC" cache-thumbnails="[[_toArray('image')]]"></triplat-ds-offline>
			</triplat-ds>

			<triplat-ds id="myTaskDS" name="myTasks" data="{{myTask}}" loading="{{_loadingMyTask}}" manual="">
				<triplat-ds-offline id="myTaskDSOffline" mode="UPDATE"></triplat-ds-offline>
				<triplat-ds-instance id="myTaskDSInstance"></triplat-ds-instance>
			</triplat-ds>

		<triplat-ds id="inProgressAndCompletedTasksDS" name="myTasks" loading="{{_loadingInProgressAndCompletedTasks}}" force-server-filtering="" manual="" on-filtered-data-changed="_handleInProgressAndCompletedTasksGet">
				<triplat-ds-offline mode="AUTOMATIC"></triplat-ds-offline>
				<triplat-query delay="0">
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Draft"></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Review In Progress"></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Active"></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="starts with" type="STRING_WITH_ID" value="Hold"></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Routing In Progress"></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Completed"></triplat-query-filter>
				</triplat-query>
			</triplat-ds>
		
			<triplat-ds id="inProgressTasksDS" name="myTasks"  filtered-data="{{myInProgressTasks}}"  loading="{{_loadingMyInProgressTasks}}" force-server-filtering="" disable="[[disableMyInprogress]]" on-ds-get-complete="_handleMyInprogressTasksGet">
			<triplat-ds-offline id="myTaskDSOffline" mode="UPDATE"></triplat-ds-offline>	
			<triplat-query delay="300">
				<triplat-query-scroll-page id="myInProgressTasksQueryScroll" from="{{_inprogressFrom}}" scroller="[[_computeScroller(resetInprogressLocateSearchScroller, inprogressScroller)]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
				<triplat-query-open-paren></triplat-query-open-paren>
				<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Active" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="statusENUS" operator="starts with" type="STRING_WITH_ID" value="Hold" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-close-paren></triplat-query-close-paren>
				<triplat-query-and></triplat-query-and>
				<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-and></triplat-query-and>
				<triplat-query-filter name="assignmentStatusENUS" operator="not equals" value="Unassigned"></triplat-query-filter>
				<triplat-query-and></triplat-query-and>
				<triplat-query-open-paren></triplat-query-open-paren>
				<triplat-query-filter name="status" operator="contains" type="STRING_WITH_ID" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="primaryWorkLocationPath" operator="contains" type="STRING_WITH_ID" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskID" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskName" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskType" operator="contains" value="[[_taskSearch]]" type="STRING_WITH_ID" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskPriority" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-close-paren></triplat-query-close-paren>
				<triplat-query-and></triplat-query-and>
				<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
				<triplat-query-sort name="plannedStart" type="DATE_TIME"></triplat-query-sort>
			    </triplat-query>
				</triplat-query>
			</triplat-ds>
            
			<triplat-ds id="completedTasksDS" name="myTasks"   filtered-data="{{myCompletedTasks}}"  loading="{{_loadingMyCompletedTasks}}" force-server-filtering="" disable="[[disableMyCompleted]]" on-ds-get-complete="_handleMyCompletedTasksGet">
			<triplat-ds-offline id="myTaskDSOffline" mode="UPDATE"></triplat-ds-offline>
			<triplat-query delay="300">
			<triplat-query-scroll-page id="myCompletedTasksQueryScroll" from="{{_completedFrom}}" scroller="[[_computeScroller(resetCompletedLocateSearchScroller, completedScroller)]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
				<triplat-query-open-paren></triplat-query-open-paren>
				<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Completed"></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Routing In Progress"></triplat-query-filter>
				<triplat-query-close-paren></triplat-query-close-paren>
				<triplat-query-and></triplat-query-and>
				<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-and></triplat-query-and>
				<triplat-query-filter name="assignmentStatusENUS" operator="not equals" value="Unassigned"></triplat-query-filter>
				<triplat-query-and></triplat-query-and>
				<triplat-query-open-paren></triplat-query-open-paren>
				<triplat-query-filter name="status" operator="contains" type="STRING_WITH_ID" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="primaryWorkLocationPath" operator="contains" type="STRING_WITH_ID" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskID" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskName" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskType" operator="contains" type="STRING_WITH_ID" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskPriority" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-close-paren></triplat-query-close-paren>
				<triplat-query-and></triplat-query-and>
				<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
				<triplat-query-sort name="plannedStart" type="DATE_TIME"></triplat-query-sort>
			</triplat-query>
		 </triplat-ds>
        

		 <triplat-ds id="draftTasksDS" name="myTasks"  filtered-data="{{myDraftTasks}}"  loading="{{_loadingMyDraftTasks}}" force-server-filtering="" disable="[[disableMyDraft]]" on-ds-get-complete="_handleMyDraftTasksGet">
			<triplat-ds-offline id="myTaskDSOffline" mode="UPDATE"></triplat-ds-offline>
			<triplat-query delay="300">
			<triplat-query-scroll-page id="myDraftTasksQueryScroll" from="{{_draftFrom}}" scroller="[[_computeScroller(resetDraftLocateSearchScroller, draftScroller)]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
				<triplat-query-open-paren></triplat-query-open-paren>
				<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Draft"></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Review In Progress"></triplat-query-filter>
				<triplat-query-close-paren></triplat-query-close-paren>
				<triplat-query-and></triplat-query-and>
				<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-and></triplat-query-and>
				<triplat-query-filter name="assignmentStatusENUS" operator="not equals" value="Unassigned"></triplat-query-filter>
				<triplat-query-and></triplat-query-and>
				<triplat-query-open-paren></triplat-query-open-paren>
				<triplat-query-filter name="status" operator="contains" type="STRING_WITH_ID" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="primaryWorkLocationPath" operator="contains" type="STRING_WITH_ID" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskID" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskName" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskType" operator="contains" type="STRING_WITH_ID" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskPriority" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-close-paren></triplat-query-close-paren>
				<triplat-query-and></triplat-query-and>
				<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
				<triplat-query-sort name="plannedStart" type="DATE_TIME"></triplat-query-sort>
			</triplat-query> 
			</triplat-ds>

			<triplat-ds id="myClosedTasksDS" name="myTasks"  filtered-data="{{myClosedTasks}}"  loading="{{_loadingMyClosedTasks}}" force-server-filtering="" disable="[[disableMyClosed]]" on-ds-get-complete="_handleMyClosedTasksGet" >
			<triplat-query delay="300">
					<triplat-query-scroll-page id="myClosedTasksQueryScroll" from="{{_closedFrom}}" scroller="[[_computeScroller(resetClosedLocateSearchScroller, closedScroller)]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
					<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Closed"></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank=""></triplat-query-filter>
					<triplat-query-and></triplat-query-and>
					<triplat-query-open-paren></triplat-query-open-paren>
					<triplat-query-filter name="status" operator="contains" type="STRING_WITH_ID" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				    <triplat-query-or></triplat-query-or>
					<triplat-query-filter name="primaryWorkLocationPath" operator="contains" type="STRING_WITH_ID" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="taskID" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="taskName" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="taskType" operator="contains" type="STRING_WITH_ID" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="taskPriority" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
					<triplat-query-close-paren></triplat-query-close-paren>
					<triplat-query-and></triplat-query-and>
					<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank=""></triplat-query-filter>
					<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
					<triplat-query-sort name="plannedStart" desc="" type="DATE_TIME"></triplat-query-sort>
				</triplat-query>
			</triplat-ds>

			<triplat-ds id="timeLogListDS" name="timeEntry" data="{{_timeLogs}}" loading="{{loadingTimeLogs}}" force-server-filtering="" manual="">
				<triplat-ds-offline mode="CONTEXT"></triplat-ds-offline>
				<triplat-ds-context id="timeLogListDSContext" name="myTasks"></triplat-ds-context>
			</triplat-ds>

			<triplat-query delay="0" data="[[_timeLogs]]" filtered-data-out="{{timeLogs}}">
				<triplat-query-sort name="date" type="DATE"></triplat-query-sort>
			</triplat-query>

			<triplat-query delay="0" data="[[_timeLogs]]" filtered-data-out="{{_openTimeLogs}}">
				<triplat-query-filter name="profileId" operator="equals" value="[[currentUser._id]]"></triplat-query-filter>
				<triplat-query-and></triplat-query-and>
				<triplat-query-filter name="plannedEnd" operator="equals" value=""></triplat-query-filter>
				<triplat-query-and></triplat-query-and>
				<triplat-query-filter name="plannedStart" operator="not equals" value=""></triplat-query-filter>
				<triplat-query-sort name="date" type="DATE"></triplat-query-sort>
			</triplat-query>

			<triplat-ds id="timeLogInstanceDS" name="timeEntry" data="{{timeLog}}" loading="{{loadingTimeLog}}" manual="">
				<triplat-ds-offline mode="UPDATE"></triplat-ds-offline>
				<triplat-ds-context id="timeLogInstanceDSContext" name="myTasks"></triplat-ds-context>
				<triplat-ds-instance id="timeLogInstanceDSInstance"></triplat-ds-instance>
			</triplat-ds>

			<triplat-ds id="unassignedTaskListDS"  name="unassignedTasks" filtered-data="{{unassignedTasks}}" disable="[[disableMyUnassigned]]" loading="{{_loadingUnassignedTaskList}}"  force-server-filtering="" on-ds-get-complete="_handleUnassignedTasksGet">
				<triplat-ds-offline id="unassignedTaskListDSOffline" mode="UPDATE"></triplat-ds-offline>
			<triplat-query delay="300">
			<triplat-query-scroll-page id="myUnassignedTasksQueryScroll" from="{{_unassignedFrom}}" scroller="[[_computeScroller(resetUnassignedLocateSearchScroller, unassignedScroller)]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
				<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-and></triplat-query-and>
				<triplat-query-filter name="assignmentStatusENUS" operator="equals" value="Unassigned"></triplat-query-filter>
				<triplat-query-and></triplat-query-and>
				<triplat-query-open-paren></triplat-query-open-paren>
				<triplat-query-filter name="status" operator="contains" type="STRING_WITH_ID" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
		       <triplat-query-filter name="primaryWorkLocationPath" operator="contains" type="STRING_WITH_ID" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or> 
				<triplat-query-filter name="taskID" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskName" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskType" operator="contains" value="[[_taskSearch]]" type="STRING_WITH_ID" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-or></triplat-query-or>
				<triplat-query-filter name="taskPriority" operator="contains" value="[[_taskSearch]]" ignore-if-blank=""></triplat-query-filter> 
				<triplat-query-close-paren></triplat-query-close-paren>
				<triplat-query-and></triplat-query-and>
				<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank=""></triplat-query-filter>
				<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
				<triplat-query-sort name="plannedStart" type="DATE_TIME"></triplat-query-sort>
			</triplat-query></triplat-ds>

			<triplat-ds id="unassignedTaskDS" name="unassignedTasks" data="{{unassignedTask}}" loading="{{_loadingUnassignedTask}}" manual="">
				<triplat-ds-offline id="unassignedTaskDSOffline" mode="UPDATE"></triplat-ds-offline>
				<triplat-ds-instance id="unassignedTaskDSInstance"></triplat-ds-instance>
			</triplat-ds>

			<triblock-responsive-layout hidden medium-screen-width="{{mediumLayout}}"  medium-screen-max-width="800px"></triblock-responsive-layout>
		</template>
	`,

	is: "triservice-work-task-base",

	behaviors: [
		TriDateUtilities,
		TriPlatViewBehavior,
		TriTaskSearchBehavior,
		TriTaskServiceBehavior
	],

	properties: {

		online: {
			type: Boolean,
			observer: "_observeRunningOfflineMode"
		},

		currentUser: {
			type: Object,
			notify: true,
		},

		loadingDeleteTaskAction: {
			type: Boolean,
			value: false,
			notify: true
		},

		loadingTasks: {
			type: Boolean,
			value: false,
			notify: true
		},

		loadingTimeLog: {
			type: Boolean,
			value: false,
			notify: true
		},

		loadingTimerAction: {
			type: Boolean,
			value: false,
			notify: true
		},

		loadingTimeLogs: {
			type: Boolean,
			value: false,
			notify: true
		},

		myTask: {
			type: Object,
			notify: true
		},

		unassignedTask: {
			type: Object,
			notify: true
		},

		timeLog: {
			type: Object,
			notify: true
		},

		timeLogs: {
			type: Array,
			notify: true
		},

		myInProgressTasks: {
			type: Array,
			notify: true,
		},

		myCompletedTasks: {
			type: Array,
			notify: true,
		},

		myDraftTasks: {
			type: Array,
			notify: true
		},

		myClosedTasks: {
			type: Array,
			notify: true
		},

		unassignedTasks: {
			type: Array,
			notify: true
		},

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

		taskSearch: {
			type: String,
			notify: true,
			value: ""
		},

		_taskSearch: {
			type: String
		},

		_inProgressAndCompletedTasks: {
			type: Array,
		},

		_unassignedTasks: {
			type: Array,
			notify: true
		},

		_loadingMyInProgressTasks: {
			type: Boolean,
			value: false
		},

		_loadingMyCompletedTasks: {
			type: Boolean,
			value: false
		},

		_loadingMyDraftTasks: {
			type: Boolean,
			value: false
		},

		_loadingMyClosedTasks: {
			type: Boolean,
			value: false
		},

		_loadingMyTask: {
			type: Boolean,
			value: false
		},

		_loadingUnassignedTaskList: {
			type: Boolean,
			value: false
		},

		_loadingUnassignedTask: {
			type: Boolean,
			value: false
		},

		_openTimeLogs: {
			type: Array
		},

		_timeLogs: {
			type: Array
		},

		smallLayout: {
			type: Boolean,
			notify: true
		},

		mediumLayout: {
			type: Boolean,
			notify: true
		},

		selectedTab: {
			type: String,
			observer: "_observeSelectedTabChanged"
        }, 

		currentLayout: {
			type: String,
			observer: "_observeLayoutChanged"
		},

		_offlineContext: {
			type: Object,
			value: function () {
				var __dictionary__startTask = "Start the timer on {1} for Task ID {2}.";
				var __dictionary__stopTask = "Stop the timer on {1} for Task ID {2}.";
				var __dictionary__deleteTask = "Delete the draft task.";

				var _messages = {};
				_messages["START_TASK"] = __dictionary__startTask;
				_messages["STOP_TASK"] = __dictionary__stopTask;
				_messages["DELETE_TASK"] = __dictionary__deleteTask;

				return _messages;
			}
		},

		disableMyClosed: {
			type: Boolean,
			notify: true,
			value: true,
			observer: "_observeDisableMyClosed"
		},

		disableMyUnassigned: {
			type: Boolean,
			notify: true,
			value: true,
			observer: "_observeDisableMyUnassigned"
		},

		disableMyInprogress:{
			type: Boolean,
			notify: true,
			value: true,
			observer: "_observeDisableMyInprogress"
		},

		disableMyCompleted:{
			type: Boolean,
			notify: true,
			value: true,
			observer: "_observeDisableMyCompleted"
		},

		disableMyDraft:{
			type: Boolean,
			notify: true,
			value: true,
			observer: "_observeDisableMyDraft"
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

		resetUnassignedLocateSearchScroller: {
			type: Boolean,
			notify: true,
		},

		resetClosedLocateSearchScroller: {
			type: Boolean,
			notify: true,
		},

		resetInprogressLocateSearchScroller: {
			type: Boolean,
			notify: true,
		},

		resetCompletedLocateSearchScroller: {
			type: Boolean,
			notify: true,
		},

		resetDraftLocateSearchScroller: {
			type: Boolean,
			notify: true,
		},

		unassignedScroller: {
			type: Object,
			notify: true
		},

		closedScroller: {
			type: Object,
			notify: true
		},

		inprogressScroller:{
			type: Object,
			notify: true
		},

		completedScroller:{
			type: Object,
			notify: true
		},

		draftScroller:{
			type: Object,
			notify: true
		},

		
	
	},

	observers: [
		"_computeLoadingTasks(_loadingMyInProgressTasks,_loadingMyCompletedTasks,_loadingMyDraftTasks,_loadingMyClosedTasks, _loadingMyTask, _loadingUnassignedTaskList, _loadingUnassignedTask)",
		"_handleTaskFilterChanged(taskFilter, _serviceReady)",
		"_handleTaskSearchChanged(taskSearch, _serviceReady)",
		"_handleMyTaskChanged(myTask)"
	],

	ready: function() {
		if (this._isRootInstance) {
			this._computeSmallLayout();
		}
	},

	_handleMyTaskChanged: function(myTask) {
		if (myTask && myTask.description == null) {
			this.myTask.description = "";
		}
	},

	_observeRunningOfflineMode:function(){
		if(!this.online){
			this.myInProgressTasksQueryScroll.set('from', 0);
			this.myCompletedTasksQueryScroll.set('from', 0);
			this.myDraftTasksQueryScroll.set('from', 0);	    
		}
	},

	_computeSmallLayout: function() {
		this.smallLayout = (screen.width < 600 || screen.height < 600);
	},

	refreshTask: function(taskId, force) {
		if (this._isRootInstance) {
			var myTaskDSInstance = this.$$("#myTaskDSInstance");
			if (force || this.myTask == null || myTaskDSInstance.instanceId != taskId) {
				myTaskDSInstance.instanceId = taskId;
				return this.myTaskDS.refresh().then(this._returnDataFromResponse.bind(this));
			} else {
				return Promise.resolve(this.myTask);
			}
		} else {
			return this._rootInstance.refreshTask(taskId, force);
		}
	},

	refreshUnassignedTask: function(taskId, force) {
		if (this._isRootInstance) {
			var unassignedTaskDSInstance = this.$$("#unassignedTaskDSInstance");
			if (force || this.unassignedTask == null || unassignedTaskDSInstance.instanceId != taskId) {
				unassignedTaskDSInstance.instanceId = taskId;
				return this.unassignedTaskDS.refresh().then(this._returnDataFromResponse.bind(this));
			} else {
				return Promise.resolve(this.unassignedTask);
			}
		} else {
			return this._rootInstance.refreshUnassignedTask(taskId, force);
		}
	},

	deleteTask: function(taskId, fromTaskList) {
		if (this._isRootInstance) {
			this.loadingDeleteTaskAction = true;
			var tasksDs = this.$$("#inProgressAndCompletedTasksDS");
			return tasksDs.deleteRecord(taskId, TriPlatDs.RefreshType.SERVER, null, null, null,
				this._buildOfflineContextMessage("DELETE_TASK"))
				.then(function (success) {
					this.myTask = null;
					this.loadingDeleteTaskAction = false;
					var __dictionary__taskDeleted = "Work task has been deleted.";
					this._fireToastAlert("success", __dictionary__taskDeleted);
				}.bind(this))
				.catch(function (error) {
					this.loadingDeleteTaskAction = false;
					return Promise.reject(error);
				}.bind(this));
		} else {
			return this._rootInstance.deleteTask(taskId);
		}
	},

	refreshInProgressAndCompletedTasks: function() {
		if (this._isRootInstance) {
			return this.$$("#inProgressAndCompletedTasksDS").refresh().then(this._returnDataFromResponse.bind(this));
		} else {
			return this._rootInstance.refreshInProgressAndCompletedTasks();
		}
	},

	refreshUnassignedTasks: function() {
		if (this._isRootInstance) {
			return this.$$("#unassignedTaskListDS").refresh().then(this._returnDataFromResponse.bind(this));
		} else {
			return this._rootInstance.refreshUnassignedTasks();
		}
	},

	cacheUnassignedTasks: function() {
		if (this._isRootInstance) {
			return this.refreshUnassignedTasks()
				.then(function (unassignedTasks) {
					return this.myTaskDSOffline.cacheRecords(false, unassignedTasks)
						.then(this.unassignedTaskListDSOffline.cacheRecords.bind(this.unassignedTaskListDSOffline, false, unassignedTasks));
				}.bind(this));
		} else {
			return this._rootInstance.cacheUnassignedTasks();
		}
	},

	refreshTaskTimeLog: function(taskId, timeLogId, force) {
		if (this._isRootInstance) {
			if (force || this.timeLog == null || this.timeLogInstanceDSContext.contextId != taskId || this.timeLogInstanceDSInstance.instanceId != timeLogId) {
				this.timeLogInstanceDSContext.contextId = taskId;
				this.timeLogInstanceDSInstance.instanceId = timeLogId;
				return this.timeLogInstanceDS.refresh().then(this._returnDataFromResponse.bind(this));
			} else {
				return Promise.resolve(this.timeLog);
			}
		} else {
			return this._rootInstance.refreshTaskTimeLog(taskId, timeLogId, force);
		}
	},

	refreshTaskTimeLogs: function(taskId, force) {
		if (this._isRootInstance) {
			if (force || this.timeLogs == null || this.timeLogListDSContext.contextId != taskId) {
				this.timeLogListDSContext.contextId = taskId;
				return this.timeLogListDS.refresh().then(this._returnDataFromResponse.bind(this));
			} else {
				return Promise.resolve(this.timeLogs);
			}
		} else {
			return this._rootInstance.refreshTaskTimeLogs(taskId, force);
		}
	},

	getOpenTaskTimeLog: function(taskId) {
		if (this._isRootInstance) {
			return this.refreshTaskTimeLogs(taskId).then(function () {
				if (this._openTimeLogs.length == 1) {
					return this._openTimeLogs[0]
				}
			}.bind(this));
		} else {
			return this._rootInstance.getOpenTaskTimeLog(taskId);
		}
	},

	startTask: function(taskId, refreshTaskList) {
		if (this._isRootInstance) {
			this.loadingTimerAction = true;
			var timeLog = {
				plannedStart: this.getCurrentDatetime(),
			};
			if (!this.online) {
				timeLog.hours = 0;
				timeLog.profileId = this.currentUser._id;
				timeLog.personName = this.currentUser.fullName;
				timeLog.date = timeLog.plannedStart;
			}
			var time = this.formatDateWithTimeZone(timeLog.plannedStart, this.currentUser._TimeZoneId, this.currentUser._DateTimeFormat, this.currentUser._Locale);
			this.timeLogListDSContext.contextId = taskId;
			return this.timeLogListDS.createRecord(
				timeLog, TriPlatDs.RefreshType.SERVER, "defaultActions", "start", null,
				this._buildOfflineContextMessage("START_TASK", time, this.getTaskID(taskId, refreshTaskList)))
				.then(this.applyTimeLogChangesToTask.bind(this, taskId, timeLog))
				.then(this._refreshTaskListOrInstance.bind(this, taskId, refreshTaskList))
				.then(
					function () {
						this.loadingTimerAction = false;
						var __dictionary__startTaskActionSuccess = "Timer started";
						this._fireToastAlert("success", __dictionary__startTaskActionSuccess, time);
					}.bind(this)
				)
				.catch(function (error) {
					this.loadingTimerAction = false;
					return Promise.reject(error);
				}.bind(this));
		} else {
			return this._rootInstance.startTask(taskId, refreshTaskList);
		}
	},

	stopTask: function(taskId, refreshTaskList) {
		if (this._isRootInstance) {
			this.loadingTimerAction = true;
			return this.getOpenTaskTimeLog(taskId).then(function (timeLog) {
				if (timeLog) {
					timeLog.plannedEnd = this.getCurrentDatetime();
					if (!this.online) {
						timeLog.hours = this.computeDuration(timeLog.plannedStart, timeLog.plannedEnd);
					}
					var time = this.formatDateWithTimeZone(timeLog.plannedEnd, this.currentUser._TimeZoneId, this.currentUser._DateTimeFormat, this.currentUser._Locale);
					this.timeLogListDSContext.contextId = taskId;
					return this.timeLogListDS.updateRecord(
						timeLog._id, TriPlatDs.RefreshType.SERVER, "defaultActions", "stop", null,
						this._buildOfflineContextMessage("STOP_TASK", time, this.getTaskID(taskId, refreshTaskList)))
						.then(this.applyTimeLogChangesToTask.bind(this, taskId, timeLog))
						.then(this._refreshTaskListOrInstance.bind(this, taskId, refreshTaskList))
						.then(
							function () {
								this.loadingTimerAction = false;
								var __dictionary__stopTaskActionSuccess = "Timer stopped";
								this._fireToastAlert("success", __dictionary__stopTaskActionSuccess, time);
							}.bind(this)
						)
						.catch(function (error) {
							this.loadingTimerAction = false;
							return Promise.reject(error);
						}.bind(this));
				} else {
					this.loadingTimerAction = false;
					var __dictionary__stopTaskError = "This work task was already started by another user. Only the user who started the task can stop it.";
					this._fireToastAlert("error", __dictionary__stopTaskError);
					throw __dictionary__stopTaskError;
				}
			}.bind(this));
		} else {
			return this._rootInstance.stopTask(taskId, refreshTaskList);
		}
	},

	getTaskID: function(taskId, fromList) {
		if (this._isRootInstance) {
			if (fromList) {
				for (var i = 0; this.myInProgressTasks && i < this.myInProgressTasks.length; i++) {
					if (this.myInProgressTasks[i]._id == taskId) {
						return this.myInProgressTasks[i].taskID;
					}
				}
				return "";
			} else {
				return this.myTask && this.myTask._id == taskId ? this.myTask.taskID : "";
			}
		} else {
			return this._rootInstance.getTaskID(taskId, fromList);
		}
	},

	_refreshTaskListOrInstance: function(taskId, refreshTaskList) {
		if (refreshTaskList) {
			return this.refreshInProgressAndCompletedTasks();
		} else {
			return this.refreshTask(taskId, true);
		}
	},

	computeDuration: function(startDate, endDate) {
		if (!startDate || !endDate) {
			return 0;
		}
		var milliseconds = this.toMilliseconds(endDate) - this.toMilliseconds(startDate);
		var hours = milliseconds / 3600000;

		return hours;
	},

	_computeLoadingTasks: function(loadingMyInProgressTasks,loadingMyCompletedTasks,loadingMyDraftTasks,loadingMyClosedTasks, loadingMyTask, loadingUnassignedTaskList, loadingUnassignedTask) {
		if (!assertParametersAreDefined(arguments)) {
			return;
		}

		this.loadingTasks = loadingMyInProgressTasks || loadingMyCompletedTasks || loadingMyDraftTasks || loadingMyClosedTasks || loadingMyTask || loadingUnassignedTaskList || loadingUnassignedTask;
	},

	_handleTaskSearchChanged: function(taskSearch, serviceReady) {
		if (!assertParametersAreDefined(arguments)) {
			return;
		}

		if (!this._isRootInstance || !serviceReady) {
			return;
		}

		this._taskSearch = taskSearch;
	},

	applyTimeLogChangesToTask: function(taskId, timeLog) {
		if (this._isRootInstance) {
			if (this.online) {
				return Promise.resolve();
			}
			return this.refreshTask(taskId).then(function (task) {
				if (!timeLog.plannedEnd) {
					task.assignmentStatusENUS = "On Site";
				} else {
					task.assignmentStatusENUS = "Accepted";
				}
				task.actualStart = task.actualStart != null ? task.actualStart : timeLog.plannedStart;
				return this.myTaskDSOffline.cacheRecords(false, task);
			}.bind(this));
		} else {
			return this._rootInstance.applyTimeLogChangesToTask(taskId, timeLog);
		}
	},

	_handleInProgressAndCompletedTasksGet: function() {
		var tasks = this.$$("#inProgressAndCompletedTasksDS").filteredData;
		if (tasks) {
			this._modifyNoPriorityForSorting(tasks);
			this._addLocationToTasks(tasks)
		}
		this._inProgressAndCompletedTasks = tasks;
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

	_handleMyClosedTasksGet: function() {
		this._modifyNoPriorityForSorting(this.myClosedTasks);
	},

	_handleUnassignedTasksGet: function() {
		this._modifyNoPriorityForSorting(this.unassignedTasks);
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

	_observeDisableMyDraft: function(disable) {
		if (this._isRootInstance) {
			if (disable) {
				this.myDraftTasksQueryScroll.reset();
			}
		}
	},

	_closedFromChanged: function(curFrom, prevFrom){
		if(curFrom > prevFrom){
			this._closedPrevFrom = curFrom;	
		} else if(this._closedPrevFrom > curFrom && this._tabSwitched){
				this.myClosedTasksQueryScroll.set('from', this._closedPrevFrom);
				this._tabSwitched = false;
		} else if(this._closedPrevFrom > curFrom && this._taskSearch){
			this.myClosedTasksQueryScroll.set('from', this._closedPrevFrom);
		} else if(this._layoutSwitched){
			this.myClosedTasksQueryScroll.set('from', this._closedPrevFrom);
			this._layoutSwitched = false;
	    }
	},

	

	_unassignedFromChanged: function(curFrom, prevFrom){	
		if(curFrom > prevFrom){
			this._unassignedPrevFrom = curFrom;
		} else if( this._tabSwitched && this._unassignedPrevFrom > curFrom){
			this.myUnassignedTasksQueryScroll.set('from', this._unassignedPrevFrom);
			this._tabSwitched = false;
		} else if(this._unassignedPrevFrom > curFrom && this._taskSearch){
			this.myUnassignedTasksQueryScroll.set('from', this._unassignedPrevFrom);
		} else if(this._layoutSwitched){
			this.myUnassignedTasksQueryScroll.set('from', this._unassignedPrevFrom);
			this._layoutSwitched = false;
		}
	
	},

	_inprogressFromChanged: function(curFrom, prevFrom){
		if(curFrom > prevFrom){
			this._inProgressPrevFrom = curFrom;
		} else if(this._inProgressPrevFrom > curFrom && this._tabSwitched){
				this.myInProgressTasksQueryScroll.set('from', this._inProgressPrevFrom);				
				this._tabSwitched = false;
		} else if(this._inProgressPrevFrom > curFrom && this._taskSearch){
			this.myInProgressTasksQueryScroll.set('from', this._inProgressPrevFrom);			
	    } else if(this._layoutSwitched){
			this.myInProgressTasksQueryScroll.set('from', this._inProgressPrevFrom);				
			this._layoutSwitched = false;
	    } 
	},

	_completedFromChanged: function(curFrom, prevFrom){
		if(curFrom > prevFrom){
			this._completedPrevFrom = curFrom;
		} else if(this._completedPrevFrom > curFrom && this._tabSwitched){
				this.myCompletedTasksQueryScroll.set('from', this._completedPrevFrom);				
				this._tabSwitched = false;
		} else if(this._completedPrevFrom > curFrom && this._taskSearch){
			this.myCompletedTasksQueryScroll.set('from', this._completedPrevFrom);				
	    } else if(this._layoutSwitched){
			this.myCompletedTasksQueryScroll.set('from', this._completedPrevFrom);				
			this._layoutSwitched = false;
	    } 
	    
	},

	_draftFromChanged: function(curFrom, prevFrom){
		if(curFrom > prevFrom){
			this._draftPrevFrom = curFrom;
		} else if(this._draftPrevFrom > curFrom && this._tabSwitched){
				this.myDraftTasksQueryScroll.set('from', this._draftPrevFrom);				
				this._tabSwitched = false;
		} else if(this._draftPrevFrom > curFrom && this._taskSearch){
			this.myDraftTasksQueryScroll.set('from', this._draftPrevFrom);					
	    } else if(this._layoutSwitched){
			this.myDraftTasksQueryScroll.set('from', this._draftPrevFrom);				
			this._layoutSwitched = false;
	    }
	},

	_observeSelectedTabChanged: function(curSelect, prevSelect){
		if(curSelect !== prevSelect && prevSelect){
			this._tabSwitched = true;
		}
	},

	_observeLayoutChanged: function(curSelect, prevSelect){
		if(curSelect !== prevSelect && prevSelect){
			this._layoutSwitched = true;
		}
	},

	_computeScroller: function(flag, scroller) {
		return flag ? null : scroller;
	},

	get myTaskDS() {
		return this._isRootInstance ? this.$$("#myTaskDS") : this._rootInstance.myTaskDS;
	},

	get myTaskDSOffline() {
		return this._isRootInstance ? this.$$("#myTaskDSOffline") : this._rootInstance.myTaskDSOffline;
	},

	get unassignedTaskDS() {
		return this._isRootInstance ? this.$$("#unassignedTaskDS") : this._rootInstance.unassignedTaskDS;
	},

	get timeLogListDS() {
		return this._isRootInstance ? this.$$("#timeLogListDS") : this._rootInstance.timeLogListDS;
	},

	get timeLogListDSContext() {
		return this._isRootInstance ? this.$$("#timeLogListDSContext") : this._rootInstance.timeLogListDSContext;
	},

	get timeLogInstanceDS() {
		return this._isRootInstance ? this.$$("#timeLogInstanceDS") : this._rootInstance.timeLogInstanceDS;
	},

	get timeLogInstanceDSContext() {
		return this._isRootInstance ? this.$$("#timeLogInstanceDSContext") : this._rootInstance.timeLogInstanceDSContext;
	},

	get timeLogInstanceDSInstance() {
		return this._isRootInstance ? this.$$("#timeLogInstanceDSInstance") : this._rootInstance.timeLogInstanceDSInstance;
	},

	get unassignedTaskListDSOffline() {
		return this._isRootInstance ? this.$$("#unassignedTaskListDSOffline") : this._rootInstance.unassignedTaskListDSOffline;
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