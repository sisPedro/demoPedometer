import { Component, NgZone } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';

import { Pedometer, IPedometerData } from '@ionic-native/pedometer/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	start: boolean;
	//PedometerData:any;
	stepCount : any = 0;


  constructor(public toastCtrl: ToastController,
  			  //private ngZoneCtrl: NgZone,
  			  private platformCtrl: Platform,
  			  private pedoCtrl: Pedometer) {
    this.stepCount = 0;
  }


  fnGetPedoUpdate(){
  	if (this.platformCtrl.is('cordova')) {
      const watch = this.pedoCtrl.startPedometerUpdates()
		   .subscribe((PedometerData:IPedometerData) => {
		   		PedometerData = PedometerData;

			        this.stepCount = PedometerData.numberOfSteps;
			   		// this.startDate = new Date(this.PedometerData.startDate);
				   	// this.endDate = new Date(this.PedometerData.endDate);
             debugger;
             watch.unsubscribe();

	   });
	   this.start = true;
	   this.fnTost('Please Walk🚶‍to Get Pedometer Update.');
	}else{
		this.fnTost('This application needs to be run on📱device');
	}
  }

  fnStopPedoUpdate(){
  	this.pedoCtrl.stopPedometerUpdates();
	  this.start = false;
  }

  fnTost(message) {
      let toast = this.toastCtrl.create({
        message: message,
        position: 'bottom',
        duration: 3000
      });
      toast.present();
  }


}