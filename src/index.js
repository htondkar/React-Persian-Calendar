import React, { Component } from 'react'
import moment from 'moment-jalaali'
import { toPersianDigit } from './helper'

import './calender.css'

moment.loadPersian()

const DayNames = () => (
  <div className='week names'>
    <span className='day'>ش</span>
    <span className='day'>ی</span>
    <span className='day'>د</span>
    <span className='day'>س</span>
    <span className='day'>چ</span>
    <span className='day'>پ</span>
    <span className='day'>ج</span>
  </div>
)

const Week = ({ date, month, select, selected }) => {
  let days = []

  for (let i = 0; i < 7; i++) {
    const day = {
      name: date.format('jdd').substring(0, 1),
      number: date.jDate(),
      isCurrentMonth: date.jMonth() === month.jMonth(),
      isToday: date.isSame(new Date(), 'day'),
      date: date
    }

    const className =
      'day' +
      (day.isToday ? ' today' : '') +
      (day.isCurrentMonth ? '' : ' different-month') +
      (day.date.isSame(selected) ? ' selected' : '')

    days.push(
      <span key={day.date.toString()} className={className} onClick={() => select(day)}>
        {toPersianDigit(day.number)}
      </span>
    )

    date = date.clone()
    date.add(1, 'd')
  }

  return (
    <div className='week' key={days[0].toString()}>
      {days}
    </div>
  )
}

const RenderWeeks = ({ month, select, selected }) => {
  let weeks = []
  let done = false
  // start the week with SHANBE, so instead of day()
  // we user weekday for locale aware day index
  let date = month
    .clone()
    .startOf('jMonth')
    .weekday(0)

  let monthIndex = date.jMonth()

  let count = 0

  while (!done) {
    weeks.push(
      <Week
        key={date.toString()}
        date={date.clone()}
        month={month}
        select={select}
        selected={selected}
      />
    )
    date.add(1, 'w')
    done = count++ > 2 && monthIndex !== date.jMonth()
    monthIndex = date.jMonth()
  }

  return <div className='weeks-container'>{weeks}</div>
}

export default class Calender extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: moment().startOf('jMonth'), // "selected" is a moment object
      selectedDay: moment().startOf('jDay')
    }
  }

  previous = () => {
    let month = this.state.month
    month.subtract(1, 'month')
    this.setState({ month: month })
    this.selectFirstDayOfMonth(month)
  }

  next = () => {
    let month = this.state.month
    month.add(1, 'month')
    this.setState({ month: month })
    this.selectFirstDayOfMonth(month)
  }

  selectFirstDayOfMonth = month => {
    this.setState({
      selectedDay: month.clone().startOf('jMonth')
    })
  }

  today = () => {
    const { onChange } = this.props

    this.setState({
      month: moment().startOf('jMonth'), // "selected" is a moment object
      selectedDay: moment().startOf('jDay')
    })

    onChange && onChange(moment().format('jYYYY-jMM-jDD'))
  }

  select = day => {
    const { onChange } = this.props
    this.setState({ selectedDay: day.date })
    onChange && onChange(day.date.format('jYYYY-jMM-jDD'))
  }

  render() {
    return (
      <div id='calender-wrapper'>
        <div id='calendar'>
          <div className='header'>
            <div className='icon-and-text-in-a-row' onClick={this.previous}>
              <span>&#10094;</span>
              {/* <Icon icon={ic_arrow_forward} />
              <span>ماه قبل</span> */}
            </div>
            <span>{toPersianDigit(this.state.month.format('jYYYY jMMMM'))}</span>
            <div className='icon-and-text-in-a-row' onClick={this.next}>
              <span> &#10095;</span>
              {/* <span>ماه بعد</span>
              <Icon icon={ic_arrow_back} /> */}
            </div>
          </div>
          <DayNames />
          <RenderWeeks
            select={this.select}
            month={this.state.month}
            selected={this.state.selectedDay}
          />
        </div>
        <button onClick={this.today}>برو به امروز</button>
      </div>
    )
  }
}
