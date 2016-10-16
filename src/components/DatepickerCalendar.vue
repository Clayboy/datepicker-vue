<template>
	<transition name="display">
		<div class="datepicker__calendar" v-on:click.stop>
			<div class="datepicker__header">
				<div class="header__year">{{year}}</div>
				<div class="header__date">{{date_formatted}}</div>
			</div>

			<div class="datepicker__controls">
				<div transition="slidev" class="controls__month">{{mymonth.getFormatted()}}</div>
				<button class="controls__prev" v-on:click="prevMonth()">
					<svg viewbox="0 0 24 24">
							<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
					</svg>
				</button>
				<button class="controls__next"  v-on:click="nextMonth()">
					<svg viewbox="0 0 24 24">
						<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
					</svg>
				</button>
			</div>

			<div class="datepicker__body">
				<div class="datepicker__daynames">
					<div class="dayname" v-for="dayname in daynames">{{dayname}}</div>
				</div>
				<div class="datepicker__days" :class="mymonth.getNbWeeks() == 6 ? 'has6weeks' : ''">
					<transition-group tag="div" name="slideh">
						<div v-for="(day, index) in mymonth.getDays()" v-bind:key="day" class="day" :style="{ 'margin-left': (index == 0 ? (mymonth.getWeekStart() * 39)+'px' : '2px')}" :class="{selected : isSelected(day)}" v-on:click="setDate(day)">						<span class="day-current"></span>
							<span class="day-text">{{day.format('D')}}</span>
						</div>
					</transition-group>
				</div>
			</div>
		</div>
	</transition>
</template>

<style lang="scss">

	$header-height	: 50px;
	$main-bgcolor	: #009688;
	$day-size		: 35px;
	$color			: #333;

	.datepicker__calendar{
		position:absolute;
		top:100%;
		box-shadow:0px 1px 4px rgba(0,0,0,0.5);
		width : 275px;

		color:#333;
	}

	.datepicker__header{
		color:#FFF;
		background:$main-bgcolor;
		font-family:'Roboto', sans-serif;
		text-align:center;
		padding:10px;
		height:$header-height;

		.header__date{
			font-size:22px;
			margin-top:5px;
		}
	}

	.dayname{
		width:$day-size;
		display:inline-block;
		text-align:center;
		margin:7px 2px;
		color:lighten($color, 40%);
		box-sizing:border-box;
	}

	.datepicker__controls{

		position:relative;

		button{
			background:none;
			border:0;
			user-select:none;
			position: relative;
			outline:0;
			cursor:pointer;
		}

		svg{
			width:24px;
			height:24px;
			vertical-align: middle;
		}

		.controls__prev{
			float:left;
		}

		.controls__month{
			position: absolute;
			top:0;
			left:0;
			width:100%;
			padding:5px 0;
			text-align:center;
		}

		.controls__next{
			float:right;
		}
	}

	.datepicker__body{
		clear:both;
		position:relative;
	}

	.datepicker__days{
		position: relative;
		overflow: hidden;
		padding:0;
		transition:height 250ms;
		height:($day-size +4) * 5;

		&.has6weeks{
			height:($day-size +4) * 6;
		}

		.day{
			cursor:pointer;
			width:$day-size;
			height:$day-size;
			display:inline-block;
			text-align:center;
			margin:2px 2px;
			line-height:$day-size;
			position:relative;
			transition: all 300ms cubic-bezier(.18,.83,.32,.95);

			.day-current{
				position:absolute;
				left:1px;
				top:1px;
				border-radius:50%;
				background-color:$main-bgcolor;
				width:calc(#{$day-size} - 2px);
				height:calc(#{$day-size} - 2px);

				transition: all 250ms cubic-bezier(.18,.83,.32,.95);

				transform:scale(0);
			}

			.day-text{
				position:relative;
			}

			&:hover{
				color:#FFF;

				.day-current{
					transform:scale(1);
					opacity:0.5;
				}
			}

			&.selected{
				color:#FFF;

				.day-current{
					transform:scale(1)
				}
			}
		}
	}

	.display-enter-active, .display-leave-active {
	  transition: all .5s;
	  opacity : 1;
	  transform:translateY(0px);
	}
	.display-enter, .display-leave-active {
	  opacity: 0;
	  transform:translateY(-15px);
	}

	.slidev-enter-active, .slidev-leave-active {
	  transition: all 500ms;
	  opacity : 1;
	  transform:translateY(0);
	}

	.slidev-enter, .slidev-leave-active {
	  opacity: 0;
	  transform:translateY(100%);
	}

	.slideh-item{
		transition: all 10s;
		opacity : 1;
		transform:translateX(0);
		position:absolute;
		top:0;
		left:0;
	}

	.slideh-enter-active {
		transform: translateX(100%);
		opacity: 0;
	}

	.slideh-leave-active{
		opacity:1;
	}

	.slideh-leave-active {
	  opacity: 0;
	  transform:translateX(-100%);
	}



</style>

<script>
	import Month from '../class/Month'


	export default {
		props 	: ['date'],

		data () {
			return {
				daynames: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
				mymonth	: new Month(this.date.month(), this.date.year()),
			}
		},


		computed : {

			year : function(){
				return this.date.format('YYYY');
			},
			month : function(){
				return this.date.format('MMMM');
			},
			date_formatted : function(){
				return this.date.format('dddd DD MMM');
			}
		},

		methods : {
			setDate (day){
				this.$emit('selectDate', day);
				//this.date = day.clone();
			},

			isSelected : function(date){
				return date.unix() == this.date.unix();
			},

			nextMonth : function(){

				let newdate = this.mymonth.start.clone();
				newdate.add(1, 'month');

				this.mymonth = new Month(newdate.month(), newdate.year());
			},

			prevMonth (){

				let newdate = this.mymonth.start.clone();
				newdate.subtract(1, 'month');

				this.mymonth = new Month(newdate.month(), newdate.year());
			}
		}
	}
</script>
