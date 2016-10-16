import moment from 'moment'

export default class Month{

	constructor(month, year){

		this.start	= moment([year, month])
		this.end	= this.start.clone().endOf('month')

		this.month 	= month
		this.year	= year
	}

	getWeekStart () {
		return this.start.weekday();
	}

	getNbWeeks (){
		return (this.end.week() - this.start.week()) + 1;
	}

	getDays () {

		let date 		= this.start.clone();
		let dateList 	= [];

		while(date <= this.end){

			dateList.push(date.clone());
			date = date.add(1, 'days');
		}

		return dateList;
	}

	getFormatted (){
		 return this.start.format('MMMM YYYY');
	}

}
