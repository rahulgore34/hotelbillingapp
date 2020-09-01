import { Component, OnInit, ViewChild } from '@angular/core';
import { GetDataService } from 'src/common/get-data.service';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-bill-summery',
  templateUrl: './bill-summery.component.html',
  styleUrls: ['./bill-summery.component.scss'],
})
export class BillSummeryComponent implements OnInit {
  billData = [];
  newData = [];
  finalTotal = 0;
  @ViewChild('dt1') table: Table;
  @ViewChild('dt') mytable: Table;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  // dates
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [{ data: [], label: 'Total' }];
  constructor(private service: GetDataService) {}

  ngOnInit(): void {
    this.billData = this.service.getBillData();
    this.calculateTotal();

    this.newData = this.billData;
    // this.myFilter('fry');
  }
  innerTableFilter(value, contains) {
    this.mytable.filterGlobal(value, contains);
  }

  myFilter(value) {
    console.log(value);
    if (value === '') {
      this.billData = this.service.getBillData();
    }
    let arr1 = [];
    let flag = 0;
    console.log(this.newData);
    this.billData.forEach((ele) => {
      ele.billSummery.forEach((element) => {
        if (element.name.includes(value)) {
          flag = 1;
          return element;
        }
      });
      if (flag === 1) {
        flag = 0;
        arr1.push(ele);
      }
    });
    this.billData = arr1;
    this.calculateTotal();
    console.log(this.billData);
  }
  calculateTotal() {
    this.finalTotal = this.billData.reduce((a, c) => {
      return a + c.total;
    }, 0);
  }
  exportExcel() {
    console.log(this.table);
    let dataToExport = [];
    if (this.mytable.filteredValue) {
      let data = [...this.mytable.filteredValue];
      let d = [];
      data.forEach((ele) => {
        let obj = {
          billNo: ele.BillNo,
          date: ele.date,
          total: ele.total,
        };
        d.push(obj);
      });
      dataToExport = d;
      // dataToExport = this.mytable.filteredValue;
    } else {
      let data = [...this.billData];
      let d = [];
      data.forEach((ele) => {
        let obj = {
          billNo: ele.BillNo,
          date: ele.date,
          total: ele.total,
        };
        d.push(obj);
      });
      console.log(d);

      dataToExport = d;
    }

    console.log(dataToExport);

    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(dataToExport);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'primengTable');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    // tslint:disable-next-line: no-shadowed-variable
    import('file-saver').then((FileSaver) => {
      const EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
  chartData = [];
  showChart = false;
  createChart() {

    let billNos = this.billData.map((ele) => ele.BillNo);
    let totals = this.billData.map((ele) => ele.total);
    console.log(billNos);
    console.log(totals);
    this.barChartLabels = billNos;
    this.barChartData[0].data = totals;
    this.showChart = true;
  }
  exportExcelBill() {
    let dataToExport = [];
    if (this.mytable.filteredValue) {
      let data = [...this.mytable.filteredValue];
      let d = [];
      data.forEach((ele) => {
        ele.billSummery.forEach((element) => {
          d.push(element);
          console.log(element);
        });
      });
      dataToExport = d;
      // dataToExport = this.mytable.filteredValue;
    } else {
      let data = [...this.billData];
      let d = [];
      data.forEach((ele) => {
        ele.billSummery.forEach((element) => {
          d.push(element);
          console.log(element);
        });
      });
      console.log(d);

      dataToExport = d;
    }

    console.log(dataToExport);

    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(dataToExport);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'primengTable');
    });
  }
}
