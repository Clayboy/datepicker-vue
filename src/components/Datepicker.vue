<template>
	<div class="datepicker__container">
		<input type="text" :value="date_formatted" :name="name" @focus="showDatepicker()" @click.stop />
		<datepicker-calendar :date="date" v-on:selectDate="changeDate" v-if="visible"></datepicker-calendar>
	</div>
</template>

<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto');
	.datepicker__container{
		position:relative;
		font-family : 'Roboto', sans-serif;
	}
</style>

<script>

import moment from 'moment'
import DatepickerCalendar from './DatepickerCalendar'

moment.locale('fr');

export default {
	props : {
		value	: {type : String, required : true},
		format 	: {type : String, default : 'MM/DD/YYYY'},
		name	: {type : String, required : true},
		locale	: {type : String, default : 'fr'}
	},

	created : function(){
		moment.locale(this.locale);
	},

	data : function(){
		return {
			date 	: moment(this.value, 'YYYY-MM-DD'),
			visible : false
		}
	},
	computed : {
		date_formatted : function(){
			return this.date.format(this.format);
		}
	},

	methods	:{
		changeDate : function(day){
			this.date = day;
			this.hideDatepicker();
		},

		showDatepicker (){
			this.visible = true;
			setTimeout(() => document.addEventListener('click', this.hideDatepicker), 0);
		},

		hideDatepicker (){
			this.visible = false;
			document.removeEventListener('click', this.hideDatepicker);
		}
	},

	components : {
		'datepicker-calendar' : DatepickerCalendar
	}
}
</script>
