import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GoogleMapData } from 'src/app/data/google-map.data';
import { DIALOGDATA, MARKER } from 'src/app/interface/google-map.interface';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})

export class GoogleMapComponent implements OnInit {
  markers: MARKER[] = GoogleMapData.MARKER_DATA;
  zoom = 20;
  lat = 51.673858;
  lng = 7.815982;
  constructor(public dialogRef: MatDialogRef<GoogleMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DIALOGDATA) {
    this.markers[0].lat = this.lat = this.data.lat;
    this.markers[0].lng = this.lng = this.data.lng;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  newWindow() {
    window.open('https://maps.google.com/?q=' + this.lat + ',' + this.lng, '_blank');
  }
}
