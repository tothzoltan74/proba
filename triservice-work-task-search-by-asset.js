/* IBM Confidential‌ - OCO Source Materials‌ - (C) COPYRIGHT IBM CORP. 2017-2021 - The source code for this program is not published or otherwise‌ divested of its trade secrets, irrespective of what has been‌ deposited with the U.S. Copyright Office. */

import { Polymer } from "../@polymer/polymer/lib/legacy/polymer-fn.js";
import { html } from "../@polymer/polymer/lib/utils/html-tag.js";

import { assertParametersAreDefined } from "../tricore-util/tricore-util.js";

import "../triplat-ds/triplat-ds.js";
import "../triplat-query/triplat-query.js";
import { TriPlatViewBehaviorImpl, TriPlatViewBehavior } from "../triplat-view-behavior/triplat-view-behavior.js";

import { TriTaskSearchBehavior } from "./tribehav-task-search.js";
import { TriTaskServiceBehavior } from "./tribehav-task-service.js";
import "./triservice-work-task-base.js";

Polymer({
	_template: html`
		<template is="dom-if" if="[[_isRootInstance]]">
			<triservice-work-task-base id="workTaskBaseService"></triservice-work-task-base>

			<triplat-ds id="assetsAssociatedToMyInprogressTasksDS" name="assetsAssociatedToMyInProgressTasks" filtered-data="{{myTasksRequestedAssets}}" loading="{{_loadingMyTasksRequestedAssets}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="id" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank>
					</triplat-query-filter>
				</triplat-query>
			</triplat-ds>
			<triplat-ds id="assetsAssociatedToMyCompletedTasksDS" name="assetsAssociatedToMyCompletedTasks" filtered-data="{{myTasksRequestedAssets}}" loading="{{_loadingMyTasksRequestedAssets}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="id" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank>
					</triplat-query-filter>
				</triplat-query>
			</triplat-ds>
			<triplat-ds id="assetsAssociatedToMyDraftTasksDS" name="assetsAssociatedToMyDraftTasks" filtered-data="{{myTasksRequestedAssets}}" loading="{{_loadingMyTasksRequestedAssets}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="id" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank>
					</triplat-query-filter>
				</triplat-query>
			</triplat-ds>
			<triplat-ds id="assetsAssociatedToMyClosedTasksDS" name="assetsAssociatedToMyClosedTasks" filtered-data="{{myTasksRequestedAssets}}" loading="{{_loadingMyTasksRequestedAssets}}" force-server-filtering manual>
				<triplat-query delay="0">
				
					<triplat-query-filter name="name" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="id" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank>
					</triplat-query-filter>
				</triplat-query>
			</triplat-ds>
			<triplat-ds id="assetsAssociatedToMyUnassignedTasksDS" name="assetsAssociatedToMyUnassignedTasks" filtered-data="{{myTasksRequestedAssets}}" loading="{{_loadingMyTasksRequestedAssets}}" force-server-filtering manual>
				<triplat-query delay="0">
					<triplat-query-filter name="name" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="id" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="contains" value="[[_assetsSearch]]" ignore-if-blank>
					</triplat-query-filter>
					<triplat-query-or></triplat-query-or>
					<triplat-query-filter name="barCode" operator="equals" value="[[scannedData]]" ignore-if-blank>
					</triplat-query-filter>
				</triplat-query>
			</triplat-ds> 

			<triplat-ds id="myInProgressTasksDS" name="myTasksAssociatedToAsset" filtered-data="{{myInProgressTasks}}" loading="{{_loadingMyInProgressTasks}}" force-server-filtering disable="[[disableMyInProgress]]" on-ds-get-complete="_handleMyInProgressTasksGet">
				<triplat-ds-context name="assetsAssociatedToMyInProgressTasks" context-id="[[selectedSearchItem._id]]"></triplat-ds-context>
				<triplat-query delay="0">
				<triplat-query-scroll-page id="myInProgressTasksQueryScroll" from="{{_inprogressFrom}}" scroller="[[inprogressAssetsScroller]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
					<triplat-query-open-paren></triplat-query-open-paren>
						<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Active" ignore-if-blank></triplat-query-filter> 
						<triplat-query-or></triplat-query-or>
						<triplat-query-filter name="statusENUS" operator="starts with" type="STRING_WITH_ID" value="Hold" ignore-if-blank></triplat-query-filter> 
						<triplat-query-close-paren></triplat-query-close-paren>
						<triplat-query-and></triplat-query-and>
						<triplat-query-open-paren></triplat-query-open-paren>
						<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
						<triplat-query-close-paren></triplat-query-close-paren>
						<triplat-query-and></triplat-query-and>
						<triplat-query-open-paren></triplat-query-open-paren>
						<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
						<triplat-query-close-paren></triplat-query-close-paren>
						<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
						<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
				</triplat-query>
			</triplat-ds>

			<triplat-ds id="myCompletedTasksDS" name="myTasksAssociatedToAsset" filtered-data="{{myCompletedTasks}}" loading="{{_loadingMyCompletedTasks}}" force-server-filtering disable="[[disableMyCompleted]]" on-ds-get-complete="_handleMyCompletedTasksGet">
				<triplat-ds-context name="assetsAssociatedToMyCompletedTasks" context-id="[[selectedSearchItem._id]]"></triplat-ds-context> 
				<triplat-query delay="0">
				<triplat-query-scroll-page id="myCompletedTasksQueryScroll" from="{{_completedFrom}}" scroller="[[completedAssetsScroller]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
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

			<triplat-ds id="myDraftTasksDS" name="myTasksAssociatedToAsset" filtered-data="{{myDraftTasks}}" loading="{{_loadingMyDraftTasks}}" force-server-filtering disable="[[disableMyDraft]]" on-ds-get-complete="_handleMyDraftTasksGet">
				<triplat-ds-context name="assetsAssociatedToMyDraftTasks" context-id="[[selectedSearchItem._id]]"></triplat-ds-context> 
				<triplat-query delay="0"> 
				<triplat-query-scroll-page id="myDraftTasksQueryScroll" from="{{_draftFrom}}" scroller="[[draftAssetsScroller]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
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

			<triplat-ds id="unassignedTaskListDS" name="unassignedTasksAssociatedToAssetForMyTeam" filtered-data="{{unassignedTasks}}" loading="{{_loadingMyunassingedTasks}}" force-server-filtering disable="[[disableMyUnassigned]]"  on-ds-get-complete="_handleUnassignedTasksGet">
				<triplat-ds-context name="assetsAssociatedToMyUnassignedTasks" context-id="[[selectedSearchItem._id]]"></triplat-ds-context> 
				<triplat-query delay="0"> 
				<triplat-query-scroll-page id="myUnassignedTasksQueryScroll" from="{{_unassignedFrom}}" scroller="[[unassignedAssetsScroller]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
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

			<triplat-ds id="myClosedTasksDS" name="myTasksAssociatedToAsset" filtered-data="{{myClosedTasks}}" loading="{{_loadingMyClosedTasks}}" force-server-filtering disable="[[disableMyClosed]]" on-ds-get-complete="_handleMyClosedTasksGet">
				<triplat-ds-context name="assetsAssociatedToMyClosedTasks" context-id="[[selectedSearchItem._id]]"></triplat-ds-context>
					<triplat-query delay="300">
					<triplat-query-scroll-page id="myClosedTasksQueryScroll" from="{{_closedFrom}}" scroller="[[closedAssetsScroller]]" size="50" disable-auto-fetch="" threshold="20"></triplat-query-scroll-page>
						<triplat-query-filter name="statusENUS" operator="equals" type="STRING_WITH_ID" value="Closed"></triplat-query-filter>
						<triplat-query-and></triplat-query-and>
						<triplat-query-filter name="taskTypeENUS" operator="equals" value="[[_selectedTaskType]]" ignore-if-blank></triplat-query-filter>
						<triplat-query-and></triplat-query-and>
						<triplat-query-filter name="createdById" operator="equals" value="[[_currentUserId]]" ignore-if-blank></triplat-query-filter>
						<triplat-query-sort name="[[sortField]]" desc="[[sortDesc]]" type="[[sortType]]"></triplat-query-sort>
						<triplat-query-sort name="plannedStart" desc type="DATE_TIME"></triplat-query-sort>
					</triplat-query>
				</triplat-ds>
			</triplat-ds>
		</template>
	`,

	is: "triservice-work-task-search-by-asset",

	behaviors: [
		TriPlatViewBehavior,
		TriTaskSearchBehavior,
		TriTaskServiceBehavior
	],

	properties: {

		scannedData: {
			type: String,
			notify: true
		},

		assetsSearch: {
			type: String,
			notify: true,
			value: ""
		},

		_assetsSearch: {
			type: String
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

		myTasksRequestedAssets: {
			type: Array,
			notify: true
		},

		selectedSearchItem:  {
			type: Object,
			notify: true
		},

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
			notify: true,
			value: []
		},

		disableMyInProgress: {
			type: Boolean,
			value: true,
			notify: true,
			observer: "_observeDisableMyInprogress"
		},

		disableMyCompleted: {
			type: Boolean,
			value: true,
			notify: true,
			observer: "_observeDisableMyCompleted"
		},

		disableMyDraft: {
			type: Boolean,
			value: true,
			notify: true,
			observer: "_observeDisableMyDraft"
		},

		disableMyUnassigned: {
			type: Boolean,
			value: true,
			notify: true,
			observer: "_observeDisableMyUnassigned"
		},

		disableMyClosed: {
			type: Boolean,
			value: true,
			notify: true,
			observer: "_observeDisableMyClosed"
		},

		loadingTasks: {
			type: Boolean,
			value: false,
			notify: true
		},

		_loadingMyTasksRequestedAssets: {
			type: Boolean,
			value: false
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

		_loadingMyunassingedTasks: {
			type: Boolean,
			value: false
		},

		_loadingMyClosedTasks: {
			type: Boolean,
			value: false
		},

		_closedFrom:{
			type: Number,
			notify: true,
			observer: "_closedFromChanged"
		},

		_unassignedFrom:{
			type: Number,
			notify: true,
			observer: "_unassignedFromChanged"
		},

		_draftFrom:{
			type: Number,
			notify: true,
			observer: "_draftFromChanged"
		},

		_completedFrom:{
			type: Number,
			notify: true,
			observer: "_completedFromChanged"
		},

		_inprogressFrom:{
			type: Number,
			notify: true,
			observer: "_inprogressFromChanged"
		},

		closedAssetsScroller: {
            type: Object,
            notify: true
        },

		unassignedAssetsScroller: {
            type: Object,
            notify: true
        },

		draftAssetsScroller: {
            type: Object,
            notify: true
        },

		completedAssetsScroller: {
            type: Object,
            notify: true
        },

		inprogressAssetsScroller: {
            type: Object,
            notify: true
        }

	},

	observers: [
		"_computeLoadingTasks(_loadingMyTasksRequestedAssets, _loadingMyInProgressTasks, _loadingMyCompletedTasks, _loadingMyDraftTasks, _loadingMyunassingedTasks, _loadingMyClosedTasks)",
		"_handleAssetsSearchChanged(assetsSearch, _serviceReady)",
		"_handleTaskFilterChanged(taskFilter, _serviceReady)",
		"_onSearchTaskAssets(assetsSearch, disableMyInProgress, disableMyCompleted, disableMyDraft, disableMyUnassigned, disableMyClosed)",
		"_onFilterTasksByAssets(selectedSearchItem, disableMyInProgress, disableMyCompleted, disableMyDraft, disableMyUnassigned, disableMyClosed)",
		"_computeNameIdBarcode(myTasksRequestedAssets)"
	],

	get baseService() {
		return this.$$("#workTaskBaseService");
	},

	get currentUser() {
		return this.baseService.currentUser;
	},

	_onSearchTaskAssets: function(assetsSearch, disableMyInProgress, disableMyCompleted, disableMyDraft, disableMyUnassigned, disableMyClosed) {
		if (this._isRootInstance) {
			this.debounce("_debounceRefreshAssets", function() {
				this.set('_closedFrom',0);
				this.set('_unassignedFrom',0);
				this.set('_draftFrom',0)
				this.set('_completedFrom',0)
				this.set('_inprogressFrom',0)
				if(assetsSearch && !this.selectedSearchItem) {
					if (!disableMyInProgress) {
						this.$$("#assetsAssociatedToMyInprogressTasksDS").refresh();
					} else if(!disableMyCompleted) {
						this.$$("#assetsAssociatedToMyCompletedTasksDS").refresh();
					} else if(!disableMyDraft) {
						this.$$("#assetsAssociatedToMyDraftTasksDS").refresh();
					} else if(!disableMyUnassigned) {
						this.$$("#assetsAssociatedToMyUnassignedTasksDS").refresh();
					} else if(!disableMyClosed) {
						this.$$("#assetsAssociatedToMyClosedTasksDS").refresh();
					}
				}
			}.bind(this), 300);
		}
	},

	_onFilterTasksByAssets: function(selectedSearchItem, disableMyInProgress, disableMyCompleted, disableMyDraft, disableMyUnassigned, disableMyClosed) {
		if (this._isRootInstance) {
			if (!(disableMyInProgress && disableMyCompleted && disableMyDraft && disableMyUnassigned && disableMyClosed) && selectedSearchItem && selectedSearchItem._id && selectedSearchItem._id != "") {
				this.refreshTasks(selectedSearchItem);
			}
		}
	},

	refreshTasks: function(selectedSearchItem) {
		if (this._isRootInstance) {
			if(selectedSearchItem)
				this._handleRefreshTasks(!this.disableMyInProgress, !this.disableMyCompleted, !this.disableMyDraft, !this.disableMyUnassigned, !this.disableMyClosed);
		} else {
			this._rootInstance.refreshTasks(selectedSearchItem);
		}
	},

	_handleRefreshTasks: function(inProgressRouteActive, completedRouteActive, draftRouteActive, unassignedRouteActive, closedRouteActive) {
		if (this._isRootInstance) {
			if(inProgressRouteActive)
				this.$$("#myInProgressTasksDS").refresh();
			else if(completedRouteActive)
				this.$$("#myCompletedTasksDS").refresh();
			else if(draftRouteActive)
				this.$$("#myDraftTasksDS").refresh();
			else if(unassignedRouteActive)
				this.$$("#unassignedTaskListDS").refresh();
			else if(closedRouteActive)
				this.$$("#myClosedTasksDS").refresh();
		}
	},

	_handleAssetsSearchChanged: function(assetsSearch, serviceReady) {
		if (!assertParametersAreDefined(arguments)) {
			return;
		}

		if (!this._isRootInstance || !serviceReady) {
			return;
		}

		this.debounce("_debounceAssetsSearch", function() {
			this._assetsSearch = assetsSearch;
		}.bind(this));
	},

	_computeNameIdBarcode: function(myTasksRequestedAssets) {
		if(this._isRootInstance && myTasksRequestedAssets) {
			myTasksRequestedAssets.forEach(asset => {
				let id = asset.id ? ", " + asset.id : "";
				let barCode = asset.barCode ? ", " + asset.barCode : "";
				asset.computedAsset = asset.name + id + barCode;
			});
		}
	},

	_computeLoadingTasks: function(loadingMyTasksRequestedAssets, loadingMyInProgressTasks, loadingMyCompletedTasks, loadingMyDraftTasks, loadingMyunassingedTasks, loadingMyClosedTasks) {
		if (!assertParametersAreDefined(arguments)) {
			return;
		}
		this.loadingTasks = loadingMyTasksRequestedAssets || loadingMyInProgressTasks || loadingMyCompletedTasks || loadingMyDraftTasks || loadingMyunassingedTasks || loadingMyClosedTasks;
	},

	
	_closedFromChanged: function(curFrom, prevFrom){
		if(curFrom > prevFrom){
			this._closedPrevFrom = curFrom;	
		} else if(this._closedPrevFrom > curFrom && !this.assetsSearch){
			this.myClosedTasksQueryScroll.set('from',this._closedPrevFrom);
		}
	},

	_unassignedFromChanged:function(curFrom, prevFrom,){	
		if(curFrom > prevFrom){
			this._unassignedPrevFrom = curFrom;
		} else if(this._unassignedPrevFrom > curFrom && !this.assetsSearch){
			this.myUnassignedTasksQueryScroll.set('from',this._unassignedPrevFrom);
		 }
	},

	_draftFromChanged: function(curFrom, prevFrom){
		if(curFrom > prevFrom){
			this._draftPrevFrom = curFrom;
		} else if(this._draftPrevFrom > curFrom &&  !this.assetsSearch){
				this.myDraftTasksQueryScroll.set('from',this._draftPrevFrom);				
		} 
	},

	_completedFromChanged: function(curFrom, prevFrom){
		if(curFrom > prevFrom){
			this._completedPrevFrom = curFrom;
		}  else if(this._completedPrevFrom > curFrom  &&  !this.assetsSearch ){
			this.myCompletedTasksQueryScroll.set('from',this._completedPrevFrom);				
			
	    }
	},

	_inprogressFromChanged: function(curFrom, prevFrom){
		if(curFrom > prevFrom){
			this._inProgressPrevFrom = curFrom;
		} else if(this._inProgressPrevFrom > curFrom  &&  !this.assetsSearch ){
			this.myInProgressTasksQueryScroll.set('from',this._inProgressPrevFrom);				
			
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

	_handleMyInProgressTasksGet: function() {
		this._modifyNoPriorityForSorting(this.myInProgressTasks);
		if (this._isRootInstance) {
			this._addLocationToTasks(this.myInProgressTasks);
		}
	},

	_handleMyCompletedTasksGet: function() {
		this._modifyNoPriorityForSorting(this.myCompletedTasks);
		if (this._isRootInstance) {
			this._addLocationToTasks(this.myCompletedTasks);
		}
	},

	_handleMyDraftTasksGet: function() {
		this._modifyNoPriorityForSorting(this.myDraftTasks);
		if (this._isRootInstance) {	
			this._addLocationToTasks(this.myDraftTasks);
		}
	},

	_handleMyClosedTasksGet: function() {
		this._modifyNoPriorityForSorting(this.myClosedTasks);
		
	},

	_handleUnassignedTasksGet: function() {
		this._modifyNoPriorityForSorting(this.unassignedTasks);
		if (this._isRootInstance) {	
			this._addLocationToTasks(this.unassignedTasks);
		}
	},

	get myClosedTasksQueryScroll() {
		return this._isRootInstance ? this.$$("#myClosedTasksQueryScroll") : this._rootInstance.myClosedTasksQueryScroll;
	},

	get myUnassignedTasksQueryScroll() {
		return this._isRootInstance ? this.$$("#myUnassignedTasksQueryScroll") : this._rootInstance.myUnassignedTasksQueryScroll;
	},

	get myDraftTasksQueryScroll() {
		return this._isRootInstance ? this.$$("#myDraftTasksQueryScroll") : this._rootInstance.myDraftTasksQueryScroll;
	},

	get myInProgressTasksQueryScroll() {
		return this._isRootInstance ? this.$$("#myInProgressTasksQueryScroll") : this._rootInstance.myInProgressTasksQueryScroll;
	},

	get myCompletedTasksQueryScroll() {
		return this._isRootInstance ? this.$$("#myCompletedTasksQueryScroll") : this._rootInstance.myCompletedTasksQueryScroll;
	},


});