import { Component, OnDestroy } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonModule } from '@angular/common';
import { BarcodeFormat } from '@zxing/browser';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    ZXingScannerModule
  ]
})
export class AppComponent implements OnDestroy {

  scannedValue: string = '';
  selectedDevice!: MediaDeviceInfo;
  isScannerActive = false;

  // Wir definieren die Formate als Array aus dem BarcodeFormat-Enum
  barcodeFormats: BarcodeFormat[] = [
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.QR_CODE
  ];

  ngOnDestroy(): void {
    // Optional: Hier könnte man, falls man eine Scanner-Referenz hätte, z. B. zxingScanner.reset() aufrufen.
    // Oder man verlässt sich drauf, dass das Stream-Element geschlossen wird, wenn die Komponente weg ist.
  }

  activateScanner() {
    this.isScannerActive = true;
  }

  onCamerasFound(devices: MediaDeviceInfo[]) {
    console.log('Geräte gefunden:', devices);
    // z. B. alle Durchgehen, das "back"-Kamera-Label finden
    const backCam = devices.find(d => /back|rear|environment/i.test(d.label));
    this.selectedDevice = backCam ?? devices[0];
  }
  

  onScanError(error: any) {
    console.error('Scan-Fehler:', error);
  }

  onScanSuccess(result: string) {
    alert("jaaa")
    console.log('Scan-Ergebnis:', result);
    this.scannedValue = result;
    // Falls du sofort nach dem ersten Erfolg stoppen willst: 
    // -> isScannerActive = false;
  }

  showTable = false; // Initial: Tabelle ausgeblendet

  toggleTable() {
    this.showTable = !this.showTable; // Sichtbarkeit umschalten
  }
}
