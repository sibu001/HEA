import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GoogleMapComponent } from 'src/app/common/google-map/google-map.component';


@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  credentialsKeys = [];
  public credentialsDataSource: any;
  public credentialsData = {
    content: [],
    totalElements: 0,
  };

  alertsKeys = [];
  public alertsDataSource: any;
  public alertsData = {
    content: [],
    totalElements: 0,
  };

  eventKeys = [];
  public eventDataSource: any;
  public eventData = {
    content: [],
    totalElements: 0,
  };

  staffKeys = [];
  public staffDataSource: any;
  public staffData = {
    content: [],
    totalElements: 0,
  };

  filesKeys = [];
  public filesDataSource: any;
  public filesData = {
    content: [],
    totalElements: 0,
  };
  zoom = 17;
  lat = 51.673858;
  lng = 7.815982;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

    this.credentialsKeys = [
      { key: 'credentialType', displayName: 'Credential Type' },
      { key: 'active', displayName: 'Active' },
      { key: 'login', displayName: 'Links' },
      { key: 'password', displayName: 'Password' },
      { key: 'customerData', displayName: 'Customer Data', type: 'image' },
      { key: 'utilityData', displayName: 'Utility Data', type: 'image' },
      { key: 'electricity', displayName: 'Electricity', type: 'image' },
      { key: 'heating', displayName: 'Heating', type: 'image' },
      { key: 'water', displayName: 'Water', type: 'image' },
      { key: 'lastUsage', displayName: 'Last Usage' },
      { key: 'authEndDate', displayName: 'Auth End Date' },
      { key: 'authStatus', displayName: 'Auth Status' }
    ];

    this.alertsKeys = [
      { key: 'customerAlertType', displayName: 'Customer Alert Type' },
      { key: 'alertLevel', displayName: 'Alert Level' },
      { key: 'notes', displayName: 'Notes' }
    ];

    this.eventKeys = [
      { key: 'eventType', displayName: 'Event Type' },
      { key: 'eventDate', displayName: 'Event Date' },
      { key: 'note', displayName: 'Note' },
      { key: 'author', displayName: 'Author' }
    ];

    this.staffKeys = [
      { key: 'staff', displayName: 'Staff' },
      { key: 'date', displayName: 'Date' },
      { key: 'note', displayName: 'Note' }
    ];

    this.credentialsKeys = [
      { key: 'fileName', displayName: 'File Name' },
      { key: 'timeStamp', displayName: 'TimeStamp' },
      { key: 'description', displayName: 'Description' },
      { key: 'size', displayName: 'Size' }
    ];
  }

  openAddressOnGoogleMap() {
    const dialogRef = this.dialog.open(GoogleMapComponent, {
      width: '515px',
      height: '500px',
      data: {lat: 51.673858, lng: 7.815982},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

}
