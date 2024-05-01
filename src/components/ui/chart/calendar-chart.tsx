import { ResponsiveCalendar } from '@nivo/calendar';

// 차트 데이터 형태
// const data = [
//   {
//     value: 249,
//     day: '2017-05-08',
//   },
//   {
//     value: 329,
//     day: '2016-01-11',
//   },
//   {
//     value: 182,
//     day: '2018-03-05',
//   },
// ];

interface CalendarChartProps {
  data: { value: number; day: string }[];
  year: string;
  onClick: (date: string) => void;
}

const CalendarChart = ({ data, year, onClick }: CalendarChartProps) => {
  return (
    <ResponsiveCalendar
      data={data}
      from={year}
      to={year}
      emptyColor="#eeeeee"
      colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
      margin={{ top: 0, right: 40, bottom: 0, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      onClick={(date) => {
        // value가 있는 경우에만 클릭 이벤트 발생
        if (Object.hasOwn(date, 'value')) {
          onClick(date.day);
        }
      }}
      onMouseEnter={(_datum, event) => {
        // 포인터 스타일 변경
        // eslint-disable-next-line no-param-reassign
        event.currentTarget.style.cursor = 'pointer';
      }}
      theme={{
        labels: {
          text: {
            fontSize: 12,
            fill: 'var(--mantine-color-text)',
          },
        },
        tooltip: {
          container: {
            fontSize: 12,
            color: 'var(--mantine-color-black)',
          },
        },
      }}
    />
  );
};

export default CalendarChart;
