import { formatNumber } from '@angular/common';
import { Component } from '@angular/core';

const EGGTIMER_STARTTIME_IN_SECONDS: number = 120;
const NR_SECONDS_PER_MINUTE: number = 60;
const TIME_STEP_IN_MILLISECONDS: number = 1000;
const TIME_STEP_IN_SECONDS: number = 1;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  totalTimeInSeconds: number = 0;
  numberOfMinutes: number = 0;
  numberOfSeconds: number = 0;
  countdown: any;
  shouldStartBtnBeShown: boolean = true;
  shouldResetBtnBeShown: boolean = false;
  shouldResumeTxtBeShown: boolean = (this.totalTimeInSeconds === EGGTIMER_STARTTIME_IN_SECONDS);
  eggReadySound = new Audio('../assets/audio/egg_ready_rooster.mp3')

  ngOnInit() {
    this.totalTimeInSeconds = EGGTIMER_STARTTIME_IN_SECONDS;
    this.intializeTimer();
  }

  intializeTimer() {
    this.calculateMinutes();
    this.calculateSeconds();
  }

  calculateMinutes():number {   
    this.numberOfMinutes = Math.floor(this.totalTimeInSeconds/NR_SECONDS_PER_MINUTE);
    return this.numberOfMinutes;
  }

  calculateSeconds(): number {
    this.numberOfSeconds = this.totalTimeInSeconds % NR_SECONDS_PER_MINUTE;
    return this.numberOfSeconds;
  }

  startCountdown() {
    this.shouldStartBtnBeShown = false;
    this.shouldResetBtnBeShown = false;
    this.countdown = setInterval(() => {
      this.totalTimeInSeconds -= TIME_STEP_IN_SECONDS;
      this.intializeTimer();
      if (this.totalTimeInSeconds === 0) {
        this.shouldStartBtnBeShown = true;
        this.shouldResumeTxtBeShown = false;
        this.totalTimeInSeconds = EGGTIMER_STARTTIME_IN_SECONDS;
        this.intializeTimer();
        this.eggReadySound.play();
        clearInterval(this.countdown);
      }
    }, TIME_STEP_IN_MILLISECONDS);
  }

  stopCountdown() {
    this.shouldResumeTxtBeShown = true;
    this.shouldStartBtnBeShown = true;
    this.shouldResetBtnBeShown = true;
    clearInterval(this.countdown);
  }

  resetTimer() {
    this.totalTimeInSeconds = EGGTIMER_STARTTIME_IN_SECONDS;
    this.intializeTimer();
    this.shouldResumeTxtBeShown = false;
    this.shouldResetBtnBeShown = false;
  }


}
