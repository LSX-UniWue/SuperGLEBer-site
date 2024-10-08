import { useState } from "react";
import "tabulator-tables/dist/css/tabulator_semanticui.min.css";
import "/styles/globals.css";

export function formatter_avg(cell, formatterParams) {
  let value = cell.getValue();
  let progressWidth = ((value - formatterParams.min) / (formatterParams.max - formatterParams.min)) * 100;
  let html = `<div style="position: relative; width: 100%; height: 100%; font-size: 14px;">
                        <div style="position: absolute; width: ${progressWidth}%; height: 100%; background-color: ${formatterParams.color};"></div>
                        <div style="position: absolute; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: black;">
                            ${value}
                        </div>
                    </div>`;
  return html;
}

export const headerMenu = function () {
  let menu = [];
  let columns = this.getColumns();

  for (let column of columns) {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = column.isVisible();
    checkbox.addEventListener("click", function (e) {
      e.stopPropagation();
      column.toggle();
      checkbox.checked = column.isVisible();
    });

    checkbox.style.marginRight = "0.5rem"; // Space between checkbox and Text
    let label = document.createElement("label");
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(column.getDefinition().title));

    menu.push({
      label: label,
    });
  }

  return menu;
};

export const useTableFilter = (initialData) => {
  const [filterField, setFilterField] = useState("");
  const [filterType, setFilterType] = useState("=");
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);

  const handleFilterChange = () => {
    if (!filterField || !filterValue) {
      setFilteredData(initialData);
      return;
    }

    const updatedData = initialData.filter((item) => {
      let itemValue = item[filterField];

      switch (filterType) {
        case "=":
          return itemValue === filterValue;
        case "<":
          return itemValue < filterValue;
        case ">":
          return itemValue > filterValue;
        case "!=":
          return itemValue !== filterValue;
        default:
          return true;
      }
    });

    setFilteredData(updatedData);
  };

  const clearFilter = () => {
    setFilterField("");
    setFilterType("=");
    setFilterValue("");
    setFilteredData(initialData);
  };

  return {
    filterField,
    setFilterField,
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    filteredData,
    handleFilterChange,
    clearFilter,
  };
};
