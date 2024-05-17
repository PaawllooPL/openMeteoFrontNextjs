import Image from "next/image"
export default function WeatherTable({darkMode, tableHeadRef, tableBodyRef}) {
    return (
        <div className='row'>
        <div className='table-responsive'>
          <table className={`table ${darkMode ? "table-dark" : ""}`} id='weather-table'>
            <thead id='weather-table-head' ref={tableHeadRef}>
              <tr>
                <td>Date</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody id='weather-table-body' ref={tableBodyRef}>
              <tr>
                <td className='w-25'>Max temperature (C)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Min temperature (C)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Generated energy (Kwh)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Weather</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
}