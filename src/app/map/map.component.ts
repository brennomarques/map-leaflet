import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { environment as env } from 'src/environments/environment';
import { STEP } from '../enums/enum';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  private map: any;
  private marker: any;

  constructor() { }

  public ngOnInit(): void {
    this.initMap();
  }

  public ngOnDestroy(): void {
    this.destroyMap();
  }

  private destroyMap(): void {
    this.map.invalidateSize();
  }

  private initMap(): void {
    this.map = L.map('map').setView([-16.6826467, -49.2654412], 5);
    L.tileLayer(env.MAP_TILE_LAYER, { maxZoom: 50 }).addTo(this.map);

    this.map.on('click', (e: any) => this.hasMarker(e.latlng.lat, e.latlng.lng));
  }

  private hasMarker(latitude: number, longitude: number): void {
    this.removeMarker();

    this.marker = L.marker([latitude, longitude]).addTo(this.map);
    this.map.setView([latitude, longitude], 17);
  }

  private removeMarker(): void {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
  }

  public handleSelection(value: number): void {

    switch (value) {
      case STEP.FOREST:
        this.hasMarker(-16.709883484784775, -49.270462989807136);
        return;
      case STEP.ZOO:
        this.hasMarker(-16.6824266, -49.2732916);
        return;
      case STEP.COMPANY:
        this.hasMarker(-16.707530314701977, -49.28251147270203);
        return;

      default:
        this.hasMarker(-16.707530314701977, -49.28251147270203);
        return;
    }
  }

}
