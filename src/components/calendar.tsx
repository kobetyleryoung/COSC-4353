import React from 'react';
import DatePicker, {DateObject} from 'react-multi-date-picker';

interface AvailabilityPickerProps {
  value: string[];
  onChange: (dates: string[]) => void;
}

const Availability: React.FC<AvailabilityPickerProps> = ({ value, onChange }) => {

  const pickerDates = value.map((d) => new DateObject({ date: d, format: "YYYY-MM-DD" }));

  return (
    <div>
      <label className="block mb-2 font-medium">Availability</label>
      <DatePicker
        multiple
        value={pickerDates}
        onChange={(dates: any) => onChange(dates.map((d: any) => d.format('YYYY-MM-DD')))}
        format="YYYY-MM-DD"
        className="border p-2 rounded"
      />
    </div>
  );
};


const Event_Date: React.FC<AvailabilityPickerProps> = ({ value, onChange }) => {

  const pickerDates = value.map((d) => new DateObject({ date: d, format: "YYYY-MM-DD" }));

  return (
    <div>
      <label className="block mb-2 font-medium">Event_Date</label>
      <DatePicker
        multiple
        value={pickerDates}
        onChange={(dates: any) => onChange(dates.map((d: any) => d.format('YYYY-MM-DD')))}
        format="YYYY-MM-DD"
        className="border p-2 rounded"
      />
    </div>
  );
};
export default Availability;
export {Event_Date};
