import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import CalendarDate from "../interfaces/CalendarDate";

const Calendar = (props: { date: Date }) => {
  const { date } = props;
  const now = date.getDate();

  const weekday = new Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(date);
  const weekDayCapLetter = weekday.charAt(0).toUpperCase() + weekday.slice(1);

  const monthNumber = date.getMonth();
  const month = new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(date);
  const monthGenCase = new Intl.DateTimeFormat("ru-RU", { month: "long", day: 'numeric' }).format(date).split(' ')[1];

  const firstMonthDay = new Date(date.getFullYear(), date.getMonth(), 1);

  const getDay = (date: Date) => {
    let day = date.getDay();
    if (day === 0) day = 7;
    return day - 1;
  }

  const createTd = (): ReactNode => {
    const data = [];
    const firstMonthDayOfWeek = getDay(firstMonthDay);

    for (let index = 0; index < firstMonthDayOfWeek; index += 1) {
      const day = new Date(firstMonthDay.setDate(firstMonthDay.getDate() - 1)).getDate();
      data.unshift({ day, class: "ui-datepicker-other-month" });
    }

    const target = new Date(date.getFullYear(), date.getMonth(), 1);
    let day = new Date(target).getDate();

    while (target.getMonth() === monthNumber) {
      if (day === now) {
        data.push({ day, class: "ui-datepicker-today" });
      } else {
        data.push({ day });
      }
      day = new Date(target.setDate(target.getDate() + 1)).getDate();
    }

    if (getDay(target) !== 0) {
      for (let index = getDay(target); index < 7; index += 1) {
        data.push({ day, class: "ui-datepicker-other-month" });
        day = new Date(target.setDate(target.getDate() + 1)).getDate();
      }
    }

    const size = 7;

    const res = data.reduce((p: Array<Array<CalendarDate>>, c: CalendarDate) => {
      if (p[p.length - 1].length == size) {
        p.push([]);
      }

      p[p.length - 1].push(c);
      return p;
    }, [[]]);

    return (
      <>
        {res.map((el) => <tr key={uuidv4()}>{el.map((i) => {
          if (i.class) {
            return <td className={i.class} key={uuidv4()}>{i.day}</td>
          }
          return <td key={uuidv4()}>{i.day}</td>
        })}</tr>)}
      </>
    )
  }

  return (
    <>
      <div className="ui-datepicker">
        <div className="ui-datepicker-material-header">
          <div className="ui-datepicker-material-day">{weekDayCapLetter}</div>
          <div className="ui-datepicker-material-date">
            <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
            <div className="ui-datepicker-material-month">{monthGenCase}</div>
            <div className="ui-datepicker-material-year">{date.getFullYear()}</div>
          </div>
        </div>
        <div className="ui-datepicker-header">
          <div className="ui-datepicker-title">
            <span className="ui-datepicker-month">{month}</span>&nbsp;<span className="ui-datepicker-year">{date.getFullYear()}</span>
          </div>
        </div>
        <table className="ui-datepicker-calendar">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="ui-datepicker-week-end" />
            <col className="ui-datepicker-week-end" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" title="Понедельник">Пн</th>
              <th scope="col" title="Вторник">Вт</th>
              <th scope="col" title="Среда">Ср</th>
              <th scope="col" title="Четверг">Чт</th>
              <th scope="col" title="Пятница">Пт</th>
              <th scope="col" title="Суббота">Сб</th>
              <th scope="col" title="Воскресенье">Вс</th>
            </tr>
          </thead>
          <tbody>
            {createTd()}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Calendar;